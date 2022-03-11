<template>
  <div id="main">
    <div id="login">
      <!-- 登录栏 -->
      <div class="login_avatar">
        <img src="../../assets/img/p4.png" alt="" class="avatar_icon"/>
        <div class="register">立即登录</div>
      </div>

      <!-- 订单栏 -->
      <ul class="order">
        <li class="my_order">
          <img src="../../assets/img/p6.png" />
          <div>电影订单</div>
        </li>
        <li class="my_order">
          <img src="../../assets/img/p5.png" />
          <div>商品订单</div>
        </li>
      </ul>

      <!-- 功能栏 -->
      <div class="func_card">
        <img src="../../assets/img/p10.png" />
        <span>卖座券</span>
      </div>
      <div class="func_card">
        <img src="../../assets/img/p7.png" />
        <span>组合红包</span>
      </div>
      <div class="func_card">
        <img src="../../assets/img/p8.png" />
        <span>余额</span>
      </div>
      <div class="func_card">
        <img src="../../assets/img/p9.png" />
        <span>设置</span>
      </div>

      <!-- 底部导航栏 -->
      <Tabbar></Tabbar>
    </div>
  </div>
</template>

<script>
import Tabbar from '../../components/tabbar.vue'

export default {
  name: 'mine',
  components: {
    Tabbar
  }
}
</script>

<style scoped>
/**************************** 登录页面 ****************************/
#login { position: relative; top: 0; right: 0; left: 0; font-size: 15px; background: #f4f4f4; margin-bottom: 59px; }

/*登录栏*/
#login .login_avatar { text-align: center; margin-top: -44px; height: 200px; padding-left: 22px; padding-top: 64px; background: url(../../assets/img/p3.png); background-size: cover; align-items: center; color: #fff; display: flex;}
#login .login_avatar .avatar_icon { width: 63px; height: 63px; border-radius: 50%; margin-right: 20px; border: 2px solid #fff; }
#login .login_avatar .register { font-size: 16px; }

/* 订单栏 */
#login .order { width: 100%; margin: 0 auto; display: flex; text-align: center; font-size: 13px; height: 79px; background: #fff; margin-bottom: 10px; align-items: center; }
#login .order .my_order { position: relative; flex: 1; }
#login .order .my_order img { width: 26px; height: 26px; display: inline-block; }
#login .order .my_order div { color: #797d82;; }

/*功能栏*/
#login .func_card { position: relative; background: #fff; padding: 0 15px; height: 49px; display: flex; align-items: center; }
#login .func_card span { margin-left: 15px; color: #191a1b; flex: 1; display: block; }
#login .func_card img { width: 20px; height: 20px; display: block; }
</style>
