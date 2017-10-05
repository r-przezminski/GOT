<template>
  <div v-show="showFilter" class="search">
    <input v-on:keyup="searching()" type="text" v-model="search" placeholder="Search...">
  </div>
</template>

<script>
export default {
  data() {
    return {
      showFilter: true,
      search: ''
    }
  },
  methods: {
    searching() {
      Event.$emit('searching', this.search)
    },
    trigerFilter() {
      Event.$on('showFilter', (value) => {
        for (let index = 0; index < value.length; index++) {
          if (this.$route.path.includes(value[index])) {
            this.showFilter = true;
            break;
          }
        }
      });
      Event.$on('hideFilter', () => { this.showFilter = false });
    }
  },
  created() {
    this.trigerFilter();
  }
}
</script>

<style scoped>
.search {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.search input {
  border: none;
  border-bottom: 1px solid bisque;
  /* border-right: 1px solid bisque; */
  outline: none;
  height: 50px;
  width: 100px;
  color: white;
  font-size: 20px;
  background: rgba(0, 0, 0, .7);
  box-shadow: 1px 3px 10px rgba(0, 0, 0, .7);
  padding: 10px;
  border-radius: 5px;
  transition: .5s ease;
}

.search input:focus {
  width: 400px;
}
</style>