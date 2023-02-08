<template>

  <div class="row justify-content-center">

    <div class="col-4">

      <div class="form-floating mb-5">
        <input type="email" class="form-control" id="floatingInput" placeholder="Email address">
        <label for="floatingInput">Username</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">Password</label>
      </div>

      <br>
      <div class="mb-3">
        <button type="submit" class="btn btn-primary">Sign in</button>
      </div>
      <br>
      <div class="dropdown-divider"></div>
      <a class="dropdown-item" href="#">New around here? Sign up</a>
      <br>
      <a class="dropdown-item" href="#">Forgot password?</a>
    </div>
  </div>
  </div>


</template>

<script>
export default {
  name: "LoginView",
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
      if (this.username == '' || this.password == '') {
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
      )
    }
  }
}
</script>

<style scoped>

</style>