<template>
  <div>
    <div class="row justify-content-start">
      <div class="col-3">
        <table class="table table-borderless table-hover text-white fw-bold"
               style="background-color: rgba(0, 0, 0, 0.25)">
          <tbody>
          <tr v-for="shortQuestion in shortQuestions" :key="shortQuestion.questionId">
            <td>{{ shortQuestion.questionNumber }}</td>
            <td>{{ shortQuestion.questionShortText }}</td>
            <td title="edit question and answers">
              <font-awesome-icon v-on:click="editThisQuestion(shortQuestion.questionId)" icon="fa-solid fa-pencil"
                                 class="icon-hover"/>
            </td>
            <td title="delete this question and answers">
              <font-awesome-icon v-on:click="deleteQuestion(shortQuestion.questionId)" icon="fa-solid fa-trash-can"
                                 class="icon-hover"/>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="col-7">
        <EditQuestionsAndAnswers ref="editQuestionsAndAnswers" :question-id="shortQuestions.questionId"/>
      </div>
    </div>
  </div>

</template>

<script>
import EditQuestionsAndAnswers from "@/components/edit/EditQuestionsAndAnswers.vue";

export default {
  name: "EditView",
  components: {EditQuestionsAndAnswers},
  props: {
    userId: {}
  },
  data: function () {
    return {
      quizId: Number(this.$route.query.quizId),
      quizType: '',
      shortQuestions: [
        {
          questionNumber: 0,
          questionId: 0,
          questionShortText: ''
        }
      ]
    }
  },
  methods: {
    editThisQuestion: function (questionId) {
      alert("edit this question: " + questionId)
      this.$refs.editQuestionsAndAnswers.getQuestion(questionId)
    },
    getQuestions: function () {
      this.$http.get("/questions", {
            params: {
              quizId: this.quizId,
            }
          }
      ).then(response => {
        this.shortQuestions = response.data

      }).catch(error => {
        console.log(error)
      })
    },
    deleteQuestion: function (questionId) {
      this.$http.delete("/questions", {
            params: {
              questionId: questionId
            }
          }
      ).then(response => {
        console.log(response.data)
        this.getQuestions()
      }).catch(error => {
        console.log(error)
      })
    },
  },
  beforeMount() {
    this.getQuestions()
  }
}
</script>

