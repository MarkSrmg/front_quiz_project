<template>
  <div class="row justify-content-center">
    <div v-if="fromEdit" class="mb-3">
      <button v-on:click="navigateBackToEdit" type="button" class="btn btn-outline-light">Back to edit page</button>
    </div>
    <div class="col-4">
      <AddQuestionText ref="addQuestionText" @emitAddQuestionText="setQuestionText"/>
      <ImageInput :picture-data-base64-prop="questionRequest.questionPicture" :key="imageComponentKey" @emitBase64Event="setQuestionPicture"/>
      <div v-if="questionRequest.questionPicture !== '' && questionRequest.questionPicture !== null" class="mt-1" title="remove picture">
        <font-awesome-icon v-on:click="removePicture" class="icon-hover cancel" type="button" icon="fa-solid fa-ban" />
      </div>
      <div class="mb-3 my-2" v-if="!isShown">
        <button v-on:click="addQuestion" type="button" class="btn btn-success">Save question</button>
      </div>
      <AlertDanger :message="message"/>
      <div class="mb-3 my-2" v-if="isShown">
        <button v-on:click="editQuestion" type="button" class="btn btn-dark">Save question changes</button>
      </div>
    </div>
    <div v-if="isShown">
      <AddNewQuizAnswer v-if="isQuiz" :question-id="questionId"/>
      <AddFlashcardAnswer v-if="!isQuiz" :question-id="questionId"/>
    </div>
  </div>

</template>
<script>
import AddQuestionText from "@/components/AddQuestion/AddQuestionText.vue";
import ImageInput from "@/components/ImageInput.vue";
import AddFlashcardAnswer from "@/components/AddAnswer/Flashcard/AddFlashcardAnswer.vue";
import AddNewQuizAnswer from "@/components/AddAnswer/Quiz/AddQuizAnswer.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";


export default {
  name: "AddQuestion",
  components: {AlertDanger, AddNewQuizAnswer, AddFlashcardAnswer, ImageInput, AddQuestionText},
  data: function () {
    return {
      questionId: Number(this.$route.query.questionId),
      quizId: Number(this.$route.query.quizId),
      quizType: String(this.$route.query.quizType),
      fromEdit: Boolean(this.$route.query.fromEdit),
      questionRequest: {
        questionText: '',
        questionPicture: '',
        questionType: String(this.$route.query.quizType)
      },
      isShown: false,
      isQuiz: false,
      message: '',
      imageComponentKey: 0
    }
  },

  methods: {
    removePicture: function () {
      this.questionRequest.questionPicture = ''
      this.imageComponentKey += 1
    },
    navigateBackToEdit:function () {
      this.$router.push({
        name: 'editRoute',
        query: {quizId: String(this.quizId), quizType: String(this.quizType)}
      })
    },
    editQuestion: function () {
      this.$refs.addQuestionText.emitAddQuestionText();
      this.message = ''
      if (this.questionRequest.questionText === '') {
        this.message = 'Please enter your question text';
      } else {
        this.putQuestion()
      }
    },
    addQuestion: function () {
      this.$refs.addQuestionText.emitAddQuestionText();
      this.message = '';
      if (this.questionRequest.questionText === '') {
        this.message = 'Please enter your question text'
      } else {
        this.postQuestion()
        this.isShown = true
      }

    },
    setQuestionText: function (questionText) {
      this.questionRequest.questionText = questionText
    },
    setQuestionPicture: function (pictureDataBase64) {
      this.questionRequest.questionPicture = pictureDataBase64
    },
    postQuestion: function () {
      this.$http.post("/questions", this.questionRequest, {
            params: {
              quizId: this.quizId
            }
          }
      ).then(response => {
        this.questionId = response.data.questionId
      }).catch(error => {
        console.log(error)
      })
    },
    putQuestion: function () {
      this.$http.put("/questions", this.questionRequest, {
            params: {
              questionId: this.questionId,
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
    this.isQuiz = this.quizType === 'Q'
  }
}
</script>
<style>
.cancel {
  height: 35px;
}
</style>
