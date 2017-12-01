<template>
  <div class="wrapper">
    <title-component></title-component>
    <div id="characters-in-episode"></div>
    <div id="filter">
      <label for="seasons-filter">Seasons: </label>
      <v-select :value="seasonFilter" :on-change="seasonFilterHandler" :options="seasons" id="seasons-filter"></v-select>
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
              <p v-for="character in episode.characters" :key="character.index">{{character}},</p>
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
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    "title-component": Title,
    "v-select": vSelect
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["filteredEpisodes", "seasons", "seasonFilter"])
  },
  methods: {
    ...mapActions([
      "getEpisodes",
      "updateTitleResultMatched",
      "seasonFilterHandler"
    ])
  },
  created() {
    this.getEpisodes("episodes");
  },
  watch: {
    filteredEpisodes: function(result) {
      this.updateTitleResultMatched(result.length);
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
