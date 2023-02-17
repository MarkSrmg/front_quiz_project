<template>
  <div class="mb-3">
    <input v-model="answerText" class="form-control" type="text" placeholder="Enter your Answer here" aria-label="default input example">
  </div>
</template>
<script>
export default {
  name: 'AddAnswerText',
  props: {
    answerTextProp: ''
  },
  data: function () {
    return {
      answerText: this.answerTextProp
    }
  },
  methods: {
    emitAddAnswerText: function () {
      console.log(this.answerText)
      this.$emit('emitAddAnswerText', this.answerText)
    }
  },
  // beforeMount() {
  //   this.answerText = this.answerTextProp
  // }
}
</script>