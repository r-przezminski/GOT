<template>
<div>
  <div>
    <select name="" id="">
      <option value="">All Seasons</option>
      <option v-for="season in seasons" :key="season.index" :value="season">Season {{season}}</option>
    </select>
  </div>
  <div class="episodes-container">
    <div class="episodes-items" v-for="episode in episodes" :key="episode._id">
      <h5>{{episode.name}}:</h5>
      <button type="button">More</button>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      episodes: [],
      seasons: []
    }
  },
  methods: {
    fetchEpisodes() {
      this.$http.get('episodes')
        .then(response => {
          this.episodes = response.body;
          Event.$emit('resultsAll', this.episodes.length, 'episodes');
          this.fetchSeasons(response.body);
        }, error => {
          Event.$emit('error', error.status, error.statusText);
        });
    },
    fetchSeasons(data) {
      for (let index = 0; index < data.length; index++) {
        if(!this.seasons.includes(data[index].season)){
          this.seasons.push(data[index].season); 
        }
      }
    }
  },
  mounted() {
    this.fetchEpisodes();
  }
}
</script>

<style scoped>
.episodes-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.episodes-items {
  width: 160px;
  height: 120px;
  margin: 10px 10px;
  padding: 20px;
  border-bottom: 1px solid bisque;
  border-right: 1px solid bisque;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.7);
  box-shadow: 1px 5px 10px rgba(0, 0, 0, .7);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>