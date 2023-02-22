<template>
  <div>
    <div class="col-11">
      <hr class="solid">
    </div>

<!--    <div class="mb-3">-->
<!--      <button type="button" class="btn btn-dark">Previous question</button>-->
<!--    </div>-->
    <div class="mb-3">
      <button v-on:click="nextQuestion" type="button" class="btn btn-dark">Next question</button>
    </div>
    <div class="mb-3">
      <button v-on:click="finishQuiz" type="button" class="btn btn-dark">Finish quiz</button>
    </div>
    <div class="mb-3">
      <Modal :show="showModal" >
        <template #header><button v-on:click="showModal = false" type="button" class="btn-close btn-close-white" aria-label="Close"></button></template>
        <template #body>Are you sure you want to delete your quiz (this move is IRREVERSIBLE!)</template>
        <template #footer><button v-on:click="deleteQuiz" type="button" class="btn btn-outline-danger">Delete quiz</button></template>
      </Modal>
      <button v-on:click="showModal = true" type="button" class="btn btn-outline-danger">Delete quiz</button>
    </div>
  </div>
</template>
<script>
import Modal from "@/components/Modal.vue";

export default {
  name: 'FlashcardAnswerNavigation',
  components: {Modal},
  data: function () {
    return {
      quizId: Number(this.$route.query.quizId),
      showModal: false
    }
  },
  methods: {
    nextQuestion: function () {
      window.location.reload();
    },
    finishQuiz: function () {
      this.$router.push({name: 'menuRoute'})
    },
    deleteQuiz: function () {
      this.$http.delete("/quiz", {
            params: {
              quizId: this.quizId
            }
          }
      ).then(response => {
        console.log(response.data)
        this.$router.push({name: 'menuRoute'})
      }).catch(error => {
        console.log(error)
      })
    },
  }
}
</script>