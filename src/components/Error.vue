<template>
  <div v-show="error" class="error">
    <h4>Sorry, something went wrong! Couldn't load data!</h4>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: false
    }
  },
  created() {
  },
}
</script>

<style scoped>

.error{
  position: fixed;
  top: 30px;
  width: 300px;
  min-height: 100px;
  background: rgba(0, 0, 0, .7);
  border: 2px solid indianred;
  border-radius: 10px;
  margin: 50px auto;
  padding: 30px;
  z-index: 1;
}

.error h4 {
  color: indianred;
}
</style>