<template>
  <div class="mb-3">
    <input v-model="questionText" class="form-control" type="text" placeholder="Enter your question here" aria-label="default input example">
  </div>
</template>
<script>
export default {
  name: 'AddQuestionText',
  data: function () {
    return {
      questionText: ''
    }
  },
  methods: {
    emitAddQuestionText: function () {
      this.$emit('emitAddQuestionText', this.questionText)
    }
  }

}
</script>