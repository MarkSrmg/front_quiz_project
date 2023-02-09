<template>
  <div>
    <div class="form-check">
      <input v-model="quizType" class="form-check-input" type="radio" name="flexRadioDefault" id="flashcards" value="F">
      <label class="form-check-label" for="flexRadioDefault1">
        <h5>Create new flashcards</h5>
      </label>
    </div>
    <div class="form-check">
      <input v-model="quizType" class="form-check-input" type="radio" name="flexRadioDefault" id="quiz" value="Q">
      <label class="form-check-label" for="flexRadioDefault1">
        <h5>Create new quiz</h5>
      </label>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SelectQuizType',
  data: function () {
    return {
      quizType: ''
    }
  },
  methods: {
    emitQuizType: function () {
      this.$emit('emitQuizTypeEvent', this.quizType)
    }
  }
}
</script>