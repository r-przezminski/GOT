<template>
  <div class="data-container">
    <div class="data-items" v-for="region in regions" :key="region._id">
      <p>{{region.name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      regions: []
    }
  },
  methods: {
    fetchRegions() {
      axios.get('https://api.got.show/api/regions/')
        .then(response => {
          this.regions = response.data;
        })
        .catch(error => {
          Event.$emit('error', error.message);
        })
    }
  },
  mounted() {
    this.fetchRegions();
  }
}
</script>

<style scoped>
.data-items p {
  color: bisque;
  text-align: center;
}
</style>