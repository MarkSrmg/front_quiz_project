<template>
  <div v-if="roleName==='admin'" class="row justify-content-center">
    <div class="col-4 col">
      <table class="table table-borderless table-hover text-white text fw-bold"
             style="background-color: rgba(0, 0, 0, 0.25);">
        <tbody>
        <tr v-for="user in users" :key="user.userId">
          <td class="align-middle">
            <div> {{ user.userName }}</div>
          </td>
          <td class="justify-content-end">
            <div>
              <button v-on:click="validateUser(user.userId)" type="button" class="btn btn-outline-secondary text-white"> Validate</button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminView",
  data: function () {
    return {
      roleName:sessionStorage.getItem('roleName'),
      users: [
        {
          userName: '',
          userId: ''
        }
      ]
    }
  },
  methods: {
    getUsers: function () {
      this.$http.get("/signup")
          .then(response => {
            this.users = response.data
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
          })
    },
    validateUser: function (userId) {
      this.$http.put("/signup", null, {
            params: {
              userId: userId

            }
          }
      ).then(response => {
        console.log(response.data)
        this.getUsers();
      }).catch(error => {
        console.log(error)
      })
    },
  },
  beforeMount() {
    this.getUsers();
  }
}
</script>

