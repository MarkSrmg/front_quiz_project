<template>
  <div>
    <div class="mb-3">
      <button v-on:click="finishQuiz" type="button" class="btn btn-dark">Finish quiz</button>
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
  }
}
</script>