<template>
  <div id="app">
    <header>
      <div v-bind:class="fixMenuButton">
        <button v-on:click="trigerMenu()" v-bind:class="animateButtonMenu"></button>
      </div>
      <nav v-bind:class="fixNavigation" v-on:click="hideNavigation()">
        <ul v-bind:class="showNavigation">
          <li v-for="menuItem in menuItems" :key="menuItem.index">
            <router-link :to="{name: menuItem}" v-text="menuItem"></router-link>
            <ul v-if="menuItem == 'locations'">
              <li v-for="subMenuItem in subMenuItems" :key="subMenuItem.index">
                <router-link :to="'/locations/' + subMenuItem" v-text="subMenuItem"></router-link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
    <div class="content">
      <loading></loading>
      <router-view></router-view>
    </div>
    <footer>
      <h3>&copy; Game of thrones</h3>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      menuItems: ['home', 'characters', 'locations', 'cultures', 'houses', 'episodes'],
      subMenuItems: ['continents', 'regions', 'cities'],
      fixedNavigation: false,
      fixedMenuButton: false,
      triggerNavigation: false,
      isActiveNavOption: false
    }
  },
  computed: {
    fixNavigation() {
      return {
        'nav-fixed': this.fixedNavigation && window.innerWidth > 700
      }
    },
    fixMenuButton() {
      return {
        'menu-fixed': this.fixedMenuButton
      }
    },
    showNavigation() {
      return {
        'show-nav': this.triggerNavigation
      }
    },
    animateButtonMenu() {
      return {
        'animate-menu-button': this.triggerNavigation,
        'animate-menu-button::after': this.triggerNavigation
      }
    }
  },
  methods: {
    handleScroll() {
      this.fixedMenuButton = window.scrollY > 30;
      this.fixedNavigation = window.scrollY > window.innerHeight * 90 / 100;
    },
    trigerMenu() {
      this.triggerNavigation = !this.triggerNavigation;
    },
    hideNavigation() {
      this.triggerNavigation = false;
    },
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: aliceblue;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

header {
  background-image: url('assets/img/GOT_header.jpg');
  background-attachment: fixed;
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  position: relative;
}

header div {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, .7);
  padding: 10px 10px 6px 10px;
  border-radius: 5px;
  display: none;
}

header div button {
  width: 40px;
  height: 35px;
  background: transparent;
  border: 0;
  border-top: 5px solid white;
  position: relative;
  transition: 0.3s transform linear;
  outline: none;
}

header div button::before,
header div button::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  border-top: 5px solid white;
  transform: translateY(10px);
}

header div button::after {
  transform: translateY(25px);
  transition: 0.3s transform linear;
}

.animate-menu-button {
  transform: rotate(45deg) translateY(5px);
  border: none;
  outline: none;
}

.animate-menu-button::after {
  transform: rotate(-90deg) translateX(-10px);
}

.menu-fixed {
  position: fixed;
  top: 30px;
  transition: 0.9s transform ease;
}

header nav {
  line-height: 13vh;
  position: absolute;
  top: 87vh;
  width: 100%;
}

header nav ul {
  display: flex;
  list-style: none;
}

header nav ul li {
  width: 100%;
}

header nav ul li a {
  background: rgba(0, 0, 0, .7);
  display: block;
  text-decoration: none;
  text-transform: uppercase;
  text-align: center;
  color: white;
  font-weight: bold;
}

header nav ul li a:hover {
  color: bisque;
}

header nav ul li ul {
  flex-direction: column;
}

header nav ul li ul li {
  display: none;
}

header nav ul li:hover ul li {
  display: block;
}

.nav-fixed {
  position: fixed;
  line-height: 10vh;
  top: 0;
  z-index: 10;
}

.content {
  width: 90%;
  margin: 50px auto;
  min-height: 300px;
}

.data-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.data-items {
  width: 160px;
  height: 120px;
  margin: 10px 10px;
  padding: 20px;
  border: 1px solid bisque;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.7);
  box-shadow: 0 5px 10px rgba(0, 0, 0, .7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.data-items a {
  text-decoration: none;
  color: white;
  text-align: center;
}

.data-items a:hover {
  color: beige;
}

footer {
  padding: 30px;
  background: black;
  color: white;
  display: flex;
}

@media only screen and (max-width: 700px) {
  header div {
    display: block;
  }

  header nav {
    line-height: 17vh;
  }

  header nav ul {
    flex-direction: column;
    width: 250px;
    position: fixed;
    top: 0;
    left: -250px;
    transition: 0.3s ease-in-out;
  }
  .show-nav {
    transform: translateX(250px);
  }

  header nav ul li:hover ul li {
    display: none;
  }

  .content {
    width: 100%;
  }
}
</style>

