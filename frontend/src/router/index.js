import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/HomePage.vue'
import Login from '../views/Login.vue'
import Profile from '../views/MyProfile.vue'
import Signup from '../views/SignUp.vue'
import Post from '../views/Post'

Vue.use(VueRouter)

const routes = [
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/home',
    name: 'HomePage',
    component: Home
  },
  {
    path: '/Post/:id',
    name: 'Post',
    component: Post
  }
]

const router = new VueRouter({
  routes
})

export default router
