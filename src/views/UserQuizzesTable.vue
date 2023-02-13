<template>
  <table class="table table-dark table-borderless table-hover">
    <tbody>
    <tr v-for="quiz in quizzes" :key="quiz.quizId">
      <td>{{ quiz.quizType }}</td>
      <td>{{ quiz.quizName }}</td>
      <td>
        <font-awesome-icon v-on:click="navigateToPlay(quiz.quizId)" icon="fa-solid fa-play"/>
      </td>
      <td>
        <font-awesome-icon icon="fa-solid fa-pencil"/>
      </td>
      <td>
        <font-awesome-icon v-on:click="resetCounter(quiz.quizId)" icon="fa-solid fa-arrows-rotate"/>
      </td>
    </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: 'UserQuizzesTable',
  props: {
    userId: {}
  },
  data: function () {
    return {
      quizzes: [
        {
          quizId: 0,
          quizName: '',
          quizType: ''
        }
      ]
    }
  },
  methods: {

    getUserQuizzes: function () {
      this.$http.get("/quiz/user", {
            params: {
              userId: this.userId
            }
          }
      ).then(response => {
        this.quizzes = response.data
      }).catch(error => {
        console.log(error)
      })
    },

    navigateToPlay: function (quizId) {
      this.$router.push({name: 'playRoute', query: {quizId: quizId}})
    },

    resetCounter: function (quizId) {
      this.$http.put("/quiz", null, {
            params: {
              quizId: quizId
            }
          }
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },


  },
  beforeMount() {
    this.getUserQuizzes()
  }
}
</script>