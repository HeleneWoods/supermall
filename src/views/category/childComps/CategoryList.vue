<template>
  <scroll class="cate_list">
    <div class="categories">
      <div class="category_item" 
          v-for="(item, index) in categories" 
          :key="item.title"
          @click="categoriesClick(index)" 
          :class="{category_active: index===currentIndex}">
        {{item.title}}
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'common/scroll/Scroll'
export default {
  name:'CategoryList',
  components:{
    Scroll
  },
  props:{
    categories:{
      type:Array,
      default(){
        return[]
      }
    },
  },
  data(){
    return{
      currentIndex:0
    }
  },
  methods:{
    categoriesClick(index){
      this.currentIndex = index
      this.$emit('categoryClick',index)
    }
  }
}
</script>

<style scoped>
  .cate_list{
    background-color: #f6f6f6;
    height: 100%;
    width: 100px;
    box-sizing: border-box;
    overflow: hidden;
  }
  .category_item{
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }
  .category_active{
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
    color: var(--color-high-text);
    font-weight: 700;
  }
</style>