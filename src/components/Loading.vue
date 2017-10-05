<template>
  <div v-show="loading" class="loading">
    <div class="loader"></div>
    <h2>Loading...</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
    }
  },
  created(){
    Event.$on('showLoading', () => {this.loading = true});
    Event.$on('hideLoading', () => {this.loading = false});
  }
}
</script>

<style scoped>
.loading {
  height: 100px;
  margin-bottom: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.loading h2 {
  margin-left: 25px;
}

.loader {
  border: 10px solid rgba(0, 0, 0, .7);
  border-top: 10px solid bisque;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>

