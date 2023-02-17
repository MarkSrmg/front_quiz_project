<template>
  <div>



  <div class="row justify-content-start">
    <div class="col-2">
      <table class="table table-borderless table-hover text-white fw-bold"
             style="background-color: rgba(0, 0, 0, 0.25)">
        <tbody>
        <tr v-for="shortQuestion in shortQuestions" :key="shortQuestions.questionId">
          <td>{{ shortQuestion.questionNumber }}</td>
          <td>{{ shortQuestion.questionShortText }}</td>
        </tr>

        </tbody>
      </table>
    </div>
      <div class="col-5">
        <table class="table table-borderless table-hover text-white fw-bold"
               style="background-color: rgba(0, 0, 0, 0.25)">
          <tbody>
          <tr>
            <td>EDIT</td>
            <td></td>
          </tr>

          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "EditView",
  props: {
    userId: {}
  },
  data: function () {
    return {
      quizId: Number(this.$route.query.quizId),
      shortQuestions: [
        {
          questionNumber: 0,
          questionId: 0,
          questionShortText: ''
        }
      ]
    }
  },
  methods: {
    getQuestions: function () {
      this.$http.get("/questions", {
            params: {
              quizId: this.quizId,
            }
          }
      ).then(response => {
        this.shortQuestions = response.data
      }).catch(error => {
        console.log(error)
      })
    },
  },
  beforeMount() {
    this.getQuestions()
  }
}
</script>

