<template>
  <div>
    <div class="row justify-content-center">
      <PlayError :menu="menu" :message="message" :error-code="errorCode"/>
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
      isPublic: Number(this.$route.query.isPublic),
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
        this.putIncreaseQuestionCounter()
      }
      this.submitButton = false;

    },

    menu: function () {
      this.$router.push({name: 'menuRoute'})
    },

    getNextFlashCardQuestion: function () {
      this.$refs.playFlashcardAnswer.setShowFCAnswer();
      this.getQuestion()
    },

    getNextQuizQuestion: function () {
      this.submitButton = true
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
        this.errorCode = this.apiError.errorCode
      })
    },
    increaseQuestionCounter: function () {
      if (!this.isPublic){
        this.putIncreaseQuestionCounter();
      }
      this.getNextFlashCardQuestion();
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
