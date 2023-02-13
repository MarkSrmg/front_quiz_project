<template>
  <div id="app">
    <nav>

      <router-link to="/menu">Menu</router-link>
      |
      <router-link v-if="userLoggedIn" to="/logout">Log out</router-link>
      <router-link v-if="!userLoggedIn" to="/login">Login</router-link>
      |
      <router-link to="/quiz">Add Quiz</router-link>
    </nav>
    <router-view @emitLoginSuccessEvent="updateNavigationMenu"/>
  </div>
</template>
<script>
export default {
  name: "App",
  data: function () {
    return {
      userId: sessionStorage.getItem('userId'),
      userLoggedIn: false
    }
  },
  methods: {
    updateNavigationMenu: function () {
      this.userId = sessionStorage.getItem('userId')
      this.userLoggedIn = this.userId != null
    },
  },
  created() {
    this.updateNavigationMenu()
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #919191;
}

body {
  background: url('../src/assets/bg_image.jpg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
  -o-background-size: cover;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #ffffff;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
