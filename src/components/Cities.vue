<template>
    <div class="data-container">
      <div class="data-items" v-for="city in cities" :key="city._id">
        <a target="_blank" :href="city.link">{{city.name}}</a>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      cities: [],
      errors: []
    }
  },
  created(){
    axios.get('https://api.got.show/api/cities/')
    .then(response => {
      this.cities = response.data
      console.log(response.data);
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>

<style scoped>

</style>