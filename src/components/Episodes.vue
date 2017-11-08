<template>
  <div class="wrapper">
    <title-component></title-component>
    <div id="characters-in-episode"></div>
    <div id="filter">
      <label for="seasons-filter">Seasons: </label>
      <v-select v-model="filterBy.seasons.value" :options="filterBy.seasons.options" id="seasons-filter"></v-select>
    </div>
    <div id="container">
      <div id="episodes-container">
        <div class="episode" v-for="episode in filteredEpisodes" :key="episode._id">
          <div class="episode-header">
            <h3>{{episode.name}}</h3>
            <p>Season {{episode.season}}, Episode {{episode.totalNr}}</p>
            <div class="director">
              <p>Director:</p>
              <h4>{{episode.director}}</h4>
            </div>
          </div>
          <div class="episode-body">
            <p>Characters:</p>
            <div class="characters">
              <p v-on:mouseover="getCharacterImage(character)" v-for="character in episode.characters" :key="character.index">{{character}},</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/Title";
import vSelect from "vue-select";

export default {
  components: {
    "title-component": Title,
    "v-select": vSelect
  },
  data() {
    return {
      filterBy: {
        search: "",
        seasons: {
          options: ["All"],
          value: "All"
        }
      },
      episodes: [],
      seasons: [],
    };
  },
  computed: {
    filteredEpisodes() {
      return this.episodes
        .filter(episode => {
          return episode.name
            .toLowerCase()
            .match(this.filterBy.search.toLowerCase());
        })
        .filter(episode => {
          if (this.filterBy.seasons.value === "All") {
            return episode;
          } else {
            return episode.season == this.filterBy.seasons.value.slice(-1);
          }
        });
    }
  },
  methods: {
    fetchEpisodes() {
      this.$http.get("episodes").then(
        response => {
          this.sortEpisodes(response.body);
          Event.$emit("resultsAll", this.episodes.length, "Episodes");
          this.fetchSeasons(response.body);
        },
        error => {
          Event.$emit("error", error.status, error.statusText);
        }
      );
    },
    fetchSeasons(data) {
      for (let index = 0; index < data.length; index++) {
        if (!this.seasons.includes(data[index].season)) {
          this.seasons.push(data[index].season);
          this.filterBy.seasons.options.push("Season " + data[index].season);
        }
      }
    },
    sortEpisodes(data) {
      this.episodes = data.sort((a, b) => {
        return a.totalNr - b.totalNr;
      });
    },
  },
  created() {
    this.fetchEpisodes();
    Event.$on("searching", value => {
      this.filterBy.search = value;
    });
  },
  watch: {
    filteredEpisodes: value => {
      Event.$emit("resultsMatched", value.length);
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(50px, auto);
  grid-column-gap: 5px;
}

#filter {
  grid-column: 3/10;
  grid-row: 2/3;
  font-style: italic;
}

#container {
  grid-column: 1/13;
  grid-row: 4/5;
}

#episodes-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.episode {
  padding: 0 20px;
  width: 450px;
  min-height: 550px;
  margin: 20px auto;
  background: rgba(0, 0, 0, 0.8);
  box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.6);
  border-bottom: 1px solid bisque;
  border-right: 1px solid bisque;
  border-radius: 10px;
}

.episode p {
  color: bisque;
}

.episode h4 {
  color: chocolate;
  font-style: italic;
}

.episode h3 {
  color: chocolate;
  font-style: italic;
  text-align: center;
  margin-bottom: 20px;
}

.episode-header {
  border-bottom: 1px solid bisque;
  width: 100%;
  height: 120px;
  padding: 10px;
}

.director {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}

.director p {
  margin-right: 10px;
}

.episode-body {
  display: flex;
  flex-wrap: wrap;
}

.episode-body p {
  margin: 10px;
  font-weight: bold;
  color: bisque;
}

.characters {
  display: flex;
  flex-wrap: wrap;
}

.characters p {
  margin: 5px;
  color: bisque;
  font-style: italic;
  font-weight: normal;
  transition: 0.3s ease-in-out;
}

.episode-footer {
  min-height: 200px;
}
</style>
