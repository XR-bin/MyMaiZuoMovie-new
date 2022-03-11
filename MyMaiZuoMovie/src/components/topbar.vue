<template>
  <!-- 头部标题 -->
  <header id="header">
    <div class="header_left" @click="cityHandle">
      <span>{{$store.state.cityModule.cityName}}</span><i class="iconfont icon-xia"></i>
    </div>
    <div class="header_middle">
      <div>{{ title }}</div>
    </div>
    <div class="header_right">
      <i v-if="search_ico" class="iconfont icon-sousuo" @click="searchHandle"></i>
    </div>
  </header>
</template>

<script>
export default {
  name: 'topbar',
  props: {
    title: {
      type: String,
      default: ''
    },
    search_ico: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    cityHandle() {
      this.$router.push('/city')
    },
    searchHandle() {
      this.$router.push('/cinema/search')
    }
  }
}
</script>

<style scoped>
/*头部标题*/
#header { width: 100%; height: 40px; line-height: 40px; overflow: hidden; z-index: 100; top: 0; left: 0; display: flex; position: relative; position: sticky; top: 0px; background-color: #fff; }
#header .header_left { min-width: 15%; display: flex; justify-content: flex-start; align-items: center; margin-left: 15px; float: left; height: 40px; }
#header .header_left span { font-size: 13px; max-width: 58px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
#header .header_left i { font-size: 12px; }
#header .header_middle { text-align: center; color: #191a1b; flex: 1; overflow: hidden; text-overflow: ellipsis; text-overflow: ellipsis; white-space: nowrap; float: left; height: 40px; }
#header .header_middle div { text-align: center; font-size: 20px; }
#header .header_right { width: 15%; margin-right: 15px; align-items: center; text-align: right; height: 40px; float: left; }
#header .header_right i { font-size: 20px; }
</style>
