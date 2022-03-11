<template>
  <div id="film_detail" v-if="detailList" class="slide-enter-active" @touchmove="headerShow">
    <!-- 电影详情页头部 -->
    <div class="film_header" id="my_header">
      <div class="get_back" @click='toBackHandler'>
        <img src="../../assets/img/p11.png" />
      </div>
      <div class="title">{{detailList.name}}</div>
    </div>

    <!-- 电影海报 -->
    <div class="poster">
      <div class="poster_background"></div>
      <div class="poster_img">
        <img id="" :src="detailList.poster" />
      </div>
    </div>

    <!-- 电影信息 -->
    <div class="film_information">
      <div class="fiml_title">
        <div class="film_name">
          <div class="name">{{detailList.name}}</div><span class="item">{{detailList.filmType.name}}</span>
        </div>
        <div class="film-grade">
          <span class="grade">{{detailList.grade}}</span><span class="grade_text">分</span>
        </div>
      </div>
      <div class="film_text">{{detailList.category}}</div>
      <div class="film_text"> {{detailList.premiereAt|dateFilter}}上映 </div>
      <div class="film_text"> {{detailList.nation}} | 分钟 </div>
      <div class="film_content">
        {{detailList.synopsis}}
      </div>
      <div class="drop_down" @click="unfold">
        <i class="iconfont icon-xia" id="icon"></i>
      </div>
    </div>

    <!-- 演员表 -->
    <div class="actor_list">
      <div class="actor_list_title">演职人员</div>
      <detail-swiper swiperClass="detail_player">
        <ul class="swiper-wrapper">
          <li class="swiper-slide" v-for="(actor, index) in detailList.actors" :key="index">
            <div class="actor_img">
              <img :src="actor.avatarAddress" />
            </div>
            <p class="actor_name">{{actor.name}}</p>
            <p class="actor_role">{{actor.role}}</p>
          </li>
        </ul>
      </detail-swiper>
    </div>

    <!-- 剧照列表 -->
    <div class="photos_list">
      <div class="photos_title">
        <span class="title">剧照</span><span class="num">全部({{detailList.photos===undefined ? 0 : detailList.photos.length}})</span>
      </div>

      <detail-swiper swiperClass="stage_photos">
        <ul class="swiper-wrapper">
          <li class="swiper-slide" v-for="(photos, index) in detailList.photos" :key="index">
            <div class="stage_img" @click="previewHandler(index)">
              <img :src='photos' />
            </div>
          </li>
        </ul>
      </detail-swiper>
    </div>

    <!-- 购票 -->
    <div class="buy_ticket"> 选座购票 </div>
  </div>
</template>

<script>
import axios from 'axios'
import detailSwiper from './detailSwiper.vue'
import { ImagePreview } from 'vant'
import 'vant/lib/index.css'

export default {
  name: 'detail',

  data() {
    return {
      isShow: false, // 电影内容简介展开标记，默认时收起
      detailList: null   // 电影信息数据
    }
  },

  // 这里的movieId是通过路由获取的
  props: ['movieId'],

  // 组件注册
  components: {
    detailSwiper
  },

  methods: {
    // 电影内容展开与收起
    unfold() {
      var oFilm = document.getElementsByClassName("film_content")[0]
      var icon = document.getElementById("icon")

      // 一行26个字,一行字高18
      var H = 18 * Math.ceil(oFilm.innerText.length / 26)

      if (!this.isShow) {
        oFilm.style.overflow = "visible"
        oFilm.style.height = H + "px"
        this.isShow = true
        icon.className = "iconfont icon-shang"
      } else {
        oFilm.style.overflow = "hidden"
        oFilm.style.height = "37px"
        this.isShow = false
        icon.className = "iconfont icon-xia"
      }
    },

    // 头部标题显示与隐藏
    headerShow() {
      var oDiv = document.getElementById("film_detail")
      var oHear = document.getElementById("my_header")

      if (oDiv.scrollTop > 55) {
        oHear.className = "film_header show_film_header"
      }

      if (oDiv.scrollTop <= 55) {
        oHear.className = "film_header"
      }
    },

    // 退出电影详情页
    toBackHandler() {
      this.$router.back()
    },

    // vant组件中的 ImagePreview 组件使用
    previewHandler(index) {
      ImagePreview({
        images: this.detailList.photos,
        startPosition: index,
        loop: false,
        closeable: true,
        closeIconPosition: 'top-left'
      })
    }

  },

  mounted() {
    axios({
      url: `https://m.maizuo.com/gateway?filmId=${this.movieId}&k=648162`,
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16348228743289700135600129"}',
        'X-Host': 'mall.film-ticket.film.info'
      }
      // method: "get"     //不写默认是get
    }).then(res => {
      this.detailList = res.data.data.film
      this.$nextTick(() => {
        // 为了调整电影海报图片位置的(由于后台的图片高度不一才需要这样处理的)
        var imgDiv = document.querySelector(".poster_img")
        var imgs = document.querySelector(".poster_img img")
        var temp = (window.getComputedStyle(imgs).height.slice(0, 3) - window.getComputedStyle(imgDiv).height.slice(0, 3)) / 2
        imgs.style.top = -temp + 'px'
      })
    })
  }
}
</script>

<style>
#film_detail { position: absolute; left: 0; top: 0; z-index: 110; width: 100%; max-height: 100%; background-color: white; overflow-x: hidden; }
#film_detail .film_header { position: fixed; background-color: hsla(0,0%,100%,0); color: transparent; transition: all .6s ease; width: 100%; height: 44px; z-index: 10; }
#film_detail .show_film_header { transition: all .6s ease; background-color: #fff; color: #191a1b; }
#film_detail .get_back { height: 30px; position: absolute; top: 5px; left: 5px; border-radius: 50%; }
#film_detail .get_back img { width: 30px; display: inline-block; }
#film_detail .title { font-size: 17px; line-height: 44px; text-align: center; width: 100%; }

/*电影海报*/
#film_detail .poster { width: 100%; position: relative; }
#film_detail .poster .poster_background { width: 100%; background: rgb(249, 249, 249); height: 56vw;display: flex; justify-content: center; align-items: center; }
#film_detail .poster .poster_img { width: 100%; height: 56vw; opacity: 1; position: absolute; overflow: hidden; top: 0; align-items: center; justify-content: center;}
#film_detail .poster .poster_img img{ width: 100%; position: absolute; top: -75.6%; left: 0; }

/*电影信息*/
#film_detail .film_information { padding: 12px 15px 15px 15px; }
#film_detail .film_information .fiml_title { justify-content: flex-start; align-items: center; display: flex; }
#film_detail .film_information .fiml_title .film_name { width: 256px; color: #2c3e50; }
#film_detail .film_information .fiml_title .film_name .name { color: #191a1b; font-size: 18px; height: 27px; line-height: 27px; margin-right: 7px; display: inline-block; vertical-align: middle; }
#film_detail .film_information .fiml_title .film_name .item { font-size: 9px; color: #fff; background-color: #d2d6dc; height: 14px; line-height: 14px; padding: 0 2px; border-radius: 2px; display: inline-block; vertical-align: middle; }
#film_detail .film_information .fiml_title .film-grade { width: calc(100% - 250px); text-align: right; color: #ffb232; }
#film_detail .film_information .fiml_title .film-grade .grade { font-size: 18px; font-style: italic; }
#film_detail .film_information .fiml_title .film-grade .grade_text { font-size: 10px; }
#film_detail .film_information .film_text { font-size: 13px; color: #797d82; margin-top: 4px; }
#film_detail .film_information .film_content { height: 36px; overflow: hidden; margin-top: 12px; font-size: 13px; color: #797d82; transition: all .3s ease; }
#film_detail .film_information .drop_down { text-align: center; font-size: 16px; width: 100%; font-weight: 700; }

/*演员列表*/
#film_detail .actor_list { margin-top: 10px; }
#film_detail .actor_list .actor_list_title { width: 100%; padding: 15px; font-size: 16px; text-align: left; color: #191a1b; }
#film_detail .actor_list .actor_list_title .detail_player { height: 140px; background: rgb(255, 255, 255); }
#film_detail .actor_list .detail_player{ margin: 0px 16px 0px 16px; }
#film_detail .actor_list .detail_player .swiper-slide { width:85px; margin-right: 12px; text-align: center; font-size: 14px;}
#film_detail .actor_list .detail_player .swiper-slide .actor_img { width: 85px; height: 85px; overflow: hidden; position: relative; }
#film_detail .actor_list .detail_player .swiper-slide img{ width:100%; margin-bottom: 5px; position: absolute; top: -16px;}
#film_detail .actor_list .detail_player .swiper-slide .actor_name { padding-top: 10px; font-size: 12px; width: 85px; height: 18px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap }
#film_detail .actor_list .detail_player .swiper-slide .actor_role { text-align: center; font-size: 10px; color: #797d82; }

/*剧照列表*/
#film_detail .photos_list { margin-top: 10px; margin-bottom: 60px; background-color: #fff; }
#film_detail .photos_list .photos_title { height: 62px; width: 100%; padding: 15px; }
#film_detail .photos_list .photos_title .title { font-size: 16px; text-align: left; color: #191a1b; height: 22.5px; line-height: 22px; }
#film_detail .photos_list .photos_title .num { font-size: 13px; color: #797d82; float: right; display: inline-block; height: 22.5px; line-height: 22px; }
#film_detail .photos_list .stage_photos { height: 115px; margin: 0px 8px 0px 8px; }
#film_detail .photos_list .stage_photos .swiper-slide { width:150px; height: 100px; margin-right: 12px; }
#film_detail .photos_list .stage_photos .swiper-slide .stage_img { width: 100%; height: 100%;  overflow: hidden; position: relative; }
#film_detail .photos_list .stage_photos .swiper-slide img{ width:100%; margin-bottom: 5px; }

/*购票*/
#film_detail .buy_ticket { position: fixed; bottom: 0; left: 0; height: 49px; width: 100%;; text-align: center; background-color: #ff5f16; color: #fff; font-size: 16px; line-height: 49px; z-index: 9;}

/*整体页面进入效果*/
#film_detail.slide-enter-active { animation: 0.3s movieEnter; }
@keyframes movieEnter{
  0%{ transform: translateX(100%); }
  100%{ transform: translateX(0%); }
}
</style>
