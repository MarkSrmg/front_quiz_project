<template>
  <div>
    <div class="justify-content-start">

      <button v-on:click="navigateToAddQuiz" type="button" class="btn btn-dark btn-lg">Create New Quiz</button>
    </div>

    <div class="row justify-content-center">

      <div class="col-5">
        <UserQuizzesTable ref="userQuizzesTable" :user-id="userId"/>
      </div>

      <div class="col-5">
        <PublicQuizzesTable ref="publicQuizzesTable" />
      </div>

      <div class="row justify-content-center">
        <div class="col-5">
          <button v-on:click="showAllUserQuizzes" type="button" class="btn btn-outline-secondary text-white">Show All My Quizzes</button>
        </div>

        <div class="col-5">
          <button v-on:click="showAllPublicQuizzes" type="button" class="btn btn-outline-secondary text-white">Show All Public Quizzes</button>
        </div>

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
    },

    showAllUserQuizzes: function () {
      this.$refs.userQuizzesTable.getUserQuizzes()
    },

    showAllPublicQuizzes: function () {
      this.$refs.publicQuizzesTable.getPublicQuizzes()
    }

  }
}
</script>

