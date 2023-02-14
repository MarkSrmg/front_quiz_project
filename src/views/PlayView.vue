<template>
  <div>
    <div class="row justify-content-center">
      <PlayError :menu="menu" :message="message"/>
      <div v-if="message == ''" class="row justify-content-center">
        <div class="col-3">
          <PlayQuestion :question-response="questionResponse"/>
        </div>
        <div v-if="questionResponse.questionType === 'F'">
          <PlayFlashcardAnswer :get-next-question="getNextQuestion" :increase-question-counter="increaseQuestionCounter"
                               :question-response="questionResponse" ref="playFlashcardAnswer"/>
        </div>
        <div v-if="questionResponse.questionType === 'Q'">
          <div v-for=" answer in questionResponse.answers" class="row  justify-content-center">
            <div v-if="(answer.answerText != null) || (answer.answerPicture != null)" class="row justify-content-center">
              <div v-if="answer.answerPicture  != null" class=" col col-3  col-md-3 px-5 my-2">
                <img :src=answer.answerPicture class="img-thumbnail" alt="..." style="width: 200px">
              </div>
              <div v-if="answer.answerText !=null"
                   class="col col-3 p-3 mb-2 px-5 bg-secondary text-white bg-opacity-25 align-self-center my-2">
                {{ answer.answerText }}
              </div>
              <div class="col form-check col-1 align-self-center  col-md-3 px-5">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
              </div>
            </div>
          </div>
          <div>++++
            <button type="button" class="btn btn-dark">Submit answer</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PlayError from "@/components/play/PlayError.vue";
import PlayQuestion from "@/components/AddQuestion/PlayQuestion.vue";
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

    getNextQuestion: function () {
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
