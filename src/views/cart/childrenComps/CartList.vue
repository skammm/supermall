<template>
   <div class="cart-list">
    <Scroll class="content" ref="scroll">
       
        <cart-list-item v-for="(item,index) in cartList" 
        :key="index" :product="item"></cart-list-item>
    </Scroll>   
   </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'
export default {
  name: 'CartList',
  data() {
    return {
    };
  },
  props:{
      cartList:{
          type:Array,
          default(){
              return []
          }
      }
  },
  components:{
       Scroll,
       CartListItem
  },
  activated(){
      this.$refs.scroll.refresh()
  }
};
</script>
<style  scoped>
  .cart-list{
      /* position: absolute;
      bottom: 109px;
      top:44px;
      left: 0;
      right: 0;
      overflow: hidden; */
      height: calc(100% - 44px - 49px - 50px) ;
      overflow: hidden;
  }
  .content{
      height: 100%;
      overflow: hidden;
  }
</style>