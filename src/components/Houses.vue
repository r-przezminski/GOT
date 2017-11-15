<template>
  <div class="wrapper">
    <title-component v-bind:number="123"></title-component>
    <app-modal v-if="modal.show">
      <h2 slot="header">{{modal.data.name}}</h2>
      <img  slot="img" v-if="modal.data.imageLink" :src="'https://api.got.show' + modal.data.imageLink" :alt="'image of ' + modal.data.name">
      <img slot="img" v-else src="../assets/img/NoImage.png" alt="No image">
      <div slot="info">
        <ul v-if="modal.data.ancestralWeapon && modal.data.ancestralWeapon.length > 0">Ancestral weapon:
          <li v-for="ancestralWeapon in modal.data.ancestralWeapon" :key="ancestralWeapon.index">{{ancestralWeapon}},</li>
        </ul>
        <ul v-if="modal.data.cadetBranch">Cadet branch:
          <li>{{modal.data.cadetBranch}}</li>
        </ul>
        <ul v-if="modal.data.coatOfArms">Coat of arms:
          <li>{{modal.data.coatOfArms}}</li>
        </ul>
        <ul v-if="modal.data.currentLord">Current lord:
          <li>{{modal.data.currentLord}}</li>
        </ul>
        <ul v-if="modal.data.overlord">Overlord:
          <li>{{modal.data.overlord}}</li>
        </ul>
        <ul v-if="modal.data.region">Region:
          <li>{{modal.data.region}}</li>
        </ul>
        <ul v-if="modal.data.title">Title:
          <li>{{modal.data.title}}</li>
        </ul>
        <ul v-if="modal.data.words">Words:
          <li>{{modal.data.words}}</li>
        </ul>
      </div>
    </app-modal>
    <div id="image-filter">
      <label for="has-photo">
        <p>Images:</p>
      </label>
      <input v-model="filterBy.photo" type="checkbox" name="hasPhoto" id="has-photo">
    </div>
    <div id="houses-container">
      <div id="house" v-for="(house, index) in filteredHouses" :key="house._id">
        <h3>{{house.name}}</h3>
        <img v-if="house.imageLink" :src="'https://api.got.show' + house.imageLink" alt="">
        <img v-else src="../assets/img/NoImage.png" alt="no image">
        <button v-on:click="getHouseInfo(house, index)" type="button">More info</button>
      </div>
    </div>
  </div>
</template>

<script>
import Title from '@/components/Title'
import Modal from '@/components/app/Modal'

export default {
  components: {
    'title-component': Title,
    'app-modal': Modal
  },
  data() {
    return {
      houses: [],
      filterBy: {
        search: '',
        photo: false
      },
      modal: {
        show: false,
        data: {}
      }
    }
  },
  created() {
    this.fetchHouses();
    Event.$on('close-modal', () => { setTimeout(() => { this.modal.show = false }, 3000) });
    Event.$on('searching', value => { this.filterBy.search = value })
  },
  computed: {
    filteredHouses() {
      return this.houses.filter((house) => {
        return house.name.toLowerCase().match(this.filterBy.search.toLowerCase())
      })
        .filter((house) => {
          switch (this.filterBy.photo) {
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
          this.fetchHousesImages(response.body);
          Event.$emit('resultsAll', this.houses.length, 'Houses');
        }, error => {
          Event.$emit('error', error.status, error.statusText);
        });
    },
    fetchHousesImages(data) {
      for (let index = 0; index <= data.length - 1; index++) {
        if(index >= 4 && index <= 104 && index != 5 && index != 7 && index != 64) {
          data[index].imageLink = null;
        }
        this.houses.push(data[index]);
      }
    },
    getHouseInfo(house) {
      this.modal.data = house;
      this.modal.show = true;
    }
  },
  watch: {
    filteredHouses: (value) => {
      Event.$emit('resultsMatched', value.length);
    }
  },
}
</script>

<style lang="scss" scoped>
$chocolate: chocolate;
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
  color: #FFE4C4;
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
  background-color: $chocolate;
  color: white;
  padding: 10px;
  border-radius: 5px;
  outline: none;
  border: 1px solid transparent;
  transition: .2s ease-in-out;
}

#house button:hover {
  cursor: pointer;
  border: 1px solid bisque;
  color: bisque;
}

#house button:focus {
  animation-name: button-animation;
  animation-duration: .7s;
}

@keyframes button-animation {
  from { transform: scale(1.5, 1); }
  to { transform: scale(1, 1); }
}

@media only screen and (max-width: 768px) {
  #image-filter {
    grid-column: 8/12;
  }
}
</style>