<template>
  <div class="main">
    <app-loading v-show="loading"></app-loading>
    <app-error v-show="error"></app-error>
    <router-view v-show="main"></router-view>
  </div>
</template>

<script>
import Loading from '@/components/app/Loading';
import Error from '@/components/app/Error';

export default {
  name: 'app',
  components: {
    'app-loading': Loading,
    'app-error': Error
  },
  data() {
    return {
      main: true,
      loading: false,
      error: false
    }
  },
  created() {
    XhrInterceptors.push((request, next) => {
      this.loading = true;
      this.main = false;
      this.error = false;
      Event.$emit('clearFilter');
      next((response) => {
        this.loading = false;
        this.main = true;
      });
    });
    Event.$on('error', () => { this.error = true })
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: aliceblue;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

.main {
  width: 90%;
  margin: 50px auto;
}
</style>
