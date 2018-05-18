import Vue from 'vue'
import Router from 'vue-router'
import TicTacToe from '@/components/TicTacToe'
import AboutMe from '@/components/AboutMe'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TicTacToe',
      component: TicTacToe
    },
    {
      path: '/ognj3n',
      name: 'AboutMe',
      component: AboutMe
    }
  ]
})
