<template>
  <div class="character-container">
    <div class="character-image">
      <div v-if="character.imageLink">
        <img :src="'https://api.got.show' + character.imageLink" :alt="'image of ' + character.name">
      </div>
      <div v-else>
        <h4>This character doesn't have any image yet.</h4>
      </div>
    </div>
    <div class="character-info">
      <div class="info">
        <h2>{{character.name}}</h2>
      </div>
      <div class="info">
        <h4>Titles: </h4>
        <p class="no-info" v-if="arrayLength.titlesLength == 0">No titles</p>
        <p v-else v-for="title in character.titles" :key="title.index">{{title}},</p>
      </div>
      <div class="info">
        <h4>House: </h4>
        <p v-if="character.house">{{character.house}}</p>
        <p class="no-info" v-else>No information</p>
      </div>
      <div class="info">
        <h4>Date of birth: </h4>
        <p v-if="character.dateOfBirth">{{character.dateOfBirth}}</p>
        <p class="no-info" v-else>No information</p>
      </div>
      <div class="info">
        <h4>Date of death: </h4>
        <p v-if="character.dateOfDeath">{{character.dateOfDeath}}</p>
        <p class="no-info" v-else>No information</p>
      </div>
      <div class="info">
        <h4>Books: </h4>
        <p class="no-info" v-if="arrayLength.booksLength == 0">No books</p>
        <p v-else v-for="book in character.books" :key="book.index">{{book}},</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      character: [],
      arrayLength: {
        booksLength: 0,
        titlesLength: 0
      },
      errors: []
    }
  },
  created() {
    axios.get('https://api.got.show/api/characters/byId/' + this.$route.params.id)
      .then(response => {
        this.character = response.data.data
        this.arrayLength.booksLength = this.character.books.length
        this.arrayLength.titlesLength = this.character.titles.length
      })
      .catch(e => {
        this.errors.push(e)
        console.log(this.errors);
      })
  }
}
</script>

<style scoped>
.character-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}

.character-image {
  width: 40%;
  text-align: center;
}

.character-image img {
  box-shadow: 5px 10px 20px rgba(0, 0, 0, .7);
  border: 1px solid bisque;
  border-radius: 5px;
  max-width: 34vw;
  height: 420px;
}

.character-info {
  padding: 50px 40px;
  width: 60%;
  border: 1px solid bisque;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.7);
  box-shadow: 5px 10px 20px rgba(0, 0, 0, .7);
}

.info {
  min-height: 50px;
  display: flex;
  flex-wrap: wrap;
}

.info:first-child {
  border-bottom: 1px solid bisque;
  margin-bottom: 20px;
}

.info p {
  margin-left: 10px;
  color: white;
  font-style: italic;
}

.info h4 {
  color: bisque;
  font-weight: bold;
}

.info h2 {
  margin: auto;
  color: bisque;
}

.no-info {
  color: indianred !important;
}

@media only screen and (max-width: 700px) {
  .character-container {
    flex-direction: column;
  }

  .character-info {
    width: 95%;
    margin-top: 50px;
  }

  .character-image {
    width: 95%;
  }

  .character-image img {
    width: 100%;
    height: 100%;
  }

  .info h2 {
    font-size: 20px;
  }
}
</style>