<template>
  <div>
    <search></search>
    <div class="data-container">
      <div class="data-items" v-for="city in filteredCities" :key="city._id">
        <a target="_blank" :href="city.link">{{city.name}}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cities: [],
      search: ''
    }
  },
  methods: {
    fetchCities() {
      axios.get('https://api.got.show/api/cities/')
        .then(response => {
          this.cities = response.data;
        })
        .catch(error => {
          Event.$emit('error', error.message);
        })
    }
  },
  computed: {
    filteredCities() {
      return this.cities.filter((city) => {
        return city.name.toLowerCase().match(this.search.toLowerCase());
      })
    }
  },
  created() {
    Event.$on('searching', (value) => { this.search = value })
  },
  mounted() {
    this.fetchCities();
  }
}
</script>

<style scoped>

</style>