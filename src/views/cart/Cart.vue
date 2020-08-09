<template>
  <div id="cart">
    <nav-bar class="navbar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list ></cart-list>
    <!-- 底部汇总 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from 'common/navbar/NavBar';
import CartList from './childComps/CartList';
import CartBottomBar from './childComps/CartBottomBar';
import Scroll from 'common/scroll/Scroll';

import {mapGetters} from 'vuex'

export default {
  name:'Cart',
  components:{
    NavBar,
    CartList,
    CartBottomBar,
    Scroll
  },
  computed:{
    // 把getters直接转化成计算属性
    // 两种写法
    // ...mapGetters([
    //   'cartLength'
    // ])
    ...mapGetters({
      length:'cartLength'
    })
  }
}
</script>

<style scoped>
  #cart{
    height: 100vh;
  }
  .navbar{
    background-color: var(--color-tint);
    color: white;
    position: absolute;
    width: 100%;
  }
</style>