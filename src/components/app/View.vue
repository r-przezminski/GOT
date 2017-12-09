<template>
  <main>
    <app-loading v-if="isLoading"></app-loading>
    <app-error v-show="isError"></app-error>
    <router-view v-show="!isError" :class="[isLoading ? '' : 'show']" class="view"></router-view>
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
    ...mapGetters(["isLoading", "isError"])
  }
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
  transition: 0.5s linear;
}

.show {
  opacity: 1;
}

@media only screen and (max-width: 768px) {
  main {
    padding: 10px;
  }
}
</style>
