<template>

  <div class="row justify-content-center">
    <div class="col-4">
      <AddQuestionText ref="addQuestionText" @emitAddQuestionText="setQuestionText"/>
      <!--      <AddQuestionPicture ref="addQuestionPicture" @emitAddQuestionPicture="setQuestionPicture"/>-->
      <ImageInput @emitBase64Event="setQuestionPicture"/>
      <div class="mb-3">
        <button v-on:click="addQuestion" type="button" class="btn btn-success">Save question</button>
      </div>
      <div v-if="isShown">
        <AddFlashcardAnswer/>

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
      questionId: 0,
      questionDto: {
        questionText: '',
        questionPicture: '',
        questionType: ''
      },
      isShown: false
    }
  },

  methods: {
    addQuestion: function () {
      this.$refs.addQuestionText.emitAddQuestionText();
      this.postQuestion()
      this.isShown = true
    },

    setQuestionText: function (questionText) {
      this.questionDto.questionText = questionText
    },
    setQuestionPicture: function (pictureDataBase64) {
      this.questionDto.questionPicture = pictureDataBase64
    },
    postQuestion: function () {
      this.$http.post("/questions", this.questionDto
      ).then(response => {
        this.questionId = response.data

      }).catch(error => {
        console.log(error)
      })
    },

  }

}
</script>
