<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" 
            class="title_item" 
            :key="item"
            @click="titleClick(index)"
            :class="{active:currentIndex==index}">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'common/navbar/NavBar'
export default {
  name:'ChildNabBar',
  components:{
    NavBar
  },
  data(){
    return{
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  methods:{
    titleClick(index){
      this.currentIndex=index
      this.$emit('titleClick',index)
    },
    backClick(){
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .title{
    display: flex;
    font-size: 13px;
  }
  .title_item{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
  .back img{
    vertical-align: middle;
    height: 20px;
    width: 20px;
  }
</style>