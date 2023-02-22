<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-4">
        <AddAnswerText :answer-text-prop="answerRequest.answerText" :key="textComponentKey" ref="addAnswerText" @emitAddAnswerText="setAnswerText"/>
        <div>
          <div class="form-check">
            <input class="css-checkbox" type="checkbox" value="" id="flexCheckDefault"
                   v-model="answerRequest.answerIsCorrect">
            <label class="form-check-label" for="flexCheckDefault"> This answer is correct
            </label>
          </div>
        </div>
        <div>
          <ImageInput :picture-data-base64-prop="answerRequest.answerPicture" :key="imageComponentKey" @emitBase64Event="setAnswerPicture"/>
          <div v-if="answerRequest.answerPicture !== '' && answerRequest.answerPicture !== null" class="mt-1" title="remove picture">
            <font-awesome-icon v-on:click="removePicture" class="icon-hover cancel" type="button" icon="fa-solid fa-ban" />
          </div>
        </div>
        <div class="mb-3 my-2">
          <button v-if="!isEdit" v-on:click="addAnswer" type="button" class="btn btn-success">Save answer</button>
        </div>
        <AlertDanger :message="message"/>
        <div class="mb-3 my-2" v-if="isEdit">
          <button v-on:click="editAnswer" type="button" class="btn btn-dark">Save answer changes</button>
        </div>
      </div>
    </div>
    <div class="row justify-content-center" v-if="isShown">
      <QuizAnswerTable ref="quizAnswerNavigation"
                            @emitClearAnswerRequestEvent="clearAnswerRequest"
                            @emitAnswerEvent="setEditAnswerInputFields"
                            :question-id="questionId"/>
    </div>
  </div>
</template>
<script>

import AddAnswerText from "@/components/AddAnswer/AddAnswerText.vue";
import ImageInput from "@/components/ImageInput.vue";
import QuizAnswerTable from "@/components/AddAnswer/Quiz/QuizAnswerTable.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
  name: 'AddQuizAnswer',
  components: {AlertDanger, QuizAnswerTable, ImageInput, AddAnswerText},
  props: {
    questionId: {}
  },
  data: function () {
    return {
      answerId: Number(this.$route.query.answerId),
      answerRequest: {
        answerId: 0,
        answerText: '',
        answerPicture: '',
        answerIsCorrect: false
      },
      isShown: false,
      message: '',
      isEdit: false,
      imageComponentKey: 0,
      textComponentKey: 0,
    }
  },
  methods: {
    removePicture: function () {
      this.answerRequest.answerPicture = ''
      this.imageComponentKey += 1
    },
    setEditAnswerInputFields: function (answer) {
      this.answerRequest = answer
      this.isEdit = true
      this.textComponentKey += 1;
      this.imageComponentKey += 1;
    },
    clearAnswerRequest: function () {
      this.answerRequest.answerPicture = ''
      this.answerRequest.answerIsCorrect = false
      this.answerRequest.answerText = ''
      this.textComponentKey += 1;
      this.imageComponentKey += 1;
    },
    setAnswerPicture: function (pictureDataBase64) {
      this.answerRequest.answerPicture = pictureDataBase64
    },
    editAnswer: function () {
      this.message = ''
      this.$refs.addAnswerText.emitAddAnswerText();
      if (this.answerRequest.answerText === '' && this.answerRequest.answerPicture === '' && this.answerRequest.answerPicture === null) {
        this.message = 'Please enter your answer'
      } else {
        this.putAnswer()
      }
    },
    addAnswer: function () {
      this.message = ''
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
        this.answerId = response.data.answerId;
        this.isShown = true;
        this.$refs.quizAnswerNavigation.getAllAnswers();
        this.clearAnswerRequest()
      }).catch(error => {
        console.log(error)
      })
    },
    putAnswer: function () {
      this.$http.put("/questions/answer", this.answerRequest, {
            params: {
              answerId: this.answerRequest.answerId
            }
          }
      ).then(response => {
        console.log(response.data)
        this.isEdit = false
        this.$refs.quizAnswerNavigation.getAllAnswers();
      }).catch(error => {
        console.log(error)
      })
    },
  }
}
</script>