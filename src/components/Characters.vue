<template>
  <div class="wrapper">
    <title-component></title-component>
    <app-modal v-if="getModalStatus">
      <h2 slot="header">{{character.name}}</h2>
      <img slot="img" :src="character.imageLink" alt="">
      <div slot="info">
        <ul>Titles:
          <li v-for="title in character.titles" :key="title.index">{{title}}</li>
        </ul>
        <ul>House:
          <li>{{character.house}}</li>
        </ul>
        <ul>Culture:
          <li>{{character.culture}}</li>
        </ul>
        <ul>Spouse:
          <li>{{character.spouse}}</li>
        </ul>
        <ul>Date of birth:
          <li>{{character.dateOfBirth}}</li>
        </ul>
        <ul>Date of death:
          <li>{{character.dateOfDeath}}</li>
        </ul>
        <ul>Books:
          <li v-for="book in character.books" :key="book.index">{{book}}</li>
        </ul>
      </div>
    </app-modal>
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
    return {
      character: {}
    };
  },
  computed: {
    ...mapGetters([
      "filteredCharacters",
      "houses",
      "imageLinkFilterStatus",
      "genderFilter",
      "housesFilter",
      "getModalStatus"
    ])
  },
  methods: {
    ...mapActions([
      "getCharacters",
      "getFilterOptionsHouses",
      "imageLinkFilterHandler",
      "genderFilterHandler",
      "housesFilterHandler",
      "updateTitleResultMatched",
      "switchModal"
    ]),
    getCharacterInfo(character) {
      this.character = character;
      this.switchModal();
    }
  },
  created() {
    this.getCharacters("characters");
    this.getFilterOptionsHouses("houses");
  },
  watch: {
    filteredCharacters: function(result) {
      this.updateTitleResultMatched(result.length);
    }
  }
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
  animation-duration: 0.3s;
}

@keyframes button-animation {
  from {
    transform: scale(1.1);
  }
  to {
    transform: scale(1);
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
