<template>
<div class="wrapper">
  <header-component></header-component>
  <div>
    <select name="" id="">
      <option value="">All Seasons</option>
      <option v-for="season in seasons" :key="season.index" :value="season">Season {{season}}</option>
    </select>
  </div>
  <div id="episodes-container">
    <div class="episode" v-for="episode in episodes" :key="episode._id">
      <h5>{{episode.name}}:</h5>
      <button type="button">More</button>
    </div>
  </div>
  </div>
</template>

<script>
import Header  from '@/components/Header'

export default {
  components: {
    'header-component': Header
  },
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
          Event.$emit('resultsAll', this.episodes.length, 'Episodes');
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
  created() {
    this.fetchEpisodes();
  },
}
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(50px, auto);
  grid-column-gap: 5px;
}

#episodes-container {
  grid-column: 1/13;
  grid-row: 2/3;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px;
}
</style>