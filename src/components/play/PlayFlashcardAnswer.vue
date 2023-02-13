<template>
  <div>
    <div v-if="!showFCAnswer">
      <button v-on:click="showFCAnswer = true" type="button" class="btn btn-dark">Näita vastust</button>
    </div>
    <div v-if="showFCAnswer" v-for="answer in questionResponse.answers" class="text-white">
      {{ answer.answerText }}
    </div>
    <div v-if="showFCAnswer">
      <button v-on:click="increaseQuestionCounter" type="button" class="btn btn-dark">Vastasin õigesti</button>
      <button v-on:click="getNextQuestion" type="button" class="btn btn-dark">Vastasin valesti</button>
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