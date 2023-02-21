<template>
  <div>
    <div>
      <table class="table table-borderless table-hover text-white text fw-bold"
             style="background-color: rgba(0, 0, 0, 0.25);">
        <tbody>
        <tr v-for="(quiz, index) in quizzes" :key="quiz.quizId">
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
          <td>
            <font-awesome-icon v-on:click="navigateToEditPage(quiz.quizId, quiz.quizType)"  icon="fa-solid fa-pencil" class="icon-hover"/>
          </td>
          <td title="Reset question counters">
            <div v-on:click="rotation(index)" class="transition"
                 v-bind:style="{transform: `rotate(${quizzes[index].deg}deg)`  }">
              <font-awesome-icon v-on:click="resetCounter(quiz.quizId)" icon="fa-solid fa-arrows-rotate"
                                 class="icon-hover"/>
            </div>
          </td>
        </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>
<script>


export default {
  name: 'UserQuizzesTable',
  props: {
    userId: {}
  },
  data: function () {
    return {
      isPublic: false,
      quizzes: [
        {
          quizId: 0,
          quizName: '',
          quizType: '',
          deg: 0
        }
      ]
    }
  },
  methods: {
    rotation(index) {
      this.quizzes[index].deg += 360;
    },

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

    navigateToEditPage: function (quizId, quizType) {
      this.$router.push({name: 'editRoute', query: {quizId: quizId, quizType: quizType}})
    },

    resetCounter: function (quizId) {
      this.$http.put("/quiz", null, {
            params: {
              quizId: quizId
            }
          }
      ).then(response => {
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