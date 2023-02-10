<template>
  <table class="table table-dark table-borderless table-hover">
    <tbody>
    <tr v-for="quiz in quizzes" :key="quiz.quizId">
      <td>{{ quiz.quizType }}</td>
      <td>{{ quiz.quizName }}</td>
      <td>
        <font-awesome-icon icon="fa-regular fa-play" class="icon-hover"/>
      </td>
      <!-- todo lisada ikoon edit     -->
      <!-- todo lisada ikoon refresh     -->
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


  },
  beforeMount() {
    this.getUserQuizzes()
  }
}
</script>