<template>
   <div class="cart-item">
       <div class="item-selector">
          <check-button :isChecked="product.checked" @click.native="checkClick"></check-button>
       </div>
       <div class="item-image">
           <img :src="product.image" alt="">
       </div>
       <div class="item-info">
           <div class="item-title">{{product.title}}</div>
           <div class="item-desc">{{product.desc}}</div>
           <div class="item-bottom">
               <div class="item-price">￥{{product.price}}</div>
               <div class="item-count">x{{product.count}}</div>
           </div>
       </div>
   </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
  name: 'CartListItem',
  data() {
    return {
       
    };
  },
  props:{
      product:{
          type:Object,
          default(){
              return {}
          }
      }

  },
  components:{
      CheckButton
  },
  methods:{
      checkClick(){
          this.product.checked = !this.product.checked;
      }
  }
};
</script>
<style  scoped>
    .cart-item{
        display: flex;
        padding: 5px;
        border-bottom: 1px solid #ccc;
    }

    .item-image img{
        width: 80px;
        height: 100px;
        display: block;
        border-radius: 5px;
    }
    .item-title,.item-desc{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    .item-bottom{
        display: flex;
    }
    .item-bottom .item-price{
        color: orangered;
        font-weight: 700;
    }
    .item-bottom .item-count{
        padding-left: 120px;
    }
    .item-desc{
        padding: 15px 0;
        font-size: 13px;
    }
    .item-info{
        padding:5px;
    }
    .item-selector{
        
        display: flex;
        justify-content: center;
        align-items: center
    }
</style>