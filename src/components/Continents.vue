<template>
    <div class="data-container">
      <div class="data-items" v-for="continent in continents" :key="continent._id">
        <h5>{{continent.name}}: </h5>
        <p>{{continent.cardinalDirection}}</p>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      continents: [],
      errors: []
    }
  },
  created(){
    axios.get('https://api.got.show/api/continents/')
    .then(response => {
      this.continents = response.data
      console.log(response.data);
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>

<style scoped>
.data-items h5 {
  color: bisque;
  text-transform: uppercase;
}

.data-items p {
  color: white;
  margin-left: 10px;
}
</style>