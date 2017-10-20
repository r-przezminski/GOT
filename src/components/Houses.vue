<template>
  <div class="wrapper">
    <header-component></header-component>
    <div id="image-filter">
      <label for="has-photo">
        <p>Images:</p>
      </label>
      <input v-model="photo" type="checkbox" name="hasPhoto" id="has-photo">
    </div>
    <div id="houses-container">
      <div id="house" v-for="house in filteredHouses" :key="house._id">
        <h3>{{house.name}}</h3>
        <img v-if="house.imageLink" :src="'https://api.got.show' + house.imageLink" alt="">
        <img v-else src="../assets/img/NoImage.png" alt="no image">
        <button type="button">More info</button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  components: {
    'header-component': Header
  },
  data() {
    return {
      houses: [],
      search: '',
      photo: false
    }
  },
  created() {
    this.fetchHouses();
    Event.$on('searching', (value) => { this.search = value })
  },
  computed: {
    filteredHouses() {
      return this.houses.filter((house) => {
        return house.name.toLowerCase().match(this.search.toLowerCase())
      })
        .filter((house) => {
          switch (this.photo) {
            case true: return house.imageLink != null;
              break;
            default: return house;
              break;
          }
        })
    }
  },
  methods: {
    fetchHouses() {
      this.$http.get('houses')
        .then(response => {
          this.houses = response.body;
          console.log(response.body);
          Event.$emit('resultsAll', this.houses.length, 'Houses');
        }, error => {
          Event.$emit('error', error.status, error.statusText);
        });
    },
  },
  watch: {
    filteredHouses: (value) => {
      Event.$emit('resultsMatched', value.length);
    }
  },
}
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(50px, auto);
  grid-column-gap: 5px;
}

#image-filter {
  grid-column: 10/12;
  grid-row: 1/2;
  display: flex;
  justify-content: space-around;
  margin-top: 25px;
  font-style: italic;
}

#image-filter input[type="checkbox"] {
  font-size: 20px;
  appearance: none;
  width: 2em;
  height: 1em;
  background: grey;
  border-radius: 3em;
  position: relative;
  cursor: pointer;
  outline: none;
  transition: all .2s ease-in-out;
}

#image-filter input[type="checkbox"]:checked {
  background: chocolate;
}

#image-filter input[type="checkbox"]:after {
  position: absolute;
  content: "";
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 .25em rgba(0, 0, 0, .3);
  transform: scale(.7);
  left: 0;
  transition: all .2s ease-in-out;
}

#image-filter input[type="checkbox"]:checked:after {
  left: calc(100% - 1em);
}

#houses-container {
  grid-column: 1/13;
  grid-row: 2/3;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px;
}

#house {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  width: 300px;
  height: 420px;
  margin-bottom: 20px;
  background: rgba(0, 0, 0, .8);
  box-shadow: 3px 3px 20px rgba(0, 0, 0, .6);
  text-align: center;
  border-bottom: 1px solid bisque;
  border-right: 1px solid bisque;
  border-radius: 10px;
}

#house h3 {
  color: bisque;
  font-style: italic;
  height: 50px;
}

#house img {
  width: 250px;
  height: 280px;
  margin: 10px 0;
}

#house button {
  height: 40px;
  background-color: chocolate;
  color: white;
  padding: 10px;
  border-radius: 5px;
  outline: none;
  border: none;
}

@media only screen and (max-width: 768px) {
  #image-filter {
    grid-column: 8/12;
  }
}
</style>