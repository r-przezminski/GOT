<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          <li>
            <router-link to="/">home</router-link>
          </li>
          <li>
            <router-link to="/characters">characters</router-link>
          </li>
          <li>
            <router-link to="/locations">locations</router-link>
            <ul>
              <li>
                <router-link to="/locations/cities">cities</router-link>
              </li>
              <li>
                <router-link to="/locations/continents">continents</router-link>
              </li>
            </ul>
          </li>
          <li>
            <router-link to="/cultures">cultures</router-link>
          </li>
          <li>
            <router-link to="/houses">houses</router-link>
          </li>
          <li>
            <router-link to="/regions">regions</router-link>
          </li>
          <li>
            <router-link to="/episodes">episodes</router-link>
          </li>
        </ul>
      </nav>
    </header>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
