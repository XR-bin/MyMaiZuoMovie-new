import Vue from 'vue'
import Vuex from 'vuex'
import cityModule from './modules/cityModule.js'
import cinemaModule from './modules/cinemaModule.js'

Vue.use(Vuex)

export default new Vuex.Store({
  // 公共状态
  // 定义 “全局”状态的对象
  state: {
  },

  // 集中修改状态，可以被监控，能及时发现谁出问题，通过devtools工具的时光旅行功能
  mutations: {
  },

  // 专门处理异步
  actions: {
  },

  // 存放各个模块的
  modules: {
    cityModule,
    cinemaModule
  }
})
