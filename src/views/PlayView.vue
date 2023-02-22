<template>

  <div>
    <div class="row justify-content-center">
      <PlayError :menu="backButton" :message="message" :error-code="errorCode"/>
      <div v-if="message == ''" class="row justify-content-center">
        <div class="col-3 my-3 ">
          <PlayQuestion :question-response="questionResponse"/>
        </div>
        <div v-if="questionResponse.questionType === 'F'">
          <PlayFlashcardAnswer :get-next-question="getNextFlashCardQuestion"
                               :increase-question-counter="increaseQuestionCounter"
                               :question-response="questionResponse" ref="playFlashcardAnswer"/>
        </div>
        <div v-if="questionResponse.questionType === 'Q'">
          <PlayQuizAnswer :get-next-quiz-question="getNextQuizQuestion" :question-response="questionResponse"
                          :submit-answer="submitAnswer" :submit-button="submitButton"/>
        </div>

      </div>

    </div>

  </div>

</template>

<script>
import PlayError from "@/components/play/PlayError.vue";
import PlayQuestion from "@/components/play/PlayQuestion.vue";
import PlayFlashcardAnswer from "@/components/play/PlayFlashcardAnswer.vue";
import PlayQuizAnswer from "@/components/play/PlayQuizAnswer.vue";

export default {
  name: "PlayView",
  components: {PlayQuizAnswer, PlayFlashcardAnswer, PlayQuestion, PlayError},
  data: function () {
    return {
      quizId: Number(this.$route.query.quizId),
      isPublic: Boolean(this.$route.query.isPublic),
      userId: sessionStorage.getItem('userId'),
      userLoggedIn: false,
      message: '',
      errorCode: '',
      submitButton: true,
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
            isSelected: false,
            isCorrect: false,
            isAnswered: 'unanswered'
          }
        ]
      }
    }
  },
  methods: {
    signup: function () {
      this.$router.push({name: 'signupRoute'})
    },
    login: function () {
      this.$router.push({name: 'loginRoute'})
    },

    backButton: function () {
      if (this.userId != null) {
        this.$router.push({name: 'menuRoute'})
      } else {
        this.$router.push({name: 'loginRoute'})
      }
    },

    getNextFlashCardQuestion: function () {
      this.$refs.playFlashcardAnswer.setShowFCAnswer();
      this.getQuestion()
    },

    submitAnswer: function () {
      let submit = true;
      for (let i = 0; i < this.questionResponse.answers.length; i++) {
        if (this.questionResponse.answers[i].isCorrect != this.questionResponse.answers[i].isSelected) {
          submit = false;
          this.questionResponse.answers[i].isAnswered = "false";
        } else if (this.questionResponse.answers[i].isCorrect == true) {
          this.questionResponse.answers[i].isAnswered = "correct";
        }
      }
      if (submit) {
        this.increaseQuestionCounter()
      }
      this.submitButton = false;
    },

    getQuestion: function () {
      if (this.isPublic) {
        this.getPublicQuestion()
      } else {
        this.getUserQuestion()
      }
    },

    getPublicQuestion: function () {
      this.$http.get("/play/public", {
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
        this.errorCode = this.apiError.errorCode
      })
    },

    getUserQuestion: function () {
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
        this.errorCode = this.apiError.errorCode
      })
    },

    getNextQuizQuestion: function () {
      this.submitButton = true
      this.getQuestion()
    },


    increaseQuestionCounter: function () {
      if (!this.isPublic) {
        this.putIncreaseQuestionCounter();
      }
      if (this.questionResponse.questionType === 'F') {
        this.getNextFlashCardQuestion();
      }
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
    checkIfUserLoggedIn: function () {
      this.userLoggedIn = this.userId != null
    },
  },

  beforeMount() {
    this.checkIfUserLoggedIn();
    this.getQuestion();
  }
}
</script>
