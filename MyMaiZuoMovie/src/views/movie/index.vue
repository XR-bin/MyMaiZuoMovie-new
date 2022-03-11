<template>
  <div id="main">
    <div id="film-list">
      <!-- 头部标题 -->
      <Topbar title="电影" :search_ico="false"></Topbar>

      <!-- 轮播图 -->
      <film-swiper id="movie_swiper">
        <div class="swiper-slide" v-for="data in imglist" :key="data.bannerId">
          <div :style="{backgroundImage:'url(' + data.imgUrl + ')'}" class="swiperImg">
          </div>
        </div>
      </film-swiper>

      <!-- 热映与上映 -->
      <div class="hot_swtich">
        <router-link tag="div" to="/movie/nowPlaying" class="hot_item">
          <span>正在热映</span>
        </router-link>
        <router-link tag="div" to="/movie/comingSoon" class="hot_item">
          <span>即将上映</span>
        </router-link>
      </div>

      <!-- 影片列表 -->
      <keep-alive>
        <router-view/>
      </keep-alive>

      <!-- 底部导航栏 -->
      <Tabbar></Tabbar>
    </div>
    <!-- 采用命名视图的方式来单独加载电影详情页 -->
    <router-view name="detail" />
  </div>
</template>

<script>
import Topbar from '../../components/topbar.vue'
import Tabbar from '../../components/tabbar.vue'
import filmSwiper from './filmSwiper.vue'
import axios from 'axios'
import Swiper from 'swiper/bundle' // 引入的是swiper.js

export default {
  name: 'movie',

  data() {
    return {
      imglist: []
    }
  },

  components: {
    Topbar,
    Tabbar,
    filmSwiper
  },

  mounted() {
    axios({
      url: `https://m.maizuo.com/gateway?type=2&cityId=440100&k=6395570`,
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16348228743289700135600129","bc":"440100"}',
        'X-Host': 'mall.cfg.common-banner',
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(res => {
      // 获取数据
      this.imglist = res.data.data
      // 等待页面渲染完成后初始胡轮播租件
      this.$nextTick(() => {
        new Swiper('.swiper-container', {
          pagination: {
            el: '.swiper-pagination'
          },
          autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: false
          }
        })
      })
    })
  }
}
</script>

<style scoped>
#film-list { min-height: 100%; width: 100%; position: relative; }

/*轮播*/
#film-list #movie_swiper { height: 200px; width: 100%; margin-top: 6px; }
#film-list #movie_swiper .swiperImg { height: 240px; background-size: 100% 200px; background-repeat: no-repeat; }

/*热映与上映*/
#film-list .hot_swtich { margin-top: 6px; height: 45px; width: 100%; line-height: 45px; display: flex; position: sticky; top: 38px; background-color: white; z-index: 100; }
#film-list .hot_item { width: 50%; text-align: center; }
#film-list .hot_item span { font-size: 14px; color: #191a1b; display: inline-block; height: 40px;}
#film-list .hot_item.router-link-active span{color: #ef4238; border-bottom: 2px #ef4238 solid;}

</style>
