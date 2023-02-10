<template>
  <table class="table table-dark table-borderless table-hover">

    <tbody>
    <tr v-for="quiz in quizzes" :key="quiz.quizId">
      <td>{{quiz.quizType}}</td>
      <td>{{quiz.quizName}}</td>
      <td>PLAY</td>
      <td>ADD</td>
    </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: 'PublicQuizzesTable',
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
    getPublicQuizzes: function () {
      this.$http.get("/menu/public")
          .then(response => {
            this.quizzes = response.data
          })
          .catch(error => {
            console.log(error)
          })
    },
  },
  beforeMount() {
    this.getPublicQuizzes()
  }


}
</script>