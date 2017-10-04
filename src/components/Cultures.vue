<template>
  <div class="data-container">
    <div class="data-items" v-for="culture in cultures" :key="culture._id">
      <p>{{culture.name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cultures: [],
      errors: []
    }
  },
  created() {
    axios.get('https://api.got.show/api/cultures/')
      .then(response => {
        this.cultures = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
}
</script>

<style scoped>
.data-items p{
  color: bisque;
  text-align: center;
}
</style>