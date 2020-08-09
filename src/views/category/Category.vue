<template>
  <div class="category">
    <nav-bar class="category_nav">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="sub_content">
      <category-list :categories="categories"
                      @categoryClick="categoryClick"/>

      <scroll class="tab_content" :data="[categoryData]" ref="scroll">
        <subcategory :subcategories="showSub"/>
        <tab-control :titles="['综合','新品','销量']"
                      @tabClick="tabClick"/>
        <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from 'common/navbar/NavBar'
import Scroll from 'common/scroll/Scroll'
import TabControl from 'content/tabControl/TabControl'

import CategoryList from './childComps/CategoryList'
import Subcategory from './childComps/Subcategory';
import TabContentDetail from './childComps/TabContentDetail'

import {getCategory,getSubcategory,getCategoryDetail} from 'network/category'
import {itemListenerMixin} from '@/common/mixin'

export default {
  name:'Category',
  components:{
    NavBar,
    Scroll,
    TabControl,
    CategoryList,
    Subcategory,
    TabContentDetail
  },
  data(){
    return{
      categories:[],
      currentIndex:-1,
      categoryData:{},
      currentType:'pop'
    }
  },
  mixins:[itemListenerMixin],
  computed:{
    showSub(){
      // 不进行currentIndex判断进入页面时后台会报错，subcategories未定义
      // 大概因为刚进入页面没有进行任何点击，getSubcategory没有触发
      if(this.currentIndex==-1)return {}
      return this.categoryData[this.currentIndex].subcategories
    },
    showCategoryDetail(){
      if(this.currentIndex===-1)return []
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    }
  },
  created(){
    this.getCategory()
  },
  deactivated(){
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  },
  methods:{
    getCategory(){
      getCategory().then(res=>{
      this.categories=res.data.category.list
      // 数据结构
      for(let i=0;i<this.categories.length;i++){
        this.categoryData[i]={
          subcategories:{},
          categoryDetail:{
            'pop':[],
            'new':[],
            'sell':[]
          }
        }
      }
      this.getSubcategory(0)
    })
    },
    // 获取子分类
    getSubcategory(index){
      // 用currentIndex保存当前点击的index
      this.currentIndex=index
      // 网络请求需要传递maitKey来获取数据
      const maitKey=this.categories[index].maitKey
      getSubcategory(maitKey).then(res=>{
        this.categoryData[index].subcategories=res.data
        // 保存数据
        this.categoryData = {...this.categoryData}
        // console.log(this.categoryData[this.currentIndex].subcategories);
        this.getCategoryDetail('pop')
        this.getCategoryDetail('new')
        this.getCategoryDetail('sell')
      })
    },
      getCategoryDetail(type){
        let miniWallkey=this.categories[this.currentIndex].miniWallkey
        getCategoryDetail(miniWallkey,type).then(res=>{
          this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },
    categoryClick(index){
      // 监听分类的点击，进行网络请求，并将相应的index传入请求
      this.getSubcategory(index)
    },
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
          break
      }
    }
  }
}
</script>

<style scoped>
  .category{
    height: 100vh;
  }
  .category_nav{
    color: white;
    background-color: var(--color-tint);
    font-weight: 700;
  }
  .sub_content{
   position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }
  .tab_content{
    height: 100%;
    flex: 1;
    overflow: hidden;
  }

</style>