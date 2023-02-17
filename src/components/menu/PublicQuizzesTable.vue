<template>
  <table class="table table-borderless table-hover text-white fw-bold" style="background-color: rgba(0, 0, 0, 0.25)">

    <tbody>
    <tr v-for="quiz in quizzes" :key="quiz.quizId">
      <td>
        <div>
          <div v-if="quiz.quizType === 'Q'">
            <font-awesome-icon title="Quiz" icon="fa-solid fa-list-check"/>
          </div>
          <div v-if="quiz.quizType === 'F'">
            <font-awesome-icon title="Flashcard" icon="fa-solid fa-money-bill-1"/>
          </div>
        </div>
      </td>
      <td>{{ quiz.quizName }}</td>
      <td>
        <font-awesome-icon v-on:click="navigateToPlay(quiz.quizId)" icon="fa-solid fa-play" class="icon-hover"/>
      </td>
      <td v-if="userLoggedIn">
        <font-awesome-icon  v-on:click="copyPublicQuizToUser(quiz.quizId)" icon="fa-solid fa-plus"
                           class="icon-hover"/>
      </td>
    </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: 'PublicQuizzesTable',
  props: {
    userId: {}
  },
  data: function () {
    return {
      isPublic: true,
      userLoggedIn: false,

      quizzes: [
        {
          quizId: 0,
          quizName: '',
          quizType: ''
        }
      ]
    }
  },
  methods: {
    getPublicQuizzes: function () {
      this.$http.get("/quiz/public")
          .then(response => {
            this.quizzes = response.data
          })
          .catch(error => {
            console.log(error)
          })
    },

    getPublicLast5Quizzes: function () {
      this.$http.get("/quiz/public/last-5")
          .then(response => {
            this.quizzes = response.data
          })
          .catch(error => {
            console.log(error)
          })
    },
    copyPublicQuizToUser: function (quizId) {
      this.$http.post("/quiz/public-to-user", null, {
            params: {
              userId: this.userId,
              quizId: quizId
            }
          }
      ).then(response => {
        console.log(response.data)
        this.$emit('emitPublicQuizzesTable')
      }).catch(error => {
        console.log(error)
      })
    },

    navigateToPlay: function (quizId) {
      this.$router.push({name: 'playRoute', query: {quizId: quizId, isPublic: this.isPublic}})
    },
    checkIfUserLoggedIn: function () {
      this.userLoggedIn = this.userId != null
    },
  },
  beforeMount() {
    this.getPublicLast5Quizzes();
    this.checkIfUserLoggedIn();

  }


}
</script>