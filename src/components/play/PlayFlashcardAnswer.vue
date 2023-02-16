<template>
  <div class="row justify-content-center">
    <div v-if="!showFCAnswer" >
      <button v-on:click="showFCAnswer = true" type="button" class="btn btn-dark">Show answer</button>
    </div>
    <div v-if="showFCAnswer" v-for="answer in questionResponse.answers" class="p-3 mb-2 bg-secondary text-white bg-opacity-25 col-2">
      {{ answer.answerText }}
    </div>
    <div v-if="showFCAnswer" class="my-3">
      <button v-on:click="increaseQuestionCounter" type="button" class="btn btn-dark m-lg-1">Answer was correct</button>
      <button v-on:click="getNextQuestion" type="button" class="btn btn-dark m-lg-1">Answer was wrong</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PlayFlashcardAnswer',
  props: {
    getNextQuestion: {},
    increaseQuestionCounter: {},
    questionResponse: {}
  },
  data: function (){
    return{
      showFCAnswer: false
    }
  },
  methods:{
    setShowFCAnswer: function (){
      this.showFCAnswer = false
    }
  }

}
</script>