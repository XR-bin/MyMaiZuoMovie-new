<template>
  <div :class="swiperClass">
      <slot></slot>
  </div>
</template>

<script>
import Swiper from 'swiper/bundle'     // 引入的是swiper.js
import 'swiper/swiper-bundle.min.css'   // 引入swiper.css

export default {
  props: {
    // 需要new Swipe的类名
    swiperClass: {
      type: String,
      default: 'swiper-container'
    }
  },
  
  mounted() {
    new Swiper('.' + this.swiperClass, {
      slidesPerView: 'auto',
      freeMode: true,
      freeModeSticky: true
    })
  }
}
</script>

<style>
</style>
