import { createRouter, createWebHistory } from 'vue-router'
import { SignupView, LoginView, HomeView, FeedView, MessagesView, SearchView } from '../views/index'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/feed',
      name: 'feed',
      component: FeedView
    },
    {
      path: '/messages',
      name: 'messages',
      component: MessagesView
    },
    {
      path: '/search',
      name: 'searc',
      component: SearchView
    }
  ]
})

export default router
