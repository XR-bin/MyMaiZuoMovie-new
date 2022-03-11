<template>
  <div id="box">
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @cancel="onCancel"
      />
    </form>

    <!-- 搜索结果 -->
    <div class="search_body">
      <ul>
        <li v-for="data in computedCinemaList" :key="data.cinemaId">
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
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import { Search } from 'vant'
import 'vant/lib/index.css'

Vue.use(Search)

export default {
  data() {
    return {
      value: ''
    }
  },

  computed: {
    // ...mapState的作用是使vuex用this.cinemaList来代替this.$store.state.cinemaModule.cinemaList
    ...mapState('cinemaModule', ['cinemaList']),

    // 进行搜索栏条件筛选
    computedCinemaList() {
      if (this.value === '') return []
      return this.cinemaList.filter(item => item.name.toUpperCase().includes(
        this.value.toUpperCase()) || item.address.toUpperCase().includes(this.value.toUpperCase()))
    }
  },

  methods: {
    onCancel() {
      this.$router.back()
    }
  }
}

</script>

<style scoped>
/*电影院列表*/
.search_body { padding-bottom: 49px; z-index: 100; }
.search_body ul li { position: relative; background-color: #fff; padding: 15px; display: flex; align-items: center; }
.search_body ul li .cinema_left { width: calc(100% - 65px); text-align: left; padding-right: 15px; float: left; }
.search_body ul li .cinema_left .cinema_name { color: #191a1b; font-size: 16px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis; display: block; max-width: 90% }
.search_body ul li .cinema_left .cinema_addr { color: #797d82; font-size: 12px; margin-top: 5px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis; display: block; max-width: 90% }
.search_body ul li .cinema_right { width: 70px; text-align: center; float: right; margin-right: -5px; }
.search_body ul li .cinema_right div .cinema-lowPrice{ font-size: 15px; color: #ff5f16; height: 0!important; display: inline-table!important; float: none!important; }
.search_body ul li .cinema_right div .cinema-lowPrice i { font-size: 11px; font-style: normal; }
.search_body ul li .cinema_right div .upon { color: #ff5f16; font-size: 10px; }
.search_body ul li .cinema_right .cinema-gpsAddress { display: block; font-size: 11px; color: #797d82; margin-top: 5px; }
</style>
