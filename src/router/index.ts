import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import authRouter from '../views/authentication/auth-routes'
import homeRouter from '../views/home/home-routes'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    ...authRouter,
    ...homeRouter
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
