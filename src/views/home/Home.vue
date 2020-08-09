<template>
<div id="home">
  <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
  <tab-control :titles="['流行','新款','精选']"
               @tabClick="tabClick"
               ref="tabControl1"
               class="tabControl" v-show="isTabFixed"/>
    
  <scroll class="content" ref="scroll" 
          :probe-type="3" 
          @scroll="contentScroll"
          :pull-up-load="true"
          @pullingUp="loadMore">
    <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control :titles="['流行','新款','精选']"
                  @tabClick="tabClick"
                  ref="tabControl2"/>
    <goods-list :goods="showGoods"></goods-list>
  </scroll>

  <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

</div>
</template>

<script>
import HomeSwiper from './childrenComps/HomeSwiper'
import RecommendView from './childrenComps/RecommendView'
import featureView from './childrenComps/featureView'

import NavBar from 'common/navbar/NavBar'
import TabControl from 'content/tabControl/TabControl'
import GoodsList from 'content/goods/GoodsList'
import Scroll from 'common/scroll/Scroll'

import {getHomeMultidata,getHomeGoods} from 'network/home'
import {itemListenerMixin,backTopMixin} from '@/common/mixin'


export default {
  name:'Home',
  components:{
    HomeSwiper,
    RecommendView,
    featureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll
  },
  mixins:[itemListenerMixin,backTopMixin],
  data(){
    return{
      banners:[],
      recommends:[],
      goods:{ 
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentType:'pop',
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0,
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  activated(){
    this.$refs.scroll.scrollTo(0,this.saveY)
    this.$refs.scroll.refresh()
  },
  deactivated(){
    // 保存Y值
    this.saveY=this.$refs.scroll.scroll.y
    
    // 取消全局事件的监听
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  },
  created(){
    // 1.请求多个数据
    this.getHomeMultidata()

    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')


  },
  mounted(){
    // 获取tabControl的offsetTop
    // 所有组件都有一个属性$el：用于获取组件中的元素
    // this.tabOffsetTop=this.$refs.tabControl.$el.offsetTop
  },
  methods:{
    // 事件监听相关
    tabClick(index){
      switch(index){
        case 0:
          this.currentType='pop'
          break
        case 1:
          this.currentType='new'
          break
        case 2:
          this.currentType='sell'
          
      }
      this.$refs.tabControl1.currentIndex=index;
      this.$refs.tabControl2.currentIndex=index;
    },
    contentScroll(position){
      // 判断backTop是否显示
      this.listenShowBackTop(position)
      
      //决定tabControl是否吸顶
      this.isTabFixed=(-position.y)>this.$refs.tabControl2.$el.offsetTop
      // console.log(this.$refs.tabControl2.$el.offsetTop);
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    swiperImgLoad(){
      this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop;
    },

    // 网络请求相关
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
      this.banners=res.data.banner.list;
      this.recommends=res.data.recommend.list;
    })
    },
    getHomeGoods(type){
      const page=this.goods[type].page+1
      getHomeGoods(type,page).then(res=>{
       this.goods[type].list.push(...res.data.list)
       this.goods[type].page+=1;
       
      //  完成上拉加载更多
      this.$refs.scroll.finishPullUp()
    })
    }
  }
}
</script>

<style scoped>
  #home{
    /* padding-top: 44px; */
    height: 100vh;
    /* position: relative; */
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;

    /* position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9; */
  }

  /* 这种写法也可以，但后续处理吸顶的效果不好 */
  /* .content{
    height: calc(100% - 93px);
    overflow: hidden;
  } */

  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tabControl{
    position: relative;
    z-index: 9;
  }
</style>