import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import TicTacToe from '@/components/TicTacToe'
import AboutMe from '@/components/AboutMe'

Vue.use(Router);
Vue.use(VueAxios, axios)

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
