<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import 'swiper/swiper-bundle.min.css' // 引入swiper.css

export default {
  name: "filmSwiper"
}
</script>

<style>
</style>
