<template>
  <div id="app">
    <nav>

      <router-link to="/menu">Menu</router-link>
      |
      <router-link to="/login">Login</router-link>
      |
      <router-link to="/quiz">Add Quiz</router-link>
    </nav>
    <router-view/>
  </div>
</template>

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
  color: #42b983;
}
</style>
