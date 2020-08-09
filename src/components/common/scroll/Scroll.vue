<template>
  <div id="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name:'Srcoll',
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data(){
    return{
      scroll:null
    }
  },
  mounted(){
    this.scroll=new BScroll(this.$refs.wrapper,{
      click:true,
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad
    })
    // 监听滚动的位置
    if(this.probeType===2||this.probeType===3){
      this.scroll.on('scroll',(position)=>{
        this.$emit('scroll',position)
      })
    }
    // 监听scroll滚动到底部
    if(this.pullUpLoad){
      this.scroll.on('pullingUp',()=>{
        this.$emit('pullingUp')
      })
    }
  },
  methods:{
    scrollTo(x,y,time=300){
      this.scroll&&this.scroll.scrollTo&&this.scroll.scrollTo(x,y,time)
    },
    refresh(){
      this.scroll&&this.scroll.refresh()
    },
    finishPullUp(){
      this.scroll&&this.scroll.finishPullUp()
    }
  },
  watch:{
    data(){
      setTimeout(this.refresh,20)
    }
  }
}
</script>

<style scoped>

</style>