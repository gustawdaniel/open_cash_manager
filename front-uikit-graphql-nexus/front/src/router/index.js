import Vue from 'vue'
import VueRouter from 'vue-router'
import Accounts from '../views/Accounts.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Accounts',
    component: Accounts
  },
  {
    path: '/account/:id',
    name: 'Transactions',
    component() {
      return import(/* webpackChunkName: "about" */ '../views/Transactions.vue')
    },
    props: (route) => ({ id: Number(route.params.id) })
  },
  {
    path: '/categories',
    name: 'Categories',
    component() {
      return import(/* webpackChunkName: "about" */ '../views/Categories.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
