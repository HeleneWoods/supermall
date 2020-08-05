<template>
  <div id="detail">
    <child-nav-bar class="detail_nav" @titleClick='titleClick' ref="nav"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
      <goods-list ref="recommend" :goods="recommend"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import ChildNavBar from './childComps/ChildNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo';
import DetailGoodsInfo from './childComps/DetailGoodsInfo';
import DetailParamInfo from './childComps/DetailParamInfo';
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'common/scroll/Scroll';
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail.js'
import GoodsList from 'content/goods/GoodsList'
import{itemListenerMixin,backTopMixin} from '@/common/mixin'
import {debounce} from '@/common/utils'
import {mapActions} from 'vuex'


export default {
  name:'Detail',
  components:{
    ChildNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  mixins:[itemListenerMixin,backTopMixin],
  data(){
    return{
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommend:[],
      themeTopYs:[],
      getThemeTopY:null,
      currentIndex:0,
    }
  },
  created(){
    // 保存传入的iid
    this.iid=this.$route.params.id

    // 根据iid强求详情数据
    getDetail(this.iid).then(res=>{
      const data=res.result
      // 获取顶部轮播图
      this.topImages=data.itemInfo.topImages
      // 获取商品信息
      this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      // 获取店铺信息
      this.shop=new Shop(data.shopInfo)
      // 获取商品详情数据
      this.detailInfo=data.detailInfo;
      //获取参数的信息
      this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
      // 获取评论信息
      if(data.rate.cRate !==0){
        this.commentInfo=data.rate.list[0]
      }

      // 第一次获取，值不对
      // 原因：this.$refs.params.$el还没有被渲染
      this.themeTopYs=[];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop-44)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44)

      // 第二次获取，值不对
      // 原因：图片没有机选在内
      this.$nextTick(()=>{
        // 最新的数据，DOM已经渲染出来
        // 但图片依然没有加载完(目前的offsetTop不包含图片)
        this.themeTopYs=[];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop-44)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44)
      })
    })

    // 请求推荐数据
    getRecommend().then(res=>{
      this.recommend=res.data.list
    })
  //  给getThemeTopY赋值
    this.getThemeTopY=debounce(()=>{
      this.themeTopYs=[];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop-44)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44)
      this.themeTopYs.push(Number.MAX_VALUE)
      // console.log(this.themeTopYs);
    },300)
  },
  mounted(){
    
  },
  updated(){
    
  },
  destroyed(){
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  },
  methods:{
    ...mapActions(['addCart']),
     // 监听详情图片加载完成
    imageLoad(){
      // console.log('----');
      this.refresh()
      this.getThemeTopY()
    },
    titleClick(index){
      // console.log(index);
      
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
    },
    contentScroll(position){
      // console.log(position);
      // 获取y值
      const positionY=-position.y
      // positionY和主题中值进行对比
      let length=this.themeTopYs.length
      for(let i=0;i<length-1;i++){
        // if(positionY>this.themeTopYs[parseInt(i)]&&positionY<this.themeTopYs[parseInt(i)+1]){
        //   console.log(i);
        // }

        // 普通方法
        // if(this.currentIndex!==i && ((i<length - 1 && positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1])||(i===length-1 && positionY>=this.themeTopYs[i]))){
        //   this.currentIndex=i;
        //   this.$refs.nav.currentIndex=this.currentIndex
        //   console.log(this.currentIndex);
        // }
        // hack方法
            if(this.currentIndex!=i&&(positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])){
              this.currentIndex=i;
              this.$refs.nav.currentIndex=this.currentIndex
              // console.log(this.currentIndex);
            }
      }
      
      // 是否显示回到顶部
      this.listenShowBackTop(position)
    },
    addToCart(){
      // 获取购物车需要展示的信息
      const product={}
      product.img=this.topImages[0];
      product.title=this.goods.title;
      product.desc=this.detailInfo.desc;
      product.price=this.goods.realPrice;
      product.iid=this.iid;

      // 将商品添加到购物车
      // promise用来确定进行的是添加商品还是产品数量的增加
      // 使用mapActions进行actions的映射
      // this.$store.commit('addCart',product)
      this.addCart(product).then(res=>{
        // this.show=true;
        // this.message=res;

        // setTimeout(() => {
        //   this.show=false;
        //   this.message='';
        // }, 1500);

        this.$toast.isShow(res)
      })

      // this.$store.dispatch('addCart',product).then(res=>{
      //   console.log(res);
      // })
    }
   
  }
}
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail_nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    height: calc(100% - 44px - 58px);
    overflow: hidden;
  }
</style>