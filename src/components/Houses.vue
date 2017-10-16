<template>
  <div>
    <div class="data-container">
      <div class="data-items" v-for="house in filteredHouses" :key="house._id">
        <router-link :to="{name: 'House', params: {id: house._id}}">{{house.name}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      houses: [],
      search: ''
    }
  },
  created() {
    Event.$on('searching', (value) => { this.search = value })
  },
  computed: {
    filteredHouses() {
      return this.houses.filter((house) => {
        return house.name.toLowerCase().match(this.search.toLowerCase())
      })
    }
  },
  methods: {
    fetchHouses() {
      this.$http.get('houses')
        .then(response => {
          this.houses = response.body;
          Event.$emit('resultsAll', this.houses.length, 'houses');
        }, error => {
          Event.$emit('error', error.status, error.statusText);
        });
    },
  },
  mounted() {
    this.fetchHouses();
  }
}
</script>

<style scoped>

</style>