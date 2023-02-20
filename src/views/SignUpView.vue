<template>
  <div class="row justify-content-center centered">

    <div class="col col-5">
      <AlertDanger :message="message" />
      <div class="input-group my-2">
        <span class="input-group-text">Username</span>
        <input v-model="user.userName" type="text" aria-label="Username" class="form-control">
      </div>
      <div class="input-group my-2">
        <span class="input-group-text">Password</span>
        <input v-model="user.password" type="text" aria-label="Password" class="form-control">
      </div>
      <div class="input-group my-2">
        <span class="input-group-text">Email</span>
        <input v-model="user.userEmail" type="text" aria-label="Email" class="form-control">
      </div>
      <div class="my-2">
        <div class="form-check form-check-inline">
          <input v-model="user.userRole" class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="teacher">
          <label class="form-check-label" for="inlineRadio1">Teacher</label>
        </div>
        <div class="form-check form-check-inline">
          <input v-model="user.userRole" class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="student">
          <label class="form-check-label" for="inlineRadio2">Student</label>
        </div>
      </div>
      <div class="my-2">
        <button v-on:click="postUser" type="button" class="btn btn-outline-secondary text-white"> Sign Up</button>
      </div>
    </div>

  </div>
</template>

<script>
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
  name: "SignUpView",
  components: {AlertDanger},
  data: function (){
    return {
      user:{
        userName:'',
        password: '',
        userRole: '',
        userEmail: ''
      },
      apiError: {
        errorCode: '',
        message: ''
      },
      message:'',
      loginResponse: {
        userId: 0,
        roleName: ''
      },
    }
  },
  methods:{
    postUser: function () {
      this.message = '';
      if (this.user.userName =='' || this.user.password =='' || this.user.userRole =='' || this.user.userEmail == '' ){
        this.message = 'All fields are required'
      }else{
        this.$http.post("/signup", this.user
        ).then(response => {
          this.loginResponse = response.data
          sessionStorage.setItem('userId', this.loginResponse.userId)
          sessionStorage.setItem('roleName', this.loginResponse.roleName)
          this.$router.push({name: 'menuRoute'})
        }).catch(error => {
          this.apiError = error.response.data
          this.message = this.apiError.message
          console.log(error)
        })
      }

    },

  }
}
</script>
