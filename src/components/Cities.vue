<template>
  <div>
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
        this.$http.get('cities')
          .then(response => {
            this.cities = response.body;
            Event.$emit('resultsAll', this.cities.length, 'cities');
          }, error => {
            Event.$emit('error', error.status, error.statusText);
          });
      },

    // fetchCities() {
    //   fetch('https://api.got.show/api/cities')
    //     .then((response) => {
    //       return response.json()
    //     })
    //     .then((cities) => {
    //       this.cities = cities;
    //       Event.$emit('resultsAll', this.cities.length, 'cities');
    //     })
    //     .catch((error) => {
    //       Event.$emit('error', error.message);
    //     })
    // }
  },
    computed: {
      filteredCities() {
        return this.cities.filter((city) => {
          return city.name.toLowerCase().match(this.search.toLowerCase());
        })
      }
    },
    watch: {
    filteredCities: (value) => {
      Event.$emit('resultsMatched', value.length);
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