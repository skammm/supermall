<template>
    <div class="cart">
      <nav-bar class="nav-bar">
        <div slot="center">购物车({{cartLength}})</div>
      </nav-bar>
      <cart-list :cartList="getCartList"></cart-list>
      <cart-bottom-bar></cart-bottom-bar>
    </div>
    
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childrenComps/CartList'
import CartBottomBar from './childrenComps/CartBottomBar'
export default {
  name:'Cart',
  data() {
    return {
    };
  },
  components:{
    NavBar,
    CartList,
    CartBottomBar  
   
  },
  computed:{
    cartLength(){
      return this.$store.state.cartList.length
    },
    getCartList(){
      return this.$store.state.cartList
    }
  }

};
</script>
<style  scoped>
  .cart{
    height: 100vh;
  }
  .nav-bar{
    background: var(--color-tint);
    color:white;
  }
 
</style>