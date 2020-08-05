<template>
  <div class="cart">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" 
                      :itemInfo="item" 
                      :key="index"/>
    </scroll>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import CartListItem from './CartListItem';
import Scroll from 'common/scroll/Scroll' 

export default {
  name:'CartList',
  components:{
    CartListItem,
    Scroll
  },
  computed:{
    ...mapGetters(['cartList'])
  },
  activated(){
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
  .cart{
    height: 100vh;
    padding-top: 44px;
  }
  .content{
    height: calc(100% - 49px - 40px);
    overflow: hidden;
  }
</style>