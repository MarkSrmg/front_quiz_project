<template>
  <div class="mb-3">
    <input v-model="answerText" class="form-control" type="text" placeholder="Enter your Answer here" aria-label="default input example">
  </div>
</template>
<script>
export default {
  name: 'AddAnswerText',
  data: function () {
    return {
      answerText: ''
    }
  },
  methods: {
    emitAddAnswerText: function () {
      this.$emit('emitAddAnswerText', this.answerText)
    }
  }
}
</script>