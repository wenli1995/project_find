import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '@/pages/HomePage'
import PublishPage from '@/pages/PublishPage'
import LostPage from '@/pages/LostPage'
import MinePage from '@/pages/MinePage'
import LoginPage from '@/pages/LoginPage'
import UserEditPage from '@/pages/UserEditPage'
import SignatureEditPage from '@/pages/SignatureEditPage'
import ContainerPage from "../pages/ContainerPage";
Vue.use(Router)

export default new Router({
  routes: [
        {
          path: '/',
          redirect: '/users/login'
        },
        {
          path: '/users/login',
          component: LoginPage
        },
        {
          path: '/users/userEdit',
          component: UserEditPage
        },
        {
          path: '/users/signatureEdit',
          component: SignatureEditPage
        },
        {
          path:'/losts',
          component:ContainerPage,
          children:[
            {
              path: 'home',
              component: HomePage
            },
            {
              path: 'publish',
              component: PublishPage
            },
            {
              path: 'lost',
              component: LostPage
            },
            {
              path: 'mine',
              component: MinePage
            }

          ]
        }

  ]
})
