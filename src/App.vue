<template>
  <div id="app">

    <nav class="navbar navbar-expand-sm bg-transparent">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav ms-auto">
            <router-link v-if="userLoggedIn" to="/menu"><font-awesome-icon icon="fa-solid fa-house" class="icon-hover mx-3"/></router-link>
            <router-link v-if="userLoggedIn" to="/logout" class="icon-hover mx-3">Log out</router-link>
          </div>
        </div>
      </div>
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
  color: #7c7c7c;
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
  text-decoration: none;
}

nav a:hover {
  font-weight: bold;
  color: #ccc;
  text-decoration: none;
scale: 1.5;
}

nav a.router-link-exact-active {
  color: #ffffff;
}
</style>
