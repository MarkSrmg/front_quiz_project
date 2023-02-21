<template>
  <div>
    <div class="my-3">

      <button v-on:click="navigateToAddQuiz" type="button" class="btn btn-dark btn-lg">Create New Quiz</button>
    </div>

    <div class="row justify-content-center">

      <div class="col-5">
        <UserQuizzesTable ref="userQuizzesTable" :user-id="userId"/>
      </div>

      <div class="col-5">
        <PublicQuizzesTable ref="publicQuizzesTable" :user-id="userId "@emitPublicQuizzesTable="show5UserQuizzes"/>
      </div>

      <div class="row justify-content-center">
        <div class="col-5">

          <button v-if="display5LastPrivateButton" v-on:click="show5UserQuizzes" type="button"
                  class="btn btn-outline-secondary text-white">Show 5 latest
          </button>
          <button v-else v-on:click="showAllUserQuizzes" type="button" class="btn btn-outline-secondary text-white">Show All My
            Quizzes
          </button>


        </div>

        <div class="col-5">

          <button v-if="display5LastPublicButton" v-on:click="show5PublicQuizzes" type="button" class="btn btn-outline-secondary text-white">Show 5 Latest</button>
          <button v-else v-on:click="showAllPublicQuizzes" type="button" class="btn btn-outline-secondary text-white">Show All
            Public Quizzes
          </button>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import UserQuizzesTable from "@/components/menu/UserQuizzesTable.vue";
import PublicQuizzesTable from "@/components/menu/PublicQuizzesTable.vue";

export default {
  name: "MenuView",
  components: {PublicQuizzesTable, UserQuizzesTable},
  data: function () {
    return {
      userId: sessionStorage.getItem('userId'),
      display5LastPublicButton: false,
      display5LastPrivateButton: false
    }
  },

  methods: {
    navigateToAddQuiz: function () {
      this.$router.push({name: 'addQuizRoute'})
    },

    showAllUserQuizzes: function () {
      this.$refs.userQuizzesTable.getUserQuizzes()
      this.display5LastPrivateButton = true

    },

    showAllPublicQuizzes: function () {
      this.$refs.publicQuizzesTable.getPublicQuizzes()
      this.display5LastPublicButton = true
    },

    show5UserQuizzes: function () {
      this.$refs.userQuizzesTable.getUserLast5Quizzes()
      this.display5LastPrivateButton = false
    },

    show5PublicQuizzes: function () {
      this.$refs.publicQuizzesTable.getPublicLast5Quizzes()
      this.display5LastPublicButton = false
    }


  }
}
</script>

