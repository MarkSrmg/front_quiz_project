<template>


<div class="centered">
    <div class="row justify-content-center">

      <AlertDanger :message="message"/>
      <div class="col-4 ">
        <div class="form-floating">
          <input v-model="username" type="email" class="form-control" id="floatingInput" >
          <label for="floatingInput">Username</label>
        </div>
        <div class="form-floating my-2">
          <input v-model="password" type="password" class="form-control" id="floatingPassword">
          <label for="floatingPassword">Password</label>
        </div>

        <br>
        <div class="mb-3">
          <button v-on:click="login" type="submit" class="btn btn-outline-secondary text-white">Log in</button>
        </div>
      </div>


      <div class="col-8 ">
        <div>
          <PublicQuizzesTable/>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import AlertDanger from "@/components/alert/AlertDanger.vue";
import PublicQuizzesTable from "@/components/menu/PublicQuizzesTable.vue";

export default {
  name: "LoginView",
  components: {AlertDanger, PublicQuizzesTable},
  data: function () {
    return {
      message: '',

      loginResponse: {
        userId: 0,
        roleName: ''
      },

      apiError: {
        errorCode: '',
        message: ''
      },

      username: '',
      password: ''
    }
  },

  methods: {

    login: function () {
      this.message = '';
      if (this.username === '' || this.password === '') {
        this.message = 'Please fill out all required fields'
      } else {
        this.sendLoginRequest();
      }
    },
    sendLoginRequest: function () {
      this.$http.get("/login", {
            params: {
              username: this.username,
              password: this.password
            }
          }
      ).then(response => {
        this.loginResponse = response.data

        sessionStorage.setItem('userId', this.loginResponse.userId)
        sessionStorage.setItem('roleName', this.loginResponse.roleName)
        this.$router.push({name: 'menuRoute'})
        window.location.reload();
      }).catch(error => {
        this.apiError = error.response.data
        this.message = this.apiError.message
      })
    },
  },

}
</script>



