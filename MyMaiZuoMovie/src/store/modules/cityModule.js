export default {
  namespaced: true,    // 命名空间
  
  // 公共状态
  // 定义 “全局”状态的对象
  state: {
    cityId: 440100,
    cityName: '广州'
  },
  
  // 集中修改状态，可以被监控，能及时发现谁出问题，通过devtools工具的时光旅行功能
  mutations: {
    changeCityName(state, cityName) {
      state.cityName = cityName
    },
  
    changeCityId(state, cityId) {
      state.cityId = cityId
    }
  },
  
  // 专门处理异步
  actions: {
  }
}
