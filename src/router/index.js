import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddQuiz from "@/views/AddQuiz.vue";
import LoginView from "@/views/LoginView.vue";
import AddQuestionView from "@/views/AddQuestionView.vue";

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
    path: '/',
    name: 'homeRoute',
    component: HomeView
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
