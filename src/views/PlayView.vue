<template>
  <div>
    <div class="row justify-content-center">
      <PlayError :menu="menu" :message="message"/>
      <div v-if="message == ''" class="row justify-content-center">
        <div class="col-3">
          <PlayQuestion :question-response="questionResponse"/>
        </div>
        <PlayFlashcardAnswer :get-next-question="getNextQuestion" :increase-question-counter="increaseQuestionCounter"
                            :question-response="questionResponse" ref="playFlashcardAnswer"/>
      </div>
    </div>
  </div>
</template>

<script>
import PlayError from "@/components/play/PlayError.vue";
import PlayQuestion from "@/components/play/AddQuestion/PlayQuestion.vue";
import PlayFlashcardAnswer from "@/components/play/PlayFlashcardAnswer.vue";

export default {
  name: "PlayView",
  components: {PlayFlashcardAnswer, PlayQuestion, PlayError},
  data: function () {
    return {
      quizId: Number(this.$route.query.quizId),
      message: '',
      apiError: {
        errorCode: '',
        message: ''
      },
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
    menu: function () {
      this.$router.push({name: 'menuRoute'})
    },

    getNextQuestion: function (){
      this.$refs.playFlashcardAnswer.setShowFCAnswer();
      this.getQuestion()
    },

    getQuestion: function () {
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
        this.apiError = error.response.data
        this.message = this.apiError.message
      })
    },
    increaseQuestionCounter: function () {
      this.putIncreaseQuestionCounter();
      this.getNextQuestion();
    },

    putIncreaseQuestionCounter: function () {
      this.$http.put("/play", null, {
            params: {
              quizId: this.quizId,
              questionId: this.questionResponse.questionId
            }
          }
      ).then(response => {
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
