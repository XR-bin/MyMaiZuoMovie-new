import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'
import { List, Cell } from 'vant'

// 外部组件
Vue.use(List).use(Cell)   // 全局注册

// 过滤器
// 演员数据过滤器
Vue.filter('actorFilter', (actors) => {
  if (actors === undefined) return '暂无主演'
  return actors.map(item => item.name).join(' ')
})
// 上映时间修改过滤器
Vue.filter('dateFilter', (date) => {
  return moment(date * 1000).format('YYYY-MM-DD')
})

Vue.config.productionTip = false

new Vue({
  router,    // 通过this.$router 可以访问到 我们写的router对象
  store,     // 通过this.$store 可以访问到 我们写的store对象
  render: h => h(App)
}).$mount('#app')
