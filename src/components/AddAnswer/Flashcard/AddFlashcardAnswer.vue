<template>
  <div class="row justify-content-center">
    <div class="col-4">
      <AddAnswerText ref="addAnswerText" @emitAddAnswerText="setAnswerText"/>
      <div class="mb-3">
        <button v-if="!isShown" v-on:click="addAnswer" type="button" class="btn btn-success">Save answer</button>
      </div>
      <AlertDanger :message="message"/>
      <div class="mb-3" v-if="isShown">
        <button v-on:click="editAnswer" type="button" class="btn btn-dark">Save answer changes</button>
      </div>
    </div>
    <div v-if="isShown">
      <FlashcardAnswerNavigation/>
    </div>
  </div>
</template>
<script>

import AddAnswerText from "@/components/AddAnswer/AddAnswerText.vue";
import FlashcardAnswerNavigation from "@/components/AddAnswer/Flashcard/FlashcardAnswerNavigation.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
  name: 'AddFlashcardAnswer',
  components: {AlertDanger, FlashcardAnswerNavigation, AddAnswerText},
  props: {
    questionId: {}
  },
  data: function () {
    return {
      answerId: Number(this.$route.query.answerId),
      answerRequest: {
        answerText: '',
        answerPicture: '',
        answerIsCorrect: true
      },
      isShown: false,
      message: ''
    }
  },
  methods: {
    editAnswer: function () {
      this.$refs.addAnswerText.emitAddAnswerText();
      if (this.answerRequest.answerText === '') {
        this.message = 'Please enter your answer'
      } else {
        this.putAnswer();
        this.isShown = true
      }
    },

    addAnswer: function () {
      this.$refs.addAnswerText.emitAddAnswerText();
      if (this.answerRequest.answerText === '') {
        this.message = 'Please enter your answer'
      } else {
        this.postAnswer();
        this.isShown = true
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

  }
}
</script>