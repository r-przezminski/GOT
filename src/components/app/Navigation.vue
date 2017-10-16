<template>
  <nav v-bind:class="fixNavigation">
    <div v-bind:class="slideNav" class="wrapper">
      <div class="left-side">
        <div class="home">
          <router-link :to="{name: 'Home'}">
            <i class="fa fa-home fa-2x" aria-hidden="true"></i>
          </router-link>
        </div>
        <div class="search-bar">
          <app-search></app-search>
        </div>
      </div>
      <div class="right-side">
        <ul v-on:click="hideNav()">
          <li v-for="menuItem in menuItems" :key="menuItem.index">
            <router-link :to="{name: menuItem}">{{menuItem}}</router-link>
          </li>
        </ul>
      </div>
    </div>
    <i id="burger" v-on:click="toggleNav()" class="fa fa-bars fa-2x" aria-hidden="true"></i>
  </nav>
</template>

<script>
import Search from '@/components/app/Search';

export default {
  components: {
    'app-search': Search
  },
  data() {
    return {
      menuItems: ['Characters', 'Houses', 'Cities', 'Episodes'],
      fixed: false,
      showNav: false
    }
  },
  computed: {
    fixNavigation() {
      return {
        'fixed': this.fixed && window.innerWidth > 700
      }
    },
    slideNav() {
      return {
        'toggle-nav': this.showNav && window.innerWidth < 700
      }
    }
  },
  methods: {
    handleScroll() {
      this.fixed = window.scrollY > window.innerHeight - 70;
    },
    toggleNav() {
      this.showNav = !this.showNav;
    },
    hideNav() {
      this.showNav = false;
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
}
</script>

<style scoped>
nav {
  line-height: 70px;
  width: 100%;
  position: absolute;
  top: calc(100vh - 70px);
}

nav .wrapper {
  display: flex;
  justify-content: space-between;
  background: rgba(0, 0, 0, .8);
  box-shadow: 3px 3px 20px rgba(0, 0, 0, .6);
}

.fixed {
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
}

nav .wrapper .left-side {
  display: flex;
  width: 40%;
}

nav .wrapper .left-side .home i {
  position: absolute;
  top: 20px;
  left: 20px;
  color: white;
  transition: .2s ease-in-out;
}

nav .wrapper .left-side .home i:hover {
  color: bisque;
}

nav .wrapper .right-side {
  width: 50%;
}

nav .wrapper .right-side ul {
  display: flex;
  justify-content: flex-end;
  list-style: none;
}

nav .wrapper .right-side ul li {
  width: 100%;
  text-align: center;
}

nav .wrapper .right-side ul li a {
  display: block;
  text-decoration: none;
  color: white;
  font-style: italic;
  font-weight: bold;
  transition: .2s ease-in-out;
}

nav .wrapper .right-side ul li a:hover {
  background: bisque;
  color: black;
}

#burger {
  display: none;
}
.router-link-exact-active, .router-link-exact-active i {
  color: chocolate !important;
}

@media only screen and (max-width: 700px) {
  nav .wrapper {
    position: fixed;
    top: 0;
    left: -260px;
    flex-direction: column;
    height: 100vh;
    width: 250px;
    transition: .4s ease-in-out;
    z-index: 1;
    overflow: scroll;
  }

  nav .wrapper .left-side .home i {
    top: 230px;
    left: 110px;
  }

  nav .wrapper .left-side .search-bar {
    position: absolute;
    left: -70px;
  }

  nav .wrapper .right-side {
    position: absolute;
    width: 100%;
    top: 280px;
  }

  nav .wrapper .right-side ul {
    flex-direction: column;
  }

  .toggle-nav {
    transform: translateX(260px);
  }

  #burger {
    display: block;
    position: fixed;
    left: 85%;
    top: 10px;
    color: white;
    padding: 10px;
    border-radius: 5px;
    background: rgba(0, 0, 0, .8);
    box-shadow: 3px 3px 20px rgba(0, 0, 0, .6);
  }
}
</style>