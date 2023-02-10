<template>
  <div>
    <div class="justify-content-start">

      <button v-on:click="navigateToAddQuiz" type="button" class="btn btn-dark btn-lg">Create New Quiz</button>
    </div>

    <div class="row justify-content-center">

      <div class="col-5">


        <UserQuizzesTable :user-id="userId"/>
      </div>

      <div class="col-5">
        <PublicQuizzesTable/>


      </div>
    </div>
  </div>


</template>

<script>
import UserQuizzesTable from "@/views/UserQuizzesTable.vue";
import PublicQuizzesTable from "@/views/PublicQuizzesTable.vue";

export default {
  name: "MenuView",
  components: {PublicQuizzesTable, UserQuizzesTable},
  data: function () {
    return {
      userId: sessionStorage.getItem('userId'),
    }
  },

  methods: {
      navigateToAddQuiz: function () {
        this.$router.push({name: 'addQuizRoute'})
      }

  }
}
</script>

