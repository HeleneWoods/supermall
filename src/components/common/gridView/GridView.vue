<template>
  <div class="grid_view" ref="gridView">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:'GridView',
  props:{
    cols: {
		    type: Number,
        default: 2
      },
      hMargin: {
		    type: Number,
        default: 8
      },
      vMargin: {
		    type: Number,
        default: 8
      },
      itemSpace: {
		    type: Number,
        default: 8
      },
      lineSpace: {
		    type: Number,
        default: 8
      }
  },
  mounted(){
    setTimeout(this.autoLayout,20)
  },
  updated(){
    this.autoLayout()
  },
  methods:{
    autoLayout(){
      let gridEl=this.$refs.gridView;
      let children=gridEl.children

      // gridEl的内边距
      // 也就是children的外边距
      gridEl.style.padding=`${this.vMargin}px ${this.hMargin}px`
      let itemWidth=(gridEl.clientWidth-2*this.hMargin-(this.cols-1)*this.itemSpace)/this.cols;
      for(let i=0;i<children.length;i++){
        let item=children[i];
        // 设置子标签的宽度
        item.style.width=itemWidth+'px';
        // 设置子标签左右的间距
        if((i+1) % this.cols !== 0){
          item.style.marginRight=this.itemSpace+'px';
        }
        if(i>=this.cols){
          // 设置子标签上下的间距
          item.style.marginTop=this.lineSpace+'px'
        }
      }

    }
  }
}
</script>

<style scoped>
  .grid_view{
    display: flex;
    flex-wrap: wrap;
  }
</style>