<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-3 p-3 mb-2 bg-secondary text-white bg-opacity-25">
        {{ questionResponse.questionText }}
      </div>
      <div v-if="questionResponse.questionPicture != null">
        <!-- TODO Pilt peab andmebaasis juba base64 String olema et siin kuvada-->
        <img :src=questionResponse.questionPicture class="img-thumbnail" alt="...">
      </div>
      <div v-if="!showFCAnswer">
        <button v-on:click="showFCAnswer = true" type="button" class="btn btn-dark">Näita vastust</button>
      </div>
      <div v-if="showFCAnswer" v-for="answer in questionResponse.answers" class="text-white">
        {{answer.answerText}}
      </div>
      <div v-if="showFCAnswer">
        <button v-on:click="increaseQuestionCounter" type="button" class="btn btn-dark">Vastasin õigesti</button>
        <button v-on:click="getQuestion" type="button" class="btn btn-dark">Vastasin valesti</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayView",
  data: function () {
    return {
      quizId: Number(this.$route.query.quizId),
      showFCAnswer: false,
      questionResponse: {
        questionId: 0,
        questionText: '',
        questionPicture: '',
        questionType: '',
        answers: [
          {
            answerId: 0,
            answerText: '',
            answerPicture: '',
            isSelected: false

          }
        ]
      }
    }
  },
  methods: {
    getQuestion: function () {
      this.showFCAnswer = false
      this.$http.get("/play", {
            params: {
              quizId: this.quizId,
            }
          }
      ).then(response => {
        this.questionResponse = response.data
        // alert("Sain Kätte")
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    increaseQuestionCounter: function (){
      this.putIncreaseQuestionCounter();
      this.getQuestion();
    },

    putIncreaseQuestionCounter: function () {
      this.$http.put("/play", null, {
            params: {
              quizId: this.quizId,
              questionId: this.questionResponse.questionId
            }
          }
      ).then(response => {
        alert(Salvestatud)
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },

  },

  beforeMount() {
    this.getQuestion()
  }
}
</script>
