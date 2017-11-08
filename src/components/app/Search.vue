<template>
  <div>
    <div class="search">
      <input v-model="search" v-on:keyup="searching()" type="text" placeholder="Search...">
      <i class="fa fa-search" aria-hidden="true"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      results: {
        visible: false,
        label: '',
        all: 0,
        matched: 0
      }
    }
  },
  methods: {
    searching() {
      Event.$emit('searching', this.search);
    },
  },
  created() {
    Event.$on('clearFilter', () => { this.search = ''; })
  },
  computed: {
    triggerResults() {
      return {
        'show-result': this.results.visible && window.innerWidth > 700
      }
    }
  },
  filters: {
    firstToUpper: (value) => {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>

<style scoped>
.search {
  display: flex;
  justify-content: center;
  position: relative;
}

.search i {
  position: absolute;
  top: 23px;
  left: 90px;
  color: white;
  transition: .5s ease;
}

.search input {
  position: absolute;
  top: 15px;
  left: 100px;
  height: 35px;
  width: 85px;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  border: none;
  outline: none;
  border-bottom: 1px solid white;
  background: transparent;
  color: white;
  transition: .5s ease;
}

.search input:focus {
  width: 240px;
  border-bottom: 1px solid chocolate;
}

.search input:focus~i {
  color: chocolate;
}

@media only screen and (max-width: 768px) {
  .search input:focus {
    width: 200px;
  }
}
</style>