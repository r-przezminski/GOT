<template>
  <div>
    <div class="search">
      <input v-model="search" v-on:keyup="searching()" type="text" placeholder="Search...">
      <i class="fa fa-search" aria-hidden="true"></i>
    </div>
    <div v-bind:class="triggerResults" class="results">
      <div class="title">
        <h2>{{results.label | firstToUpper}}</h2>
      </div>
      <div class="all">
        <p>All:</p>
        <h3>{{results.all}}</h3>
      </div>
      <div class="matched">
        <p>Matched:</p>
        <h3>{{results.matched}}</h3>
      </div>
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
    hideResults() {

    }
  },
  created() {
    Event.$on('clearFilter', () => { this.search = ''; })
    Event.$on('resultsAll', (all, label) => {
      this.results.all = all;
      this.results.label = label;
    });
    Event.$on('resultsMatched', (matched) => {
      this.results.matched = matched;
      this.results.visible = true;
      if (this.search === '') {
        setTimeout(() => { this.results.visible = false }, 5000);
      }
    });
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
  border-bottom: 1px solid bisque;
}

.search input:focus~i {
  color: bisque;
}

.show-result {
  transform: translateX(350px);
}

.results {
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 70px;
  left: -350px;
  background: rgba(0, 0, 0, .8);
  width: 350px;
  height: 150px;
  padding: 0 20px;
  transition: .3s linear;
}

.results .title {
  color: bisque;
  font-weight: bold;
  font-style: italic;
  text-align: center;
}

.results .all {
  display: flex;
  position: absolute;
  top: 40px;
}

.results .matched {
  display: flex;
  position: absolute;
  top: 80px;
}

.results h3 {
  margin-left: 20px;
  color: bisque;
}

.results p {
  color: white;
}

@media only screen and (max-width: 700px) {
  .search input:focus {
    width: 200px;
  }

  .results {
    top: 70px;
    width: 250px;
    left: 70px;
    background: transparent;
  }
  .results .all {
    left: 80px;
  }
  .results .matched {
    left: 60px;
  }
}
</style>