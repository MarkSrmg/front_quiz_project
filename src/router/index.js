import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddQuiz from "@/views/AddQuiz.vue";
import LoginView from "@/views/LoginView.vue";
import MenuView from "@/views/MenuView.vue";
import PlayView from "@/views/PlayView.vue";
import AddQuestionView from "@/views/AddQuestionView.vue";
import EditView from "@/views/EditView.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/questions',
    name: 'addQuestionRoute',
    component: AddQuestionView
  },
  {
    path: '/quiz',
    name: 'addQuizRoute',
    component: AddQuiz
  },
  {
    path: '/menu',
    name: 'menuRoute',
    component: MenuView
  },
  {
    path: '/play',
    name: 'playRoute',
    component: PlayView
  }, {
    path: '/edit',
    name: 'editRoute',
    component: EditView
  },
  {
    path: '/login',
    name: 'loginRoute',
    component: LoginView
  }

]

const router = new VueRouter({
  routes
})

export default router
