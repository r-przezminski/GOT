<template>
  <main>
    <app-loading v-show="loading"></app-loading>
    <app-error v-show="error"></app-error>
    <router-view v-show="main"></router-view>
  </main>
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
    Event.$on('error', () => { 
      this.error = true;
      this.main = false;
      this.loading = false;
    })
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  background: #d8d8d8;
}

main {
  max-width: 960px;
  margin: 50px auto;
}

@media only screen and (max-width: 768px) {
  main {
    padding: 10px;
  }
}
</style>
