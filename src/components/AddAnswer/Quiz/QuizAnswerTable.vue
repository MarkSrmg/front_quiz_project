<template>
  <div class="justify-content-center col-11">
    <div class="justify-content-center col-12">
      <hr class="solid">
    </div>
    <div>
      <table class="table table-borderless text-white text fw-bold"
             style="background-color: rgba(0, 0, 0, 0);">
        <tbody>
        <tr v-for="answer in answers" :key="answer.answerId">
          <td style="max-width:50px;" class="tdbreak">
            <div>
              {{ answer.answerText }}
            </div>
          </td>
          <td style="max-width:30px;">
            <div v-if="answer.answerPicture !== null">
              <img :src=answer.answerPicture class="img-thumbnail" alt="...">
            </div>
          </td>
          <td title="edit answer">
            <font-awesome-icon v-on:click="emitAnswer(answer)" icon="fa-solid fa-pencil" class="icon-hover"/>
          </td>
          <td title="delete answer">
            <font-awesome-icon v-on:click="deleteAnswer(answer.answerId)" icon="fa-solid fa-trash-can" class="icon-hover"/>
          </td>
          <td title="if this is checked, the answer is correct" style="max-width:21px;">
            <div class="form-check" v-if="!answer.answerIsCorrect">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckDisabled" disabled>
              <label class="form-check-label" for="defaultCheck2">
                right answer
              </label>
            </div>
            <div class="form-check" v-if="answer.answerIsCorrect">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckDisabled" disabled checked>
              <label class="form-check-label" for="defaultCheck2">
                right answer
              </label>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <!--    <div class="mb-3">-->
    <!--      <button type="button" class="btn btn-dark">Previous question</button>-->
    <!--    </div>-->
    <AlertDanger :message="message"/>
    <div class="mb-3">
      <button v-on:click="nextQuestion" type="button" class="btn btn-dark">Next question</button>
    </div>
    <div class="mb-3">
      <button v-on:click="finishQuiz" type="button" class="btn btn-dark">Finish quiz</button>
    </div>
    <div class="mb-3">
      <button v-on:click="removeQuiz" type="button" class="btn btn-dark">Delete quiz</button>
    </div>
  </div>
</template>
<script>
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
  name: 'QuizAnswerTable',
  components: {AlertDanger},
  props: {
    questionId: {}
  },
  data: function () {
    return {
      quizId: Number(this.$route.query.quizId),
      answers: [
        {
          answerId: 0,
          answerText: '',
          answerPicture: '',
          answerIsCorrect: false
        }
      ],
      message: ''
    }
  },
  methods: {
    emitAnswer: function (answer) {
      let answerString = JSON.stringify(answer)
      this.$emit('emitAnswerEvent', JSON.parse(answerString))
      window.scrollTo(0,0);
    },
    nextQuestion: function () {
      let hasCorrectAnswer = false;
      for (let i = 0; i < this.answers.length; i++) {
        if (this.answers[i].answerIsCorrect === true) {
          hasCorrectAnswer = true;
          break;
        }
      }
      if (!hasCorrectAnswer) {
        this.message = 'At least one answer needs to be set as correct!';
      } else {
        window.location.reload();
      }
    },
    finishQuiz: function () {
      let hasCorrectAnswer = false;
      for (let i = 0; i < this.answers.length; i++) {
        if (this.answers[i].answerIsCorrect === true) {
          hasCorrectAnswer = true;
          break;
        }
      }
      if (!hasCorrectAnswer) {
        this.message = 'At least one answer needs to be set as correct!';
      } else {
        this.$router.push({name: 'menuRoute'});
      }
    },
    removeQuiz: function () {
      this.deleteQuiz();
    },
    deleteQuiz: function () {
      this.$http.delete("/quiz", {
            params: {
              quizId: this.quizId
            }
          }
      ).then(response => {
        console.log(response.data)
        this.$router.push({name: 'menuRoute'})
      }).catch(error => {
        console.log(error)
      })
    },
    getAllAnswers: function () {
      this.$http.get("/questions/answers", {
            params: {
              questionId: this.questionId
            }
          }
      ).then(response => {
        this.answers = response.data
        this.message = ''
        this.emitClearAnswerRequest()
      }).catch(error => {
        console.log(error)
      })
    },
    emitClearAnswerRequest: function () {
      this.$emit('emitClearAnswerRequestEvent')
    },
    deleteAnswer: function (answerId) {

      this.$http.delete("/questions/answer", {
            params: {
              answerId: answerId
            }
          }
      ).then(response => {
        console.log(response.data)
        this.getAllAnswers();
      }).catch(error => {
        console.log(error)
      })
    },
  },
  beforeMount() {
    this.getAllAnswers()
  }
}
</script>