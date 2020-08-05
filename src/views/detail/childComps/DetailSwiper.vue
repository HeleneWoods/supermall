<template>
  <swiper>
    <swiper-item class="swiper_item" v-for="item in topImages" :key="item">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'common/swiper'
export default {
  name:'DetailSwier',
  props:{
    topImages:{
      type:Array,
      default(){
        return[]
      }
    }
  },
  components:{
    Swiper, 
    SwiperItem
  }
}
</script>

<style scoped>
  .swiper_item{
    height: 300px;
    overflow: hidden;
  }
</style>