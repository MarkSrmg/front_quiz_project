<template>
  <div>
    <div>
      <AlertSuccess :message="message"/>
    </div>
    <div>
      <table class="table table-borderless table-hover text-white text fw-bold"
             style="background-color: rgba(0, 0, 0, 0.25);">
        <tbody>
        <tr v-for="quiz in quizzes" :key="quiz.quizId">
          <td>
            <div>
              <div v-if="quiz.quizType === 'Q'">
                <font-awesome-icon  icon="fa-solid fa-list-check"/>
              </div>
              <div v-if="quiz.quizType === 'F'">
                <font-awesome-icon  icon="fa-solid fa-money-bill-1"/>
              </div>
            </div>
          </td>
          <td>{{ quiz.quizName }}</td>
          <td>
            <font-awesome-icon v-on:click="navigateToPlay(quiz.quizId)" icon="fa-solid fa-play" class="icon-hover"/>
          </td>
          <td>
            <font-awesome-icon v-on:click="navigateToEditPage(quiz.quizId)" icon="fa-solid fa-pencil"
                               class="icon-hover" :userId="userId"/>
          </td>
          <td>
            <font-awesome-icon v-on:click="resetCounter(quiz.quizId)" icon="fa-solid fa-arrows-rotate"
                               class="icon-hover"/>
          </td>
        </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>
<script>
import AlertSuccess from "@/components/alert/AlertSuccess.vue";

export default {
  name: 'UserQuizzesTable',
  components: {AlertSuccess},
  props: {
    userId: {}
  },
  data: function () {
    return {
      message: '',
      flashcard: false,
      isPublic: false,
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

    getUserLast5Quizzes: function () {
      this.$http.get("/quiz/user/last-5", {
            params: {
              userId: this.userId
            }
          }
      ).then(response => {
        this.quizzes = response.data
      }).catch(error => {
        console.log(error)
      })
    },

    getUserQuizzes: function () {
      this.$http.get("/quiz/user", {
            params: {
              userId: this.userId
            }
          }
      ).then(response => {
        this.quizzes = response.data
      }).catch(error => {
        console.log(error)
      })
    },

    navigateToPlay: function (quizId) {
      this.$router.push({name: 'playRoute', query: {quizId: quizId, isPublic: this.isPublic}})
    },

    navigateToEditPage: function (quizId) {
      this.$router.push({name: 'editRoute', query: {quizId: this.userId}})
    },

    resetCounter: function (quizId) {
      this.$http.put("/quiz", null, {
            params: {
              quizId: quizId
            }
          }
      ).then(response => {
        this.message = 'Uuendatud'
        setTimeout(() => this.message = '', 2000);
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },

  },
  beforeMount() {
    this.getUserLast5Quizzes()
  }
}
</script>