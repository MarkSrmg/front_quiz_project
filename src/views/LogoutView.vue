<template>
<div>
  <h3>Are you sure you want to log out?</h3>
  <button v-on:click="userLogout" type="button" class="btn btn-outline-danger">Log out</button>

</div>
</template>

<script>
export default {
  name: "LogoutView",
  methods: {
    userLogout: function () {
      sessionStorage.clear();
      this.$router.push({name: 'loginRoute'})
    }
  }
}
</script>