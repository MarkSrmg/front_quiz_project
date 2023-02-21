<template>
  <div>
    <div class="mb-3">
      <button v-on:click="finishQuiz" type="button" class="btn btn-dark">Finish quiz</button>
    </div>
    <div class="mb-3">
      <button v-on:click="removeQuiz" type="button" class="btn btn-dark">Delete quiz</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EditFlashcardAnswerNavigation',
  data: function () {
    return {
      quizId: Number(this.$route.query.quizId),

    }
  },
  methods: {
    finishQuiz: function () {
      this.$router.push({name: 'menuRoute'})
    },
    removeQuiz: function () {
      this.deleteQuiz();
      this.$router.push({name: 'menuRoute'})
    },
    deleteQuiz: function () {
      this.$http.delete("/quiz", {
            params: {
              quizId: this.quizId
            }
          }
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
  }
}
</script>