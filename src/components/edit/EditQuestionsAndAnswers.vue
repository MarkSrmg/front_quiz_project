<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-4">
        <input v-model="questionRequest.questionText" class="form-control" type="text"
               placeholder="Select your question to edit" aria-label="default input example">
<!--        <ImageInput :picture-data-base64-prop="questionRequest.questionPicture" @emitBase64Event="setQuestionPicture"/>-->
        <AlertDanger :message="message"/>
        <div class="mb-3">
          <button v-on:click="editQuestion(questionId)" type="button" class="btn btn-dark">Edit question</button>
        </div>
      </div>
      <div v-if="!isQuiz">
        <EditFlashcardAnswer ref="editFlashcardAnswer" :question-id="questionId"/>
      </div>
      <div v-if="isQuiz">
        <EditQuizAnswers ref="editQuizAnswers" :question-id="questionId"/>
      </div>
    </div>
  </div>
</template>
<script>
import AlertDanger from "@/components/alert/AlertDanger.vue";
import EditQuizAnswers from "@/components/edit/EditQuizAnswers.vue";
import EditFlashcardAnswer from "@/components/edit/EditFlashcardAnswer.vue";

export default {
  name: 'EditQuestionsAndAnswers',
  components: {EditFlashcardAnswer, EditQuizAnswers, AlertDanger},
  props: {
    questionId: Number,
  },
  data: function () {
    return {
      quizId: Number(this.$route.query.quizId),
      quizType: String(this.$route.query.quizType),
      questionRequest: {
        questionText: '',
        questionPicture: String,
        questionType: String(this.$route.query.quizType)
      },
      message: '',
      isQuiz: false
    }
  },

  methods: {
    getAllAnswers: function (questionId) {
      this.$refs.editQuizAnswers.getAllAnswers(questionId)
    },
    getFlashcardAnswer: function (questionId) {
      this.$refs.editFlashcardAnswer.getAnswer(questionId)
    },
    editQuestion: function (questionId) {
      this.putQuestion(questionId)
    },
    setQuestionText: function (questionText) {
      this.questionRequest.questionText = questionText
    },
    setQuestionPicture: function (pictureDataBase64) {
      this.questionRequest.questionPicture = pictureDataBase64
    },
    putQuestion: function (questionId) {
      this.$http.put("/questions", this.questionRequest, {
            params: {
              questionId: questionId,
            }
          }
      ).then(response => {
        console.log(response.data)
        this.$parent.getQuestions()
      }).catch(error => {
        console.log(error)
      })
    },
    getQuestion: function (questionId) {
      console.log("EditQuestionsAndAnswers.vue questionId: " + questionId)
      this.$http.get("/question", {
            params: {
              questionId: questionId
            }
          }
      ).then(response => {
        this.questionRequest = response.data
        if (this.isQuiz) {
          this.getAllAnswers(questionId)
        } else {
          this.getFlashcardAnswer(questionId)
        }
      }).catch(error => {
        console.log(error)
      })
    },
  },
  beforeMount() {
    this.isQuiz = this.quizType === 'Q'
  }
}
</script>
