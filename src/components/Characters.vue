<template>
  <div class="data-container">
    <div class="data-items" v-for="character in filteredCharacters" :key="character._id">
      <router-link :to="{name: 'character', params: {id: character._id}}">{{character.name}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      characters: [],
      search: ''
    }
  },
  created() {
    Event.$on('searching', (value) => { this.search = value })
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
    }
  },
  computed: {
    filteredCharacters() {
      return this.characters.filter((character) => {
        return character.name.toLowerCase().match(this.search);
      })
    }
  },
  mounted() {
    this.fetchCharacters();
  }
}
</script>

<style scoped>
.filters {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.filters input {
  border: none;
  border-bottom: 1px solid bisque;
  outline: none;
  height: 50px;
  width: 100px;
  color: white;
  font-size: 20px;
  background: rgba(0, 0, 0, .7);
  box-shadow: 0 5px 10px rgba(0, 0, 0, .7);
  padding: 10px;
  border-radius: 5px;
  transition: .5s ease;
}

.filters input:focus {
  width: 400px;
}
</style>