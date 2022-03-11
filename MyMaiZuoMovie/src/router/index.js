import Vue from 'vue'
import VueRouter from 'vue-router'
import movieRouter from './pages/movie.js'
import cinemaRouter from './pages/cinema.js'
import mineRouter from './pages/mine.js'
import searchRouter from './pages/search.js'
import cityRouter from './pages/city.js'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    movieRouter,   // 电影界面
    cinemaRouter,  // 电影院界面
    mineRouter,    // 我的界面
    searchRouter,  // 电影院搜索界面
    cityRouter,    // 城市选择界面
    // 初始界面默认为movie
    {
      path: '',
      redirect: '/movie'
    },
    // 界面地址错误跳转为movie
    {
      path: '*', // *是通配符，优先级是最低的
      redirect: '/movie'
    }
  ]
})

export default router
