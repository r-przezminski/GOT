<template>
  <div class="wrapper">
    <!-- <div class="filters">
      <div class="filters-top">

        <div>
          <label for="has-photo">
            <strong>Filter by image</strong>
          </label>
          <input v-model="filterBy.photo" type="checkbox" name="hasPhoto" id="has-photo">
        </div>
        <div>
          <button v-on:click="getRandomCharacter()" type="button">Random character</button>
        </div>
      </div>
      <div class="filters-bottom">
        <div>
          <label for="gender">
            <strong>Filter by gender</strong>
          </label>
          <v-select v-model="filterBy.gender.value" :options="filterBy.gender.options"></v-select>
        </div>
        <div>
          <label for="houses">
            <strong>Filter by house</strong>
          </label>
          <v-select v-model="filterBy.houses" multiple :options="houses" id="houses"></v-select>
        </div>
      </div>
    </div> -->
    <!-- <div class="characters-container">
      <div class="characters" v-for="character in filteredCharacters" :key="character._id">
        <img v-if="character.imageLink" :src="'https://api.got.show' + character.imageLink" alt="">
        <img v-else src="../assets/img/NoImage.png" alt="">
        <router-link :to="{name: 'Character', params: {id: character._id}}">{{character.name}}</router-link>
      </div>
    </div> -->
  </div>
</template>

<script>
import vSelect from 'vue-select'

export default {
  components: {
    'v-select': vSelect
  },
  data() {
    return {
      characters: [],
      filterBy: {
        search: '',
        gender: {
          options: ['All characters', 'Female', 'Male'],
          value: 'All characters'
        },
        photo: false,
        houses: []
      },
      houses: []
    }
  },
  created() {
    Event.$on('searching', (value) => { this.filterBy.search = value });
    this.fetchCharacters();
  },
  methods: {
    // fetchCharacters() {
    //   fetch('https://api.got.show/api/characters')
    //     .then((response) => {
    //       return response.json()
    //     })
    //     .then((characters) => {
    //       this.characters = characters;
    //       Event.$emit('resultsAll', this.characters.length, 'characters');
    //     })
    //     .catch((error) => {
    //       Event.$emit('error', error.message);
    //     })
    // },
    // fetchHouses() {
    //   fetch('https://api.got.show/api/houses')
    //     .then((response) => {
    //       return response.json()
    //     })
    //     .then((houses) => {
    //       for (let index = 0; index < houses.length; index++) {
    //         this.houses.push(houses[index].name);
    //       }
    //     })
    //     .catch((error) => {
    //       Event.$emit('error', error.message);
    //     })
    // },

    fetchCharacters() {
      this.$http.get('characters')
        .then(response => {
          this.characters = response.body;
          Event.$emit('resultsAll', this.characters.length, 'characters');
          this.fetchHouses();
        }, error => {
          Event.$emit('error', error.status, error.statusText);
        });
    },
    fetchHouses() {
      this.$http.get('houses')
        .then(response => {
          for (let index = 0; index < response.data.length; index++) {
            this.houses.push(response.data[index].name);
          }
        }, error => {
          Event.$emit('error', error.status, error.statusText);
        });
    },
    getRandomCharacter() {
      let random = Math.floor(Math.random() * this.characters.length);
      this.$router.push({ name: 'Character', params: { id: this.characters[random]._id } });
    },
  },
  computed: {
    filteredCharacters() {
      return this.characters.filter((character) => {
        return character.name.toLowerCase().match(this.filterBy.search.toLowerCase());
      })
        .filter((character) => {
          switch (this.filterBy.gender.value) {
            case "Male": return character.male == true;
              break;
            case "Female": return character.male == false;
              break;
            default: return character;
              break;
          }
        })
        .filter((character) => {
          switch (this.filterBy.photo) {
            case true: return character.imageLink != null;
              break;
            default: return character;
              break;
          }
        })
        .filter((character) => {
          if (this.filterBy.houses.length > 0) {
            return character.house != null && this.filterBy.houses.includes(character.house);
          }
          else {
            return character;
          }
        })
    }
  },
  watch: {
    filteredCharacters: (value) => {
      Event.$emit('resultsMatched', value.length);
    }
  },
}
</script>

<style scoped>
/* .filters {
  min-height: 150px;
  width: 90%;
  margin: auto;
}

.filters div {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.filters-top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  height: 100px;
  width: 100%;
}

.filters-bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  height: 100px;
  width: 100%;
  margin-bottom: 50px;
}

.filters-bottom div {
  width: 400px;
}

.filters label {
  padding: 10px;
}

.filters button {
  height: 50px;
  width: 160px;
  border: none;
  border-bottom: 1px solid bisque;
  border-right: 1px solid bisque;
  border-radius: 5px;
  outline: none;
  text-align: center;
  color: white;
  background: rgba(0, 0, 0, .7);
  box-shadow: 1px 5px 10px rgba(0, 0, 0, .7);
}

.filters button:hover {
  color: bisque;
  cursor: pointer;
}

.filters input[type="checkbox"] {
  font-size: 30px;
  appearance: none;
  width: 2em;
  height: 1em;
  background: #DDE2EB;
  border-radius: 3em;
  position: relative;
  cursor: pointer;
  outline: none;
  transition: all .2s ease-in-out;
}

.filters input[type="checkbox"]:checked {
  background: bisque;
}

.filters input[type="checkbox"]:after {
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

.filters input[type="checkbox"]:checked:after {
  left: calc(100% - 1em);
} */

.characters-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}

.characters {
  width: 200px;
  height: 250px;
  margin: 10px 10px;
  border-bottom: 1px solid bisque;
  border-right: 1px solid bisque;
  border-radius: 5px;
  background: #DDE2EB;
  box-shadow: 2px 5px 10px rgba(0, 0, 0, .7);
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
}

.characters img {
  width: 200px;
  height: 180px;
  border-bottom: 1px solid bisque;
}

.characters a {
  text-decoration: none;
  color: black;
  text-align: center;
  position: absolute;
  top: 205px;
  transition: .2s ease-in-out;
}

.characters a:hover {
  color: coral;
}
</style>
