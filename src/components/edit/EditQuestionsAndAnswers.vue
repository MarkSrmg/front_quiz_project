<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-4">
        <input v-model="questionRequest.questionText" class="form-control" type="text"
               placeholder="Siia PEAKS KÜSIMUS TULEMA!!!!!!!" aria-label="default input example">
        <ImageInput :picture-data-base64-prop="questionRequest.questionPicture" @emitBase64Event="setQuestionPicture"/>
        <AlertDanger :message="message"/>
        <div class="mb-3">
          <button v-on:click="editQuestion" type="button" class="btn btn-dark">Edit question</button>
        </div>
      </div>
      <div>
        <EditAnswers/>
      </div>
    </div>
  </div>
</template>
<script>
import ImageInput from "@/components/ImageInput.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import EditAnswers from "@/components/edit/EditAnswers.vue";

export default {
  name: 'EditQuestionsAndAnswers',
  components: {EditAnswers, AlertDanger, ImageInput},
  props: {
    questionId: 0,
  },
  data: function () {
    return {
      // questionId: Number(this.$route.query.questionId),
      quizId: Number(this.$route.query.quizId),
      quizType: String(this.$route.query.quizType),
      questionRequest: {
        questionText: '',
        questionPicture: String,
        questionType: String(this.$route.query.quizType)
      },
      message: ''
    }
  },

  methods: {
    editQuestion: function () {
      this.$refs.addQuestionText.emitAddQuestionText();
      this.putQuestion()
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
    getQuestion: function (questionId) {
      this.$http.get("/question", {
            params: {
              questionId: questionId
            }
          }
      ).then(response => {
        this.questionRequest = response.data

      }).catch(error => {
        console.log(error)
      })
    },
  },
}
</script>
