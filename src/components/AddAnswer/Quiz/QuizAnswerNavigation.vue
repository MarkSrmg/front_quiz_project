<template>
  <div class="col-11">
    <div class="col-11">
      <hr class="solid">
    </div>
    <div>
      <table class="table table-borderless text-white text fw-bold"
             style="background-color: rgba(0, 0, 0, 0);">
        <tbody>
        <tr v-for="answer in answers" :key="answer.answerId">
          <td style="max-width:150px;">
            <div>
              {{ answer.answerText }}
            </div>
          </td>
          <td style="max-width:35px;">
            <div v-if="answer.answerPicture !== null">
              <img :src=answer.answerPicture class="img-thumbnail" alt="...">
            </div>
          </td>
          <td>
            <font-awesome-icon icon="fa-solid fa-pencil" class="icon-hover"/>
          </td>
          <td>
            <font-awesome-icon icon="fa-solid fa-trash-can" class="icon-hover"/>
          </td>
          <td>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckDisabled" disabled>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <!--    <div class="mb-3">-->
    <!--      <button type="button" class="btn btn-dark">Previous question</button>-->
    <!--    </div>-->
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
export default {
  name: 'QuizAnswerNavigation',
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
    }
  },
  methods: {
    emitEditEvent: function () {
      this.$emit.answers.answerId;
    },
    nextQuestion: function () {
      window.location.reload();
    },
    finishQuiz: function () {
      this.$router.push({name: 'menuRoute'})
    },
    removeQuiz: function () {
      this.deleteQuiz();
      this.$router.push({name: 'menuRoute'})
    },
    deleteQuiz: function () {
      this.$http.delete("/quiz", {
            params: {
              quizId: this.quizId
            }
          }
      ).then(response => {
        console.log(response.data)
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