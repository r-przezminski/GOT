<template>
  <div class="data-container">
    <div class="data-items" v-for="location in locations" :key="location.index">
      <router-link :to="{name: location}">{{location | capitalize}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      locations: ['continents', 'regions', 'cities']
    }
  },
  filters: {
    capitalize: (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  },
  created() {
    Event.$emit('hideFilter');
  }
}
</script>

<style scoped>

</style>