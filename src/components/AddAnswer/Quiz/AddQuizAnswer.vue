<template>
  <div class="row justify-content-center">
    <div>
      <AddAnswerText ref="addAnswerText" @emitAddAnswerText="setAnswerText"/>
      <div>
        <image-input @emitBase64Event="setAnswerPicture"/>
      </div>
      <div class="mb-3">
        <button v-on:click="addAnswer" type="button" class="btn btn-success">Save answer</button>
      </div>
<!--      <div class="mb-3" v-if="isShown">-->
<!--        <button v-on:click="editAnswer" type="button" class="btn btn-dark">Edit answer</button>-->
<!--      </div>-->
    </div>
    <div v-if="isShown">
      <QuizAnswerNavigation ref="quizAnswerNavigation" :question-id="questionId"/>
    </div>

  </div>
</template>
<script>

import AddAnswerText from "@/components/AddAnswer/AddAnswerText.vue";
import ImageInput from "@/components/ImageInput.vue";
import QuizAnswerNavigation from "@/components/AddAnswer/Quiz/QuizAnswerNavigation.vue";

export default {
  name: 'AddQuizAnswer',
  components: {QuizAnswerNavigation, ImageInput, AddAnswerText},
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
    }
  },
  methods: {
    setAnswerPicture: function (pictureDataBase64) {
      this.answerRequest.answerPicture = pictureDataBase64
    },
    addAnswer: function () {
      this.$refs.addAnswerText.emitAddAnswerText();
      this.postAnswer();

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
  }
}
</script>