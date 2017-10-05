<template>
  <div class="house-container">
    <div class="house-image">
      <div v-if="house.imageLink">
        <img :src="'https://api.got.show' + house.imageLink" :alt="'image of ' + house.name">
      </div>
      <div v-else>
        <h4>This house doesn't have any image yet.</h4>
      </div>
    </div>
    <div class="house-info">
      <div class="info">
        <h2>{{house.name}}</h2>
      </div>
      <div v-if="house.currentLord" class="info">
        <h4>Current lord: </h4>
        <p>{{house.currentLord}}</p>
      </div>
      <div v-if="house.overLord" class="info">
        <h4>Over lord: </h4>
        <p>{{house.overLord}}</p>
      </div>
      <div v-if="house.region" class="info">
        <h4>Region: </h4>
        <p>{{house.region}}</p>
      </div>
      <div v-if="house.title" class="info">
        <h4>Title: </h4>
        <p>{{house.title}}</p>
      </div>
      <div v-if="house.founded" class="info">
        <h4>Founded: </h4>
        <p>{{house.founded}}</p>
      </div>
      <div v-if="house.cadetBranch" class="info">
        <h4>Cadet branch: </h4>
        <p>{{house.cadetBranch}}</p>
      </div>
      <div v-if="house.words" class="info">
        <h4>Words: </h4>
        <p>{{house.words}}</p>
      </div>
      <div v-if="house.coatOfArms" class="info">
        <h4>Coat of arms: </h4>
        <p>{{house.coatOfArms}}</p>
      </div>
      <div v-if="house.ancestralWeapon && house.ancestralWeapon.length > 0" class="info">
        <h4>Ancestral weapon: </h4>
        <p v-for="ancestralWeapon in house.ancestralWeapon" :key="ancestralWeapon.index">{{ancestralWeapon}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      house: [],
    }
  },
  methods: {
    fetchHouse() {
      axios.get('https://api.got.show/api/houses/byId/' + this.$route.params.id)
        .then(response => {
          this.house = response.data.data;
        })
        .catch(error => {
          Event.$emit('error', error.message);
        })
    }
  },
  mounted() {
    this.fetchHouse();
  }
}
</script>

<style scoped>
.house-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}

.character-image {
  width: 40%;
  text-align: center;
}

.house-image img {
  box-shadow: 5px 10px 20px rgba(0, 0, 0, .7);
  border-bottom: 1px solid bisque;
  border-right: 1px solid bisque;
  border-radius: 5px;
  max-width: 34vw;
  height: 420px;
}

.house-info {
  padding: 50px 40px;
  width: 60%;
  min-height: 420px;
  border-bottom: 1px solid bisque;
  border-right: 1px solid bisque;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.7);
  box-shadow: 5px 10px 20px rgba(0, 0, 0, .7);
}

.info {
  /* padding: 15px; */
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

.search {
  display: none !important;
}

@media only screen and (max-width: 700px) {
  .house-container {
    flex-direction: column;
  }

  .house-info {
    width: 95%;
    margin-top: 50px;
  }

  .house-image {
    width: 95%;
  }

  .house-image img {
    width: 100%;
    height: 100%;
  }

  .info h2 {
    font-size: 20px;
  }
}
</style>