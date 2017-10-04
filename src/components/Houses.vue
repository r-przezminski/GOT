<template>
  <div class="data-container">
    <div class="data-items" v-for="house in filteredHouses" :key="house._id">
      <router-link :to="{name: 'house', params: {id: house._id}}">{{house.name}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      houses: [],
      errors: [],
      search: ''
    }
  },
  created() {
    axios.get('https://api.got.show/api/houses/')
      .then(response => {
        this.houses = response.data
        console.log(response.data)
      })
      .catch(e => {
        this.errors.push(e)
      })

    Event.$on('searching', (value) => { this.search = value })
  },
  computed: {
    filteredHouses() {
      return this.houses.filter((house) => {
        return house.name.toLowerCase().match(this.search)
      })
    }
  }
}
</script>

<style scoped>

</style>