<template>
  <div>
    <div class="row justify-content-start">
      <div class="col-3">
        <input v-model="quiz.quizName" type="text" class="form-control">
        <table class="table table-borderless table-hover text-white fw-bold"
               style="background-color: rgba(0, 0, 0, 0.25)">
          <tbody>
          <tr v-for="shortQuestion in quiz.questionShort" :key="shortQuestion.questionId">
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
        <div class="mb-3">
          <button v-on:click="navigateToAddQuestion" type="button" class="btn btn-outline-success">Add new question</button>
        </div>
        <div v-if="roleName === 'teacher'" class="form-check form-switch my-2">
          <input v-model="quiz.isPublic" class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
          <label class="form-check-label" for="flexSwitchCheckDefault">Public quiz</label>
        </div>

        <div class="input-group mb-3 my-2">
          <span class="input-group-text">Correct</span>
          <input v-model="quiz.requiredCount" type="number" min="1" class="form-control" placeholder="1">
        </div>

        <div class="mb-3">
          <button v-on:click="saveQuizChanges" type="button" class="btn btn-outline-light">Save quiz</button>
        </div>
        <AlertSuccess :message="message"/>

        <div class="mb-3">
          <Modal :show="showModal" >
            <template #header><button v-on:click="showModal = false" type="button" class="btn-close btn-close-white" aria-label="Close"></button></template>
            <template #body>Are you sure you want to delete your quiz?<br>(this move is IRREVERSIBLE!)</template>
            <template #footer><button v-on:click="deleteQuiz" type="button" class="btn btn-outline-danger">Delete quiz</button></template>
          </Modal>
          <button v-on:click="showModal = true" type="button" class="btn btn-outline-danger">Delete quiz</button>
        </div>
      </div>
      <div class="col-7">
        <EditQuestionsAndAnswers v-if="questionIsSelected" :question-id="questionId"/>
      </div>
    </div>
  </div>

</template>

<script>
import EditQuestionsAndAnswers from "@/components/edit/EditQuestionsAndAnswers.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import Modal from "@/components/Modal.vue";

export default {
  name: "EditView",
  components: {Modal, AlertSuccess, EditQuestionsAndAnswers},
  props: {
    userId: {}
  },
  data: function () {
    return {
      quizId: Number(this.$route.query.quizId),
      quizType: String(this.$route.query.quizType),
      questionId: 0,
      questionIsSelected: false,
      roleName: sessionStorage.getItem('roleName'),
      message:'',
      showModal: false,
      quiz:{
        quizName: '',
        requiredCount: '',
        isPublic: '',
        questionShort: [
          {
            questionNumber: 0,
            questionId: 0,
            questionShortText: ''
          }
        ]
      },
      saveQuiz:{
        quizName: '',
        requiredCount: 0,
        isPublic: false
      }

    }
  },
  methods: {
    navigateToAddQuestion: function () {
      this.$router.push({name: 'addQuestionRoute',
        query: {quizId: String(this.quizId), quizType: String(this.quizType), fromEdit: String(true)}
      })
    },
    editThisQuestion: function (questionId) {
      console.log("EditView.vue editThisQuestion() -> questionId: " + questionId)
      this.questionIsSelected = true
      this.questionId = questionId
    },
    getQuestions: function () {
      this.$http.get("/questions", {
            params: {
              quizId: this.quizId,
            }
          }
      ).then(response => {
        this.quiz = response.data

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
    saveQuizChanges: function () {
      this.saveQuiz.quizName = this.quiz.quizName
      this.saveQuiz.isPublic = this.quiz.isPublic
      this.saveQuiz.requiredCount = this.quiz.requiredCount
      this.$http.put("/quiz/edit", this.saveQuiz, {
            params: {
              quizId: this.quizId,
            }
          }
      ).then(response => {
        console.log(response.data)
        this.getQuestions()
        this.message = "Updated"
        setTimeout(() => {
          this.message = '';
        }, "2000")
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
<style>
.cancel {
  height: 35px;
}

</style>

