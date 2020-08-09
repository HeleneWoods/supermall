<template>
  <div class="bottom_bar">
    <div class="check_content">
      <check-button class="check_button" 
                    :is-checked="isSelectAll"
                    @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算({{checkedLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'content/checkButton/CheckButton'
import {mapGetters} from 'vuex'
export default {
  name:'CarBottomBar',
  components:{
    CheckButton
  },
  computed:{
    ...mapGetters(['cartList']),
    totalPrice(){
      return '￥'+this.cartList.filter(item=>{
        return item.checked
      }).reduce((preValue,item)=>{
        return preValue+item.price*item.count
      },0).toFixed(2)
    },
    checkedLength(){
      return this.cartList.filter(item=>item.checked).length
    },
    isSelectAll(){
      if(this.cartList.length==0)return false
      // return !(this.cartList.filter(item=> !item.checked).length)
      return !(this.cartList.find(item=> !item.checked))
    }
  },
  methods:{
    checkClick(){
      if(this.isSelectAll){
        this.cartList.forEach(item => {
          item.checked=false
        })
      }else{
        this.cartList.forEach(item => {
          item.checked=true
        })
      }

    },
    calcClick(){
      if(!this.checkedLength){
        this.$toast.isShow('请选择购买的商品',2000)
      }
    }
  }
}
</script>

<style scoped>
  .bottom_bar{
    position: fixed; 
    bottom: 49px;
    display: flex;

    width: 100%;
    height: 40px;
    line-height: 40px;
    
    background-color: #eee;
    font-size: 14px;

  }
  .check_content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }
  .check_button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price{
    margin-left: 20px;
    flex: 1;
  }
  .calculate{
    width: 90px;
    background-color: red;
    color: #fff;
    text-align: center;
  }
</style>