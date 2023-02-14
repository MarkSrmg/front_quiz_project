<template>
<div>
  <h3>Are you sure you want to log out?</h3>
  <button v-on:click="userLogout" type="button" class="btn btn-outline-danger mb-3">Log out</button>
  <div>
    <button v-on:click="stayLoggedIn" type="button" class="btn btn-outline-light">No, take me back</button>
  </div>

</div>
</template>

<script>
export default {
  name: "LogoutView",
  methods: {
    userLogout: function () {
      sessionStorage.clear();
      this.$router.push({name: 'loginRoute'})
      window.location.reload();
    },
    stayLoggedIn: function () {
      this.$router.push({name: 'menuRoute'})
    }
  }
}
</script>