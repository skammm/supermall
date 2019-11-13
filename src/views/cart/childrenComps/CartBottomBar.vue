<template>
  <div class="check-bar">
      <div class="check-content">
        <check-button :is-checked="isSelectAll" @click.native="checkClick"></check-button>
        <span >全选</span> 
        <div class="total-price">
          合计:￥{{totalPrice}}
       </div>
       <div class="calculate" @click="calcClick">
         去结算({{checkLength}})
       </div>
      </div>
      
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
  name: 'CartBottomBar',
  data() {
    return {
      cartList:this.$store.state.cartList
    };
  },
  components:{
    CheckButton
  },
  computed:{
    totalPrice(){
      return this.cartList.filter(item =>{
        return item.checked;
      }).reduce((pre,item) => {
        return pre + item.price*item.count;
      },0).toFixed(2)
    },
    checkLength(){
      return this.cartList.filter(item=>{
        return item.checked;
      }).length;
    },
     isSelectAll(){
       if(this.cartList.length === 0) return false;
      return this.cartList.every(item=>{
        return item.checked;
      });
    },
  },
  methods:{
    checkClick(){
      if(this.isSelectAll){
        this.cartList.forEach(item=>{
          item.checked = false
        })
      }else{
        this.cartList.forEach(item=>{
          item.checked = true
        })
      }
    },
    calcClick(){
      const some = this.cartList.some(item=>{
          return item.checked;
        })
        if(!some){
          this.$toast.show('请选择购买的商品',2000)
        }
    }
   
  }
 
   
};
</script>
<style  scoped>
  .check-bar{
    height: 40px;
    position: relative;
    background-color:#eee;
    
    
  }
  .check-content{
    height: 40px;
    display: flex;
    align-items: center;
    /* padding:10px; */
    padding-left: 25px;
     line-height: 40px;
  }
  .total-price{
    margin-left: 30px;
  }
  .calculate{
    margin-left: 30px;
    background: var(--color-high-text);
    height: 40px;
    color: white;
  }
  
</style>