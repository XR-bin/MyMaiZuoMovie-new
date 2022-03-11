<template>
  <!-- 电影列表 -->
  <div class="soonMovie_body">
   <van-list
      v-model="loading"
      :finished="finished"
      finished-text="我是有底线的o(´^｀)o..."
      @load="onLoad"
      :immediate-check = "false"
    >
      <van-cell v-for="data in soonlist" :key="data.filmId">
        <div class="pic_show" @click='toDetailHandler(data.filmId)'>
          <img :src="data.poster" />
        </div>
        <div class="info_list" @click='toDetailHandler(data.filmId)'>
          <h2>{{data.name}}</h2>
          <p class="list_actor">主演：{{data.actors | actorFilter}}</p>
          <p>上映日期：{{data.premiereAt | dateFilter}}</p>
        </div>
        <div class="btn_mall">
          预购
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import axios from 'axios'
import 'vant/lib/index.css'

export default {
  name: "comingSoon",

  data() {
    return {
      soonlist: [],    // 即将电影列表数据
      loading: false,  // 是否正在加载中
      finished: false, // 是否已结束
      current: 1,    // 记录第几页
      total: 0,         // 能加载的总数据长度
      prevCity: -1     // 用于存储城市ID，当城市切换时显示数据也得切换
    }
  },

  methods: {
    // 下拉加载新数据
    onLoad() {
      // 1、axios请求新页面的数据
      // 2、合并新数据到老数据
      // 3、this.loading = false
      if (this.soonlist.length >= this.total && this.soonlist.length !== 0) {
        this.finished = true
        this.loading = false
        return
      }

      this.current++
      axios({
        url: `https://m.maizuo.com/gateway?cityId=${this.prevCity}&pageNum=${this.current}&pageSize=10&type=2&k=5498494`,
        headers: {
          'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.0.4","e":"16348228743289700135600129","bc":"${this.prevCity}"}`,
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        if (res.data.data.films.length === 0) {
          this.finished = true
          this.loading = false
          this.total = this.soonlist.length
        } else {
          this.soonlist = [...this.soonlist, ...res.data.data.films]
          this.loading = false
        }
      })
    },

    // 进入电影详情页
    toDetailHandler(movieId) {
      this.$router.push(`/movie/detail/2/${movieId}`)
    }
  },

  // 进入组件时触发函数
  activated() {
    var cityId = this.$store.state.cityModule.cityId

    // 判断是否重新选择了城市，如果是重新选择了城市就重新请求新数据
    if (cityId === this.prevCity) {
      return 0
    } else {
      this.prevCity = cityId

      axios({
        url: `https://m.maizuo.com/gateway?cityId=${cityId}&pageNum=1&pageSize=10&type=2&k=5498494`,
        headers: {
          'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.0.4","e":"16348228743289700135600129","bc":"${cityId}"}`,
          'X-Host': 'mall.film-ticket.film.list'
        }
        // method: "get"     //不写默认是get
      }).then(res => {
        this.soonlist = res.data.data.films
        this.total = res.data.data.total
      })
    }
  }
}
</script>

<style>
.soonMovie_body { width: 100%; height: 100%; overflow: hidden; }
.soonMovie_body .van-list{ width: 100%; height: 100%; }
.soonMovie_body .van-list .van-cell__value { margin-left: 5px; display: flex; justify-content: flex-start; align-items: center; margin-right: 5px; }
.soonMovie_body .van-list .pic_show { width:66px; height: 92px; float: left; position: relative; }
.soonMovie_body .van-list .pic_show img { width: 100%; height: 98px; position: absolute; }
.soonMovie_body .van-list .info_list { float: left; width: calc(100% - 160px); margin: 0 14px; }
.soonMovie_body .van-list .info_list h2 { font-size: 16px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis; }
.soonMovie_body .van-list .info_list p { font-size: 13px; color:#797d82; line-height: 22px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis; }
.soonMovie_body .van-list .btn_mall { float: right; width:50px; height:25px; line-height: 25px; text-align: center; color: #ff5f16; border: 1px solid #ff5f16;border-radius: 4px; font-size: 13px; cursor: pointer; }
.soonMovie_body .van-list:after{ content: ''; display: block; height: 50px; clear: both; }
.soonMovie_body .van-list__loading, .van-list__finished-text, .van-list__error-text{ color: #969799;font-size: 18px; line-height: 20px; text-align: center; }
</style>
