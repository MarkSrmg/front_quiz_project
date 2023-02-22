<template>
  <div class="row justify-content-center">
    <div class="col-4">
      <div class="mb-3">
        <input v-model="answerRequest.answerText" class="form-control" type="text" placeholder="Enter your Answer here" aria-label="default input example">
      </div>
      <AlertDanger :message="message"/>
      <div class="mb-3">
        <button v-on:click="editAnswer" type="button" class="btn btn-dark">Save answer changes</button>
      </div>
    </div>
    <div>
      <EditFlashcardAnswerNavigation/>
    </div>
  </div>
</template>
<script>
import AlertDanger from "@/components/alert/AlertDanger.vue";
import FlashcardAnswerNavigation from "@/components/AddAnswer/Flashcard/FlashcardAnswerNavigation.vue";
import EditFlashcardAnswerNavigation from "@/components/edit/EditFlashcardAnswerNavigation.vue";

export default {
  name: 'EditFlashcardAnswer',
  components: {EditFlashcardAnswerNavigation, AlertDanger, FlashcardAnswerNavigation},
  props: {
    questionId: Number
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
      if (this.answerRequest.answerText === '') {
        this.message = 'Please enter your answer'
      } else {
        this.putAnswer();
        this.isShown = true
      }
    },

    addAnswer: function () {
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
    getAnswer: function () {
      this.$http.get("/questions/answer", {
            params: {
              questionId: this.questionId
            }
          }
      ).then(response => {
        this.answerRequest = response.data
      }).catch(error => {
        console.log(error)
      })
    },
  }
}
</script>