<template>
  <div class="row justify-content-center">
    <div>
      <AddAnswerText ref="addAnswerText" @emitAddAnswerText="setAnswerText"/>
<!--      <image-input @emitBase64Event="setAnswerPicture"/>-->
      <div class="mb-3">
        <button v-on:click="addAnswer" type="button" class="btn btn-success">Save answer</button>
      </div>
    </div>
    <div v-if="isShown">
      <FlashcardNavigation/>
    </div>

  </div>
</template>
<script>
// import ImageInput from "@/components/ImageInput.vue"
import AddAnswerText from "@/components/AddAnswer/AddAnswerText.vue";
import FlashcardNavigation from "@/components/AddAnswer/FlashcardNavigation.vue";

export default {
  name: 'AddFlashcardAnswer',
  components: {FlashcardNavigation, AddAnswerText},
  data: function () {
    return {
      questionId: 0,
      answerId: 0,
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
    // setAnswerPicture: function (pictureDataBase64) {
    //   this.answerDto.answerPicture = pictureDataBase64
    // },
    setAnswerText: function (answerText) {
      this.answerDto.answerText = answerText
    },
    postAnswer: function () {
      this.$http.post("/questions/answer", this.answerDto
      ).then(response => {
        this.answerId = response.data
      }).catch(error => {
        console.log(error)
      })
    },

  }
}
</script>