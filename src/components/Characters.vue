<template>
  <div>
    <search></search>
    <div class="filter">
      <button v-on:click="setGender('all')" type="button">All characters</button>
      <button v-on:click="setGender(true)" type="button">Men</button>
      <button v-on:click="setGender(false)" type="button">Women</button>
      <button v-on:click="getRandomCharacter()" type="button">Random character</button>
    </div>
    <div class="data-container">
      <div class="data-items" v-for="character in filteredCharacters" :key="character._id">
        <router-link :to="{name: 'character', params: {id: character._id}}">{{character.name}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      characters: [],
      search: '',
      gender: 'all'
    }
  },
  created() {
    Event.$on('searching', (value) => { this.search = value });
  },
  methods: {
    fetchCharacters() {
      axios.get('https://api.got.show/api/characters')
        .then(response => {
          this.characters = response.data;
        })
        .catch(error => {
          Event.$emit('error', error.message);
        })
    },
    setGender(gender) {
      this.gender = gender;
    },
    getRandomCharacter() {
      let random = Math.floor(Math.random() * this.characters.length);
      this.$router.push({ name: 'character', params: { id: this.characters[random]._id } });
    },
  },
  computed: {
    filteredCharacters() {
      return this.characters.filter((character) => {
        return character.name.toLowerCase().match(this.search.toLowerCase());
      })
      .filter((character) => {
        switch (this.gender) {
          case true: return character.male == true;
            break;
          case false: return character.male == false;
            break;
          default: return character.male == character.male;
            break;
        }
      })
    }
  },
  mounted() {
    this.fetchCharacters();
  }
}
</script>

<style scoped>
.filter {
  min-height: 100px;
  width: 90%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.filter button {
  margin: 10px;
  height: 50px;
  width: 160px;
  padding: 10px;
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

.filter button:hover {
  color: bisque;
  cursor: pointer;
}
</style>