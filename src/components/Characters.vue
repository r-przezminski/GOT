<template>
  <div class="wrapper">
    <title-component></title-component>
    <app-modal v-if="modal.show">
      <h2 slot="header">{{modal.data.name}}</h2>
      <img  slot="img" v-if="modal.data.imageLink" :src="'https://api.got.show' + modal.data.imageLink" :alt="'image of ' + modal.data.name">
      <img slot="img" v-else src="../assets/img/NoImage.png" alt="No image">
      <div slot="info">
        <ul v-if="modal.data.titles && modal.data.titles.length > 0">Titles:
          <li v-for="title in modal.data.titles" :key="title.index">{{title}},</li>
        </ul>
        <ul v-if="modal.data.house">House:
          <li>{{modal.data.house}}</li>
        </ul>
        <ul v-if="modal.data.culture">Culture:
          <li>{{modal.data.culture}}</li>
        </ul>
        <ul v-if="modal.data.region">Region:
          <li>{{modal.data.region}}</li>
        </ul>
        <ul v-if="modal.data.spouse">Spouse:
          <li>{{modal.data.spouse}}</li>
        </ul>
        <ul v-if="modal.data.dateOfBirth">Date of birth:
          <li>{{modal.data.dateOfBirth}}</li>
        </ul>
        <ul v-if="modal.data.dateOfDeath">Date of death:
          <li>{{modal.data.dateOfDeath}}</li>
        </ul>
        <ul v-if="modal.data.books && modal.data.books.length > 0">Books:
          <li v-for="book in modal.data.books" :key="book.index">{{book}},</li>
        </ul>
      </div>
    </app-modal>
    <div id="image-filter">
      <label for="has-photo">
        <p>Images:</p>
      </label>
      <input v-model="filterBy.photo" type="checkbox" name="hasPhoto" id="has-photo">
    </div>
    <div id="gender-filter">
      <label for="gender">
        <p>Filter by gender:</p>
      </label>
      <v-select v-model="filterBy.gender.value" :options="filterBy.gender.options" id="gender"></v-select>
    </div>
    <div id="house-filter">
      <label for="houses">
        <p>Filter by house:</p>
      </label>
      <v-select v-model="filterBy.houses" multiple :options="houses" id="houses"></v-select>
    </div>
    <div id="characters-container">
      <div class="character" v-for="(character, index) in filteredCharacters" :key="character._id">
        <h3>{{character.name}}</h3>
        <img v-if="character.imageLink" :src="'https://api.got.show' + character.imageLink" alt="">
        <img v-else src="../assets/img/NoImage.png" alt="no image">
        <button v-on:click="getCharacterInfo(character)" type="button">More info</button>
      </div>
    </div>
  </div>
</template>

<script>
import Title from '@/components/Title'
import Modal from '@/components/app/Modal'
import vSelect from 'vue-select'

export default {
  components: {
    'v-select': vSelect,
    'title-component': Title,
    'app-modal': Modal
  },
  data() {
    return {
      characters: [],
      filterBy: {
        search: '',
        gender: {
          options: ['All', 'Female', 'Male'],
          value: 'All'
        },
        photo: false,
        houses: []
      },
      houses: [],
      modal: {
        show: false,
        data: {}
      }
    }
  },
  created() {
    Event.$on('searching', (value) => { this.filterBy.search = value });
    Event.$on('close-modal', () => { setTimeout(() => { this.modal.show = false }, 3000) });
    this.fetchCharacters();
  },
  methods: {
    fetchCharacters() {
      this.$http.get('characters')
        .then(response => {
          this.characters = response.body;
          Event.$emit('resultsAll', this.characters.length, 'Characters');
          console.log(response.body);
          this.fetchHouses();
        }, error => {
          if (error.status && error.statusText) {
            Event.$emit('error', error.status, error.statusText);
          }
          else {
            Event.$emit('error', 'Uppsss', 'An error ocured');
          }
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
    getCharacterInfo(character) {
      Event.$emit('show-header');
      this.modal.data = character;
      this.modal.show = true;
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

<style>
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

#gender-filter {
  grid-column: 2/6;
  grid-row: 2/3;
  align-self: center;
  text-align: center;
  font-style: italic;
}

#house-filter {
  grid-column: 6/12;
  grid-row: 2/3;
  align-self: center;
  text-align: center;
  font-style: italic;
}

#gender,
#houses {
  margin-top: 10px;
}

#characters-container {
  grid-column: 1/13;
  grid-row: 4/5;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px;
}

.character {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
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

.character h3 {
  color: bisque;
  font-style: italic;
  height: 50px;
}

.character img {
  width: 250px;
  height: 280px;
}

.character button {
  height: 40px;
  min-width: 150px;
  margin: 15px 0;
  background-color: #D2691E;
  color: white;
  padding: 10px;
  border-radius: 5px;
  outline: none;
  border: 1px solid transparent;
  transition: .2s ease-in-out;
}

.character button:hover {
  cursor: pointer;
  border: 1px solid bisque;
  color: bisque;
}

.character button:focus {
  animation-name: button-animation;
  animation-duration: .7s;
}

@keyframes button-animation {
  from { transform: scale(1.5, 1); }
  to { transform: scale(1, 1); }
}

@media only screen and (max-width: 768px) {
  #gender-filter {
    grid-column: 2/12;
    grid-row: 2/3;
  }

  #house-filter {
    grid-column: 2/12;
    grid-row: 3/4;
    margin-top: 20px;
  }
  #characters-container {
    grid-row: 5/6;
  }

  #image-filter {
    grid-column: 8/12;
  }
}
</style>
