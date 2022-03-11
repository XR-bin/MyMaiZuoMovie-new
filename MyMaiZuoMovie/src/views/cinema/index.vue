<template>
 <div id="main">
    <div id="cinema-list">
      <!-- 头部标题 -->
      <Topbar title="影院" :search_ico="true"></Topbar>

      <!-- 筛选栏 -->
      <div class="cinema_menu">
        <van-dropdown-menu>
          <van-dropdown-item :title="value0" ref="item">
            <van-cell v-for="item in regionList" :class="item==='全部' ? 'region active' : 'region'" :title="item" :key="item"  @click="onConfirm(item, $event)"></van-cell>
          </van-dropdown-item>

          <van-dropdown-item v-model="value1" :options="option1" />

          <van-dropdown-item v-model="value2" :options="option2" />
        </van-dropdown-menu>
      </div>

      <!-- 用来隔距离的，没有其他作用 -->
      <div class="cinema_layer"></div>

      <!-- 影院列表 -->
      <div class="cinema_body">
        <ul>
          <li v-for="data in cinemaFilter" :key="data.cinemaId">
            <div class="cinema_left">
              <span class="cinema_name">{{data.name}}</span>
              <span class="cinema_addr">{{data.address}}</span>
            </div>
            <div class="cinema_right">
              <div>
                <span class="cinema-lowPrice">
                  <i>￥</i><span>{{data.lowPrice/100}}</span>
                </span>
                <span class="upon">起</span>
              </div>
              <span class="cinema-gpsAddress">
                <strong>距离未知</strong>
              </span>
            </div>
          </li>
        </ul>
      </div>

      <!-- 底部导航栏 -->
      <Tabbar></Tabbar>
    </div>
  </div>
</template>

<script>
import Topbar from '../../components/topbar.vue'
import Tabbar from '../../components/tabbar.vue'

import axios from 'axios'

import BetterScroll from 'better-scroll'

import { mapState, mapMutations } from 'vuex'

import Vue from 'vue'
import 'vant/lib/index.css'
import { DropdownMenu, DropdownItem } from 'vant'
Vue.use(DropdownMenu).use(DropdownItem)

export default {
  name: 'ciname',

  data() {
    return {
      scroll: null,
      prevCity: -1,     // 用于存储城市ID，当城市切换时显示数据也得切换

      value0: '全部',
      regionList: [],

      value1: 0,
      option1: [
        { text: 'APP订单', value: 0 },
        { text: '前台兑换', value: 1 }
      ],

      value2: 0,
      option2: [
        { text: '最近去过', value: 0 },
        { text: '离我最近', value: 1 }
      ]
    }
  },

  computed: {
    ...mapState('cinemaModule', ['cinemaList']),
    ...mapState('cityModule', ['cityId']),

    cinemaFilter() {
      if (this.value0 === '全部') {
        return this.cinemaList
      } else {
        return this.cinemaList.filter(item => {
          return item.districtName === this.value0
        })
      }
    }
  },

  watch: {
    value0: function() {
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    }
  },

  components: {
    Topbar,
    Tabbar
  },

  methods: {
    ...mapMutations('cinemaModule', ['clearCinemaList', 'setCinemaList']),

    // 地区选项的筛选功能
    onConfirm(region, event) {
      var clear = event.currentTarget.parentNode.getElementsByClassName('van-cell region active')
      if (clear.length) {
        clear[0].className = 'van-cell region'
      }
      event.currentTarget.className = 'van-cell region active'
      this.value0 = region
      this.$refs.item.toggle()
    },

    // 离开该页面时对筛选款进行初始化
    regionIntn() {
      if (document.querySelector('.van-cell.region.active')) {
        document.querySelector('.van-cell.region.active').className = 'van-cell region'
        document.querySelector('.van-cell.region').className = 'van-cell region active'
      }
    }
  },

  activated() {
    var cityId = this.cityId
    this.value0 = '全部'
    this.value1 = 0
    this.value2 = 0

    if (cityId === this.prevCity) {
      this.regionIntn()
      this.scroll.refresh()
      return 0
    } else {
      this.clearCinemaList()
      this.prevCity = cityId

      axios({
        url: `https://m.maizuo.com/gateway?cityId=${cityId}&ticketFlag=1&k=6170739`,
        headers: {
          'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.0.4","e":"16348228743289700135600129","bc":"${cityId}"}`,
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then(res => {
        this.setCinemaList(res.data.data.cinemas)

        var arr = res.data.data.cinemas.map(item => {
          return item.districtName
        })

        arr = new Set(arr)
        this.regionList = [...arr]
        this.regionList.unshift('全部')

        // 状态立即更改，但是dom异步渲染
        // $nextTick作用：在下次DOM更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的DOM。
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BetterScroll('.cinema_body', {
              scrollbar: {
                fade: true
              }
            })
          } else {
            this.regionIntn()
            this.scroll.refresh()
          }
        })
      })
    }
  }
}
</script>

<style scoped>
/**************************** 影院页面 ****************************/
#cinema-list { height: 100%; width: 100%; position: relative; }

/*筛选栏*/
#cinema-list .cinema_menu { position: fixed; height: 50px; width: 100%; top: 40px; right: 0; background-color: #fff; z-index: 90; }
#cinema-list .cinema_menu .van-cell.region { display: inline-block; width: 25%; }
#cinema-list .cinema_menu .van-cell.region.active { border: 1px #ff5f16 solid; color: #ff5f16; border-radius: 8px; }
#cinema-list .cinema_menu .van-cell.region .van-cell__title{ text-align:center }

/*为了产生隔离距离，没有其他作用*/
#cinema-list .cinema_layer { padding-top: 50px; }

/*电影院列表*/
#cinema-list .cinema_body { z-index: 100; height: calc(100% - 98px); }
#cinema-list .cinema_body ul::after{content: ""; display: block; height: 49px; }
#cinema-list .cinema_body ul li { position: relative; background-color: #fff; padding: 15px;/* width: 100%; */ display: flex; align-items: center; }
#cinema-list .cinema_body ul li .cinema_left { width: calc(100% - 65px); text-align: left; padding-right: 15px; float: left; }
#cinema-list .cinema_body ul li .cinema_left .cinema_name { color: #191a1b; font-size: 16px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis; display: block; max-width: 90% }
#cinema-list .cinema_body ul li .cinema_left .cinema_addr { color: #797d82; font-size: 12px; margin-top: 5px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis; display: block; max-width: 90% }
#cinema-list .cinema_body ul li .cinema_right { width: 70px; text-align: center; float: right; margin-right: -5px; }
#cinema-list .cinema_body ul li .cinema_right div .cinema-lowPrice{ font-size: 15px; color: #ff5f16; height: 0!important; display: inline-table!important; float: none!important; }
#cinema-list .cinema_body ul li .cinema_right div .cinema-lowPrice i { font-size: 11px; font-style: normal; }
#cinema-list .cinema_body ul li .cinema_right div .upon { color: #ff5f16; font-size: 10px; }
#cinema-list .cinema_body ul li .cinema_right .cinema-gpsAddress { display: block; font-size: 11px; color: #797d82; margin-top: 5px; }
</style>
