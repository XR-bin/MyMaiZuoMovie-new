<template>
  <div id="city_body">
    <van-nav-bar title="当前城市" left-arrow @click-left='cityQuit'></van-nav-bar>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      ></van-search>
    </form>

    <van-index-bar :index-list= 'computedCityList' @change='changeHandler' v-show="isShow">
      <!-- 热门城市列表 -->
      <div v-for="data in hotList" :key='data.type'>
        <van-index-anchor :index='data.type'>热门城市</van-index-anchor>
        <van-cell class="cityHot" :title="item.name" v-for="item in data.list" :key='item.cityId' @click="changePageHandler(item.name, item.cityId)" />
      </div>
      <!-- 开头字母索引城市列表 -->
      <div v-for="data in cityList" :key='data.type'>
        <van-index-anchor :index='data.type' />
        <van-cell :title="item.name" v-for="item in data.list" :key='item.cityId' @click="changePageHandler(item.name, item.cityId)" />
      </div>
    </van-index-bar>

    <div v-show="!isShow">
      <van-cell v-for="data in computedCinemaList" :key='data.cityId' :title="data.name" @click="changePageHandler(data.name, data.cityId)" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import 'vant/lib/index.css'
import { IndexBar, IndexAnchor, Search, Toast, NavBar } from 'vant'
Vue.use(IndexBar).use(IndexAnchor).use(Search).use(NavBar).use(Toast)
Toast.setDefaultOptions({ duration: 600 })

export default {
  data() {
    return {
      cityList: [],        // 默认索引列表
      hotList: [],         // 热门城市列表
      citySearchList: [],  // 搜索列表
      value: '',
      isShow: true         // 用了区分默认索引列表和搜索列表
    }
  },

  methods: {
    // 给城市数据排序
    cityDataHandler(cities) {
      // 输入的是原始数据    输出的是目标数据
      const letterArr = []
      const newCities = []
      for (let code = 65; code < 91; code++) {
        letterArr.push(String.fromCharCode(code))
      }

      // 开头字母为条件，筛选城市
      letterArr.forEach(letter => {
        const list = cities.filter(item => item.pinyin.charAt(0).toUpperCase() === letter)

        if (list.length > 0) {
          newCities.push({
            type: letter,
            list: list
          })
        }
      })

      const hot = cities.filter(item => item.isHot === 1)

      this.hotList.push({
        type: '热',
        list: hot
      })

      console.log(this.hotList)

      return newCities
    },

    // 搜索回车触发事件
    onSearch(val) {
      this.isShow = false
    },
    // 搜索取消按键点击事件
    onCancel() {
      this.value = ''
      this.isShow = true
    },
    // 提示序号
    changeHandler(index) {
      Toast(index)
    },

    // 返回上个页面
    cityQuit() {
      this.isShow = true
      this.value = ''
      this.$router.back()
    },

    // 在vuex中修改城市name和id
    changePageHandler(name, id) {
      this.$store.commit('cityModule/changeCityName', name)
      this.$store.commit('cityModule/changeCityId', id)
      this.$router.back()
    }
  },

  computed: {
    // 筛选出所有城市的开头字母索引
    computedCityList() {
      return ['热', ...this.cityList.map(item => item.type)]
    },

    // 进行搜索栏条件筛选
    computedCinemaList() {
      if (this.value === '') return []
      return this.citySearchList.filter(item => item.name.includes(
        this.value) || item.pinyin.toUpperCase().includes(this.value.toUpperCase()))
    }
  },

  mounted() {
    axios({
      url: `https://m.maizuo.com/gateway?k=5387573`,
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16348228743289700135600129"}',
        'X-Host': 'mall.film-ticket.city.list'
      }
      // method: "get"     //不写默认是get
    }).then(res => {
      this.citySearchList = res.data.data.cities
      this.cityList = this.cityDataHandler(res.data.data.cities)
    })
  }
}

</script>

<style>
.van-cell.cityHot { display: inline-block; width: 120px }
.van-cell.cityHot .van-cell__title{ text-align:center }
</style>
