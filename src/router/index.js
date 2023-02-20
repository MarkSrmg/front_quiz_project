import Vue from 'vue'
import VueRouter from 'vue-router'
import AddQuizView from "@/views/AddQuizView.vue";
import LoginView from "@/views/LoginView.vue";
import MenuView from "@/views/MenuView.vue";
import PlayView from "@/views/PlayView.vue";
import AddQuestionView from "@/views/AddQuestionView.vue";
import LogoutView from "@/views/LogoutView.vue";
import EditView from "@/views/EditView.vue";
import AdminView from "@/views/AdminView.vue";
import SignUpView from "@/views/SignUpView.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/questions',
    name: 'addQuestionRoute',
    component: AddQuestionView
  },
  {
    path: '/logout',
    name: 'logoutRoute',
    component: LogoutView
  },
  {
    path: '/quiz',
    name: 'addQuizRoute',
    component: AddQuizView
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
  },
  {
    path: '/admin',
    name: 'adminRoute',
    component: AdminView
  },
{
    path: '/signup',
    name: 'signupRoute',
    component: SignUpView
  }

]

const router = new VueRouter({
  routes
})

export default router
