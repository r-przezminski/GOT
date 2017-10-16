<template>
  <div class="error">
    <h2>{{status}}! {{message}}!</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      status: '',
    }
  },
  created() {
    Event.$on('error', (status, message) => {
      this.status = status; 
      this.message = message; 
    });
  },
}
</script>

<style scoped>
.error {
  min-width: 300px;
  min-height: 100px;
  background: rgba(255, 0, 0, .5);
  border: 2px solid red;
  border-radius: 10px;
  margin: 50px auto;
  padding: 30px;
}

.error h2 {
  text-align: center;
  color: indianred;
}
</style>