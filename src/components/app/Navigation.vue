<template>
  <nav role="navigation" v-bind:class="fixNavigation">
    <div v-bind:class="slideNav" class="wrapper">
      <div>
        <router-link :to="{name: 'Home'}">
          <i class="fa fa-home fa-2x" aria-hidden="true"></i>
        </router-link>
        <app-search class="search-bar"></app-search>
      </div>
      <ul v-on:click="hideNav()">
        <li v-for="menuItem in menuItems" :key="menuItem.index">
          <router-link :to="{name: menuItem}">{{menuItem}}</router-link>
        </li>
      </ul>
    </div>
    <i class="menu-button fa fa-bars fa-2x" v-show="menuButton" v-on:click="toggleNav()" aria-hidden="true"></i>
    <i class="menu-button fa fa-times-circle-o fa-2x" v-show="menuButtonClose" v-on:click="toggleNav()" aria-hidden="true"></i>
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
      showNav: false,
      menuButton: true,
      menuButtonClose: false 
    }
  },
  computed: {
    fixNavigation() {
      return {
        'fixed': this.fixed && window.innerWidth > 768
      }
    },
    slideNav() {
      return {
        'toggle-nav': this.showNav && window.innerWidth < 768
      }
    }
  },
  methods: {
    handleScroll() {
      this.fixed = window.scrollY > window.innerHeight - 70;
    },
    toggleNav() {
      this.showNav = !this.showNav;
      this.menuButton = !this.menuButton;
      this.menuButtonClose = !this.menuButtonClose;
    },
    hideNav() {
      this.showNav = false;
      this.menuButton = !this.menuButton;
      this.menuButtonClose = !this.menuButtonClose;
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  }
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
  animation-duration: .5s;
  animation-name: nav-bounce;
}

nav .wrapper div {
  display: flex;
  width: 40%;
}

nav .wrapper div a i {
  position: absolute;
  top: 20px;
  left: 20px;
  color: white;
  transition: .2s ease-in-out;
}

nav .wrapper div a i:hover {
  color: bisque;
}

nav .wrapper ul {
  width: 50%;
  display: flex;
  justify-content: flex-end;
  list-style: none;
}

nav .wrapper ul li {
  width: 100%;
  text-align: center;
}

nav .wrapper ul li a {
  display: block;
  text-decoration: none;
  color: white;
  font-style: italic;
  font-weight: bold;
  transition: .2s ease-in-out;
}

nav .wrapper ul li a:hover {
  background: bisque;
  color: black;
}

.menu-button {
  display: none;
}

.router-link-exact-active,
.router-link-exact-active i {
  color: chocolate !important;
}

@keyframes nav-bounce {
  from { transform: scale(1); }
  50% { transform: scale(1.05); }
  to { transform: scale(1); }
}

@media only screen and (max-width: 768px) {
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

  nav .wrapper div a i {
    top: 110px;
    border-bottom: white solid 1px;
    width: 85%;
    text-align: center;
  }

  nav .wrapper div .search-bar {
    position: absolute;
    left: -70px;
  }

  nav .wrapper ul {
    position: absolute;
    width: 100%;
    top: 170px;
  }

  nav .wrapper ul {
    flex-direction: column;
  }

  nav .wrapper ul li a:hover {
  background: transparent;
  color: white;
}

  .toggle-nav {
    transform: translateX(260px);
  }
  
  .menu-button {
    display: block;
    position: fixed;
    left: 85%;
    top: 10px;
    color: white;
    padding: 10px;
    border-radius: 5px;
    background: rgba(0, 0, 0, .8);
    box-shadow: 3px 3px 20px rgba(0, 0, 0, .6);
    z-index: 10;
    animation-name: change-menu-icon;
    animation-duration: .4s;
    animation-fill-mode: forwards;
  }

    @keyframes change-menu-icon {
    from { transform: rotateY(0deg); }
    to { transform: rotateY(180deg); }
  }
}
</style>