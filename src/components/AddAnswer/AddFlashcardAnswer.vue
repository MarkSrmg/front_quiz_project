<template>
  <div class="row justify-content-center">
    <div>
      <AddAnswerText ref="addAnswerText" @emitAddAnswerText="setAnswerText"/>
      <div class="mb-3">
        <button v-if="!isShown" v-on:click="addAnswer" type="button" class="btn btn-success">Save answer</button>
      </div>
      <div class="mb-3" v-if="isShown">
        <button v-on:click="" type="button" class="btn btn-dark">Edit answer</button>
      </div>
    </div>
    <div v-if="isShown">
      <FlashcardNavigation/>
    </div>

  </div>
</template>
<script>

import AddAnswerText from "@/components/AddAnswer/AddAnswerText.vue";
import FlashcardNavigation from "@/components/AddAnswer/FlashcardNavigation.vue";

export default {
  name: 'AddFlashcardAnswer',
  components: {FlashcardNavigation, AddAnswerText},
  props: {
    questionId: {}
  },
  data: function () {
    return {

      answerId: Number(this.$route.query.answerId),
      answerDto: {
        answerText: '',
        answerPicture: '',
        answerIsCorrect: true
      },
      isShown: false
    }
  },
  methods: {
    addAnswer: function () {
      this.$refs.addAnswerText.emitAddAnswerText();
      this.postAnswer()
      this.isShown = true
    },
    setAnswerText: function (answerText) {
      this.answerDto.answerText = answerText
    },
    postAnswer: function () {
      this.$http.post("/questions/answer", this.answerDto, {
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

  }
}
</script>