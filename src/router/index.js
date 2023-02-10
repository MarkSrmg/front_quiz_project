import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddQuiz from "@/views/AddQuiz.vue";
import LoginView from "@/views/LoginView.vue";
import PlayView from "@/views/PlayView.vue";
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
    path: '/play',
    name: 'playRoute',
    component: PlayView
  },
  {
    path: '/login',
    name: 'loginRoute',
    component: LoginView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
