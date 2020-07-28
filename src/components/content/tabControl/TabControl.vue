<template>
  <div class="tab_Control">
    <!-- 必须是“==”，只是“=”的话，class无效果 -->
    <div v-for="(item, index) in titles" 
    :key="item" class="tab_control_item" 
    :class="{active:index==currentIndex}" 
    @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'TabControl',
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      currentIndex:0
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex=index;
      this.$emit('tabClick',index)
    }
  }
}
</script>

<style scoped>
  .tab_Control{
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;

  }
  .tab_control_item{
    flex: 1;

  }
  .tab_control_item span{
    padding: 5px;
  }
  .active{
    color: var(--color-high-text);
  }
  .active span{
    border-bottom: 3px solid var(--color-high-text);

  }
</style>