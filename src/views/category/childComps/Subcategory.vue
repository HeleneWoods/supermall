<template>
  <div class="subcate">
    <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="subcategories.list">
      <a class="item" :href="item.link" v-for="item in subcategories.list" :key="item.link">
        <img :src="item.image" alt="">
        <div class="item_text">{{item.title}}</div>
      </a>
    </grid-view>
  </div> 
</template>

<script>
import GridView from 'common/gridView/GridView';
export default {
  name:'Subcategory',
  components:{
    GridView
  },
  props: {
      subcategories: {
        type: Object,
        default() {
          return {}
        }
      }
    }
}
</script>

<style scoped>
  .item{
    text-align: center;
    font-size: 14px;
  }
  .item_text{
    margin-top: 15px;
  }
  .item img {
    width: 80%;
  }
</style>