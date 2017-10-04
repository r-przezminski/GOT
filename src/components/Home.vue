<template>
  
  <div>
    <p>{{msg}}</p>
    <div v-for="event in events">{{event.name}}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'HOME',
      events: [],
      errors: []
    }
  },
  created(){
    axios.get('https://api.got.show/api/cities/')
    .then(response => {
      this.events = response.data
      console.log(this.events);
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
}
</script>

<style scoped>

</style>
