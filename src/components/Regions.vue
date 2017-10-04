<template>
    <div class="data-container">
      <div class="data-items" v-for="region in regions" :key="region._id">
        <p>{{region.name}}</p>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      regions: [],
      errors: []
    }
  },
  created(){
    axios.get('https://api.got.show/api/regions/')
    .then(response => {
      this.regions = response.data
      console.log(response.data);
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>

<style scoped>
.data-items p {
  color: bisque;
  text-align: center;
}
</style>