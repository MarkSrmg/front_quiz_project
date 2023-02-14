<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-3">
        <AddQuizName ref="addQuizName" @emitAddQuizName="setQuizName"/>
        <SelectQuizType ref="selectQuizType" @emitQuizTypeEvent="setQuizType"/>
        <AddCorrectAnswersNeeded ref="addCorrectAnswersNeeded" @emitRequiredCountEvent="setRequiredCount"/>
        <div>
          <button v-on:click="addQuiz" type="button" class="btn btn-dark">Create</button>
        </div>
      </div>
    </div>

  </div>


</template>

<script>
import AddQuizName from "@/components/AddQuiz/AddQuizName.vue";
import SelectQuizType from "@/components/AddQuiz/SelectQuizType.vue";
import AddCorrectAnswersNeeded from "@/components/AddQuiz/AddCorrectAnswersNeeded.vue";
import addQuizName from "@/components/AddQuiz/AddQuizName.vue";

export default {
  name: "AddQuiz",
  computed: {
    addQuizName() {
      return addQuizName
    }
  },
  components: {AddCorrectAnswersNeeded, SelectQuizType, AddQuizName},
  data: function () {
    return {
      userId: sessionStorage.getItem('userId'),
      roleName: sessionStorage.getItem('roleName'),
      quizId: 0,
      quizRequest: {
        quizName: '',
        quizType: '',
        requiredCount: 0
      }
    }
  },
  methods: {
    addQuiz: function () {
      this.$refs.addQuizName.emitAddQuizName()
      this.$refs.addCorrectAnswersNeeded.emitRequiredCount()
      this.$refs.selectQuizType.emitQuizType()
      this.postQuiz()
    },

    setQuizName: function (quizName) {
      this.quizRequest.quizName = quizName
    },
    setQuizType: function (quizType) {
      this.quizRequest.quizType = quizType
    },
    setRequiredCount: function (requiredCount) {
      this.quizRequest.requiredCount = requiredCount
    },
    postQuiz: function () {
      this.$http.post("/quiz", this.quizRequest, {
            params: {
              userId: this.userId,
            }
          }
      ).then(response => {
        this.quizId = response.data.quizId
        this.$router.push({
          name: 'addQuestionRoute',
          query: {quizId: String(this.quizId), quizType: String(this.quizRequest.quizType)}
        })
      }).catch(error => {
        console.log(error)
      })
    },
  },
}
</script>

