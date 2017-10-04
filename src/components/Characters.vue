<template>
<div>
  <!-- <div class="filters">
    <h4>Filters: </h4>
    <button v-on:click="filterByGender(true)">Male</button>
    <button v-on:click="filterByGender(false)">Female</button>
    <input type="text" v-model="filter.byName">
    <p>{{filter.byName}}</p>
  </div> -->
  <div class="data-container">
    <div class="data-items" v-for="character in characters" :key="character._id">
      <router-link :to="{name: 'character', params: {id: character._id}}">{{character.name}}</router-link>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      characters: [],
      errors: [],
      filter: {
        byGender: '',
        byName: ''
      }
    }
  },
  created() {
    axios.get('https://api.got.show/api/characters')
      .then(response => {
        this.characters = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
}
</script>

<style scoped>

</style>