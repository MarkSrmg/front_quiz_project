<template>
  <table class="table table-borderless table-hover text-white fw-bold" style="background-color: rgba(0, 0, 0, 0.25">

    <tbody>
    <tr v-for="quiz in quizzes" :key="quiz.quizId">
      <td>{{ quiz.quizType }}</td>
      <td>{{ quiz.quizName }}</td>
      <td>
        <font-awesome-icon v-on:click="navigateToPlay(quiz.quizId)" icon="fa-solid fa-play"/>
      </td>
      <td>
        <font-awesome-icon icon="fa-solid fa-plus"/>
      </td>
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
      this.$http.get("/quiz/public")
          .then(response => {
            this.quizzes = response.data
          })
          .catch(error => {
            console.log(error)
          })
    },
    navigateToPlay: function (quizId) {
      this.$router.push({name: 'playRoute', query: {quizId: quizId}})
    }
  },
  beforeMount() {
    this.getPublicQuizzes()
  }


}
</script>