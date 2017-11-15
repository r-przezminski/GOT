<template>
  <div class="wrapper">
    <title-component></title-component>
    <!-- <app-modal v-if="modal.show">
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
    </app-modal> -->
    <div id="image-filter">
      <label for="has-photo">
        <p>Images:</p>
      </label>
      <input :checked="imageLinkFilterStatus" @click="imageLinkFilterHandler"  type="checkbox" name="hasPhoto" id="has-photo">
    </div>
    <div id="gender-filter">
      <label for="gender">
        <p>Filter by gender:</p>
      </label>
      <v-select :value="genderFilter" :on-change="genderFilterHandler" :options="['All', 'Female', 'Male']" id="gender"></v-select>
    </div>
    <div id="house-filter">
      <label for="houses">
        <p>Filter by house:</p>
      </label>
      <v-select :value="housesFilter" multiple :on-change="housesFilterHandler" :options="houses" id="houses"></v-select>
    </div>
    <div id='characters-container'>
      <div class="character" v-for="(character, index) in filteredCharacters" :key="character._id">
        <h3>{{character.name}}</h3>
        <img :src="character.imageLink" alt="character image">
        <button @click="getCharacterInfo(character)" type="button">More info</button>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/Title";
import Modal from "@/components/app/Modal";
import vSelect from "vue-select";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    "v-select": vSelect,
    "title-component": Title,
    "app-modal": Modal
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      "filteredCharacters",
      "houses",
      "imageLinkFilterStatus",
      "genderFilter",
      "housesFilter"
    ])
  },
  methods: {
    ...mapActions([
      "getCharacters",
      "getHouses",
      "imageLinkFilterHandler",
      "genderFilterHandler",
      "housesFilterHandler"
    ])
  },
  created() {
    if (!this.filteredCharacters.length) {
      this.getCharacters("characters");
      this.getHouses("houses");
    }
  },
};
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
  transition: all 0.2s ease-in-out;
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
  box-shadow: 0 0 0.25em rgba(0, 0, 0, 0.3);
  transform: scale(0.7);
  left: 0;
  transition: all 0.2s ease-in-out;
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
  background: rgba(0, 0, 0, 0.8);
  box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.6);
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
  background-color: #d2691e;
  color: white;
  padding: 10px;
  border-radius: 5px;
  outline: none;
  border: 1px solid transparent;
  transition: 0.2s ease-in-out;
}

.character button:hover {
  cursor: pointer;
  border: 1px solid bisque;
  color: bisque;
}

.character button:focus {
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
