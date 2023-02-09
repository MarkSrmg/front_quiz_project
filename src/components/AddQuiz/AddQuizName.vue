<template>
  <div class="input-group mb-3">
    <!--    <span class="input-group-text" id="basic-addon1">@</span>-->
    <input v-model="quizName" type="text" class="form-control" placeholder="Quiz name" aria-label="Username"
           aria-describedby="basic-addon1">
  </div>
</template>
<script>
export default {
  name: 'AddQuizName',
  data: function (){
    return{
      quizName: ''
    }
  },
  methods: {
    emitAddQuizName: function () {
      this.$emit('emitAddQuizName', this.quizName)
    },
  }
}
</script>