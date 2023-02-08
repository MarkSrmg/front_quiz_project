import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddQuiz from "@/views/AddQuiz.vue";
import AddQuestion from "@/views/AddQuestion.vue";
import LoginView from "@/views/LoginView.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/questions',
    name: 'addQuestion',
    component: AddQuestion
  },
  {
    path: '/quiz',
    name: 'addQuiz',
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
