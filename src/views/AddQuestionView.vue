<template>

  <div class="row justify-content-center">
    <div class="col-4">
      <AddQuestionText ref="addQuestionText" @emitAddQuestionText="setQuestionText"/>
      <ImageInput @emitBase64Event="setQuestionPicture"/>
      <div class="mb-3" v-if="!isShown">
        <button v-on:click="addQuestion" type="button" class="btn btn-success">Save question</button>
      </div>
      <div class="mb-3" v-if="isShown">
        <button v-on:click="editQuestion" type="button" class="btn btn-dark">Edit question</button>
      </div>
      <div v-if="isShown">
        <AddFlashcardAnswer v-if="questionRequest.questionType === 'F'" :question-id="questionId"/>
      </div>
    </div>


  </div>

</template>
<script>
import AddQuestionText from "@/components/AddQuestion/AddQuestionText.vue";
import ImageInput from "@/components/ImageInput.vue";
import AddFlashcardAnswer from "@/components/AddAnswer/AddFlashcardAnswer.vue";

export default {
  name: "AddQuestion",
  components: {AddFlashcardAnswer, ImageInput, AddQuestionText},
  data: function () {
    return {
      questionId: Number(this.$route.query.questionId),
      quizId: Number(this.$route.query.quizId),
      questionRequest: {
        questionText: '',
        questionPicture: '',
        questionType: String(this.$route.query.quizType)
      },
      isShown: false
    }
  },

  methods: {
    editQuestion: function () {
      this.$refs.addQuestionText.emitAddQuestionText();
      this.putQuestion()
    },

    addQuestion: function () {
      this.$refs.addQuestionText.emitAddQuestionText();
      this.postQuestion()
      this.isShown = true
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

  }

}
</script>
