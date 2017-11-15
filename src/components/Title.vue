<template>
  <div class="component-title">
    <h2>{{label}}</h2>
    <div id="results-all">
      <p>All: </p>
      <!-- <h4>{{results.all}}</h4> -->
    </div>
    <div id="results-matched">
      <p>Matched:</p>
      <!-- <h4>{{results.matched}}</h4> -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      //   label: '',
      //   results: {
      //     all: '',
      //     matched: ''
      //   },
    };
  },
  computed: {
    ...mapGetters(["label"])
  },
  methods: {
    ...mapActions(["getLabel"])
  },
  created() {
    // Event.$on('resultsAll', (all, label) => {
    //   this.results.all = all;
    //   this.label = label;
    // });
    // Event.$on('resultsMatched', (matched) => {
    //   this.results.matched = matched;
    // });
    this.getLabel(this.$route.name);
  }
};
</script>

<style scoped>
.component-title {
  grid-column: 1/13;
  grid-row: 1/2;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(50px, auto);
  padding: 20px;
}

.component-title h2 {
  grid-column: 1/13;
  grid-row: 1/2;
  color: chocolate;
  font-style: italic;
  font-weight: bold;
  border-bottom: solid 1px chocolate;
  align-self: start;
}

#results-all {
  grid-column: 4/6;
  grid-row: 1/2;
  display: flex;
  margin-top: 5px;
}

#results-matched {
  grid-column: 7/9;
  grid-row: 1/2;
  display: flex;
  margin-top: 5px;
}

.component-title p {
  font-style: italic;
}

.component-title h4 {
  color: chocolate;
  margin-left: 10px;
}

@media only screen and (max-width: 768px) {
  #results-all {
    grid-column: 1/6;
    grid-row: 2/3;
    justify-self: center;
  }

  #results-matched {
    grid-column: 7/13;
    grid-row: 2/3;
    justify-self: center;
  }
}
</style>
