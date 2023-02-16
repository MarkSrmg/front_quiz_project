<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-4">
        <AddAnswerText ref="addAnswerText" @emitAddAnswerText="setAnswerText"/>
        <div>
          <image-input @emitBase64Event="setAnswerPicture"/>
        </div>
        <div class="mb-3">
          <button v-if="!isEdit" v-on:click="addAnswer" type="button" class="btn btn-success">Save answer</button>
        </div>
        <AlertDanger :message="message"/>
        <div class="mb-3" v-if="isEdit">
          <button v-on:click="editAnswer" type="button" class="btn btn-dark">Edit answer</button>
        </div>
      </div>
    </div>
    <div class="row justify-content-center" v-if="isShown">
      <QuizAnswerNavigation ref="quizAnswerNavigation" :question-id="questionId"/>
    </div>
  </div>
</template>
<script>

import AddAnswerText from "@/components/AddAnswer/AddAnswerText.vue";
import ImageInput from "@/components/ImageInput.vue";
import QuizAnswerNavigation from "@/components/AddAnswer/Quiz/QuizAnswerNavigation.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
  name: 'AddQuizAnswer',
  components: {AlertDanger, QuizAnswerNavigation, ImageInput, AddAnswerText},
  props: {
    questionId: {}
  },
  data: function () {
    return {
      answerId: Number(this.$route.query.answerId),
      answerRequest: {
        answerText: '',
        answerPicture: '',
        answerIsCorrect: false
      },
      isShown: false,
      message: '',
      isEdit: false
    }
  },
  methods: {
    setAnswerPicture: function (pictureDataBase64) {
      this.answerRequest.answerPicture = pictureDataBase64
    },
    editAnswer: function () {
      this.putAnswer()
    },
    addAnswer: function () {
      this.$refs.addAnswerText.emitAddAnswerText();
      if (this.answerRequest.answerText === '' && this.answerRequest.answerPicture === '') {
        this.message = 'Please enter your answer'
      } else {
        this.postAnswer();
      }
    },
    setAnswerText: function (answerText) {
      this.answerRequest.answerText = answerText
    },
    postAnswer: function () {
      this.$http.post("/questions/answer", this.answerRequest, {
            params: {
              questionId: this.questionId
            }
          }
      ).then(response => {
        this.answerId = response.data.answerId
        this.isShown = true;
        this.$refs.quizAnswerNavigation.getAllAnswers();
      }).catch(error => {
        console.log(error)
      })
    },
    putAnswer: function () {
      this.$http.put("/questions/answer", this.answerRequest, {
            params: {
              answerId: this.answerId
            }
          }
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    getAnswer: function () {
      this.$http.get("/some/path", {
            params: {
              someRequestParam1: this.someDataBlockVariable1,
              someRequestParam2: this.someDataBlockVariable2
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