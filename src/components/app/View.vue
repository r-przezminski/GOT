<template>
  <main>
    <app-loading v-show="isLoading"></app-loading>
    <app-error v-show="error"></app-error>
    <router-view :class="{'view-show': !isLoading}" class="view"></router-view>
  </main>
</template>

<script>
import Loading from "@/components/app/Loading";
import Error from "@/components/app/Error";
import { mapGetters } from "vuex";

export default {
  name: "app",
  components: {
    "app-loading": Loading,
    "app-error": Error
  },
  computed: {
    ...mapGetters(["isLoading"])
  },
  data() {
    return {
      main: true,
      loading: false,
      error: false
    };
  },
  created() {}
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  background: #d8d8d8;
}

main {
  max-width: 960px;
  margin: 50px auto;
}

.view {
  opacity: 0;
  transition: 1s ease;
}

.view-show {
  opacity: 1;
}

@media only screen and (max-width: 768px) {
  main {
    padding: 10px;
  }
}
</style>
