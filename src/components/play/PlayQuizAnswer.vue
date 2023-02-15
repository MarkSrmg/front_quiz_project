<template>
  <div>
    <div v-for=" answer in questionResponse.answers" class="row  justify-content-center">
      <div v-if="(answer.answerText != null) || (answer.answerPicture != null)"
           class="row justify-content-center">
        <div v-if="answer.answerPicture  != null" class=" col col-3  col-md-3 px-5 my-2">
          <img :src=answer.answerPicture class="img-thumbnail" alt="..." style="width: 200px">
        </div>
        <div v-if="answer.answerText !=null"
             :class="{'bg-secondary' : String(answer.isAnswered) === 'unanswered',
                   'bg-danger' : String(answer.isAnswered) === 'false',
                   'bg-success' : String(answer.isAnswered) === 'correct'}"
             class="col col-3 p-3 mb-2 px-5  text-white bg-opacity-25 align-self-center my-2">
          {{ answer.answerText }}
        </div>
        <div class="col form-check col-1 align-self-center  col-md-3 px-5">
          <input v-model="answer.isSelected" class="form-check-input" type="checkbox" id="flexCheckDefault">
        </div>
      </div>
    </div>
    <div v-if="submitButton">
      <button v-on:click="submitAnswer" type="button" class="btn btn-dark">Submit answer</button>
    </div>
    <div v-if="!submitButton">
      <button v-on:click="getNextQuizQuestion" type="button" class="btn btn-dark">Next question</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PlayQuizAnswer',
  props: {
    getNextQuizQuestion: {},
    questionResponse: {},
    submitAnswer: {},
    submitButton: {}
  }
}
</script>