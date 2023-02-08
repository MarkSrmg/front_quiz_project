<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-2">
        <AddQuizName ref="addQuizName" @emitAddQuizName="setQuizName"/>
        <SelectQuizType ref="selectQuizType" @emitQuizTypeEvent="setQuizType" />
        <AddCorrectAnswersNeeded ref="addCorrectAnswersNeeded" @emitRequiredCountEvent="setRequiredCount"/>
        <div>
          <button type="button" class="btn btn-dark">Create</button>
        </div>
      </div>
    </div>

  </div>


</template>

<script>
import AddQuizName from "@/components/AddQuiz/AddQuizName.vue";
import SelectQuizType from "@/components/AddQuiz/SelectQuizType.vue";
import AddCorrectAnswersNeeded from "@/components/AddQuiz/AddCorrectAnswersNeeded.vue";

export default {
  name: "AddQuiz",
  components: {AddCorrectAnswersNeeded, SelectQuizType, AddQuizName},
  data: function () {
    return {
      quizDto:{
        quizName: '',
        requiredCount: 0,
        quizType: ''
      }
    }
  },
  methods: {
    setQuizName: function (quizName) {
      this.quizDto.quizName = quizName
    },
    setQuizType: function (quizType) {
      this.quizDto.quizType = quizType
    },
    setRequiredCount: function (requiredCount) {
      this.quizDto.requiredCount = requiredCount
    }
  },
  // getAtmLocation() {
  //   this.$http.get("/atm/location", {
  //         params: {
  //           locationId: this.locationId
  //         }
  //       }
  //   ).then(response => {
  //     this.atmRequest = response.data
  //
  //     // väärtustame kõikide alamkomponentide väljad
  //     this.$refs.citiesDropdown.setSelectedCityId(this.atmRequest.cityId)
  //     this.$refs.atmLocationName.setLocationName(this.atmRequest.locationName)
  //     this.$refs.atmQuantity.setNumberOfAtms(this.atmRequest.numberOfAtms)
  //     this.$refs.atmTransactionTypes.setTransactionTypes(this.atmRequest.transactionTypes)
  //   }).catch(error => {
  //     console.log(error)
  //   })
  // },
}
</script>

