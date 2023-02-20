<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg bg-transparent">
      <div class="container-fluid">


        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
<!--              <router-link class="navbar-brand" v-if="userLoggedIn" to="/menu">Menu</router-link>-->
<!--   Siin saab oll MINGI LINK           -->
            </li>
          </ul>
          <form class="d-flex" >
            <router-link class="navbar-brand" v-if="userLoggedIn"  to="/menu"><font-awesome-icon icon="fa-solid fa-house" /></router-link>
            <router-link class="form-control me-2" v-if="userLoggedIn" to="/logout">Log out</router-link>
<!--            <router-link   v-if="!userLoggedIn" to="/login">Login</router-link>-->

          </form>
        </div>
      </div>
    </nav>
<!--    <nav>-->
<!--      <router-link v-if="userLoggedIn" to="/menu">Menu</router-link> |-->
<!--      <router-link v-if="userLoggedIn" to="/logout">Log out</router-link>-->
<!--      <router-link   v-if="!userLoggedIn" to="/login">Login</router-link> |-->
<!--    </nav>-->
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
  mounted() {
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
  color: #a1a1a1;
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
  color: #ffffff;
}
</style>
