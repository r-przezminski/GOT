<template>
  <div class="wrapper">
    <title-component></title-component>
    <div id="cities-container">
      <div id="city" v-for="city in filteredCities" :key="city._id">
        <h3>{{city.name}}</h3>
        <a target="_blank" :href="city.link">See on westeros.org</a>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/Title";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    "title-component": Title
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["filteredCities"])
  },
  methods: {
    ...mapActions(["getCities", "updateTitleResultMatched"])
  },
  created() {
    this.getCities("cities");
  },
  watch: {
    filteredCities: function(result) {
      this.updateTitleResultMatched(result.length);
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(50px, auto);
  grid-column-gap: 5px;
}

#cities-container {
  grid-column: 1/13;
  grid-row: 2/3;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px;
}

#city {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 300px;
  height: auto;
  margin-bottom: 20px;
  background: rgba(0, 0, 0, 0.8);
  box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.6);
  text-align: center;
  border-bottom: 1px solid bisque;
  border-right: 1px solid bisque;
  border-radius: 10px;
}

#city h3 {
  color: bisque;
  font-style: italic;
  height: 50px;
}

#city a {
  height: 40px;
  background-color: chocolate;
  color: white;
  padding: 10px;
  border-radius: 5px;
  display: block;
  text-decoration: none;
  color: white;
  font-size: 14px;
  border: 1px solid transparent;
  transition: 0.2s ease-in-out;
}

#city a:hover {
  cursor: pointer;
  border: 1px solid bisque;
  color: bisque;
}

#city a:focus {
  animation-name: button-animation;
  animation-duration: 0.7s;
}

@keyframes button-animation {
  from {
    transform: scale(1.5, 1);
  }
  to {
    transform: scale(1, 1);
  }
}
</style>