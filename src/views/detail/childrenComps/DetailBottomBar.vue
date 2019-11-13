<template>
    <div class="bottom-bar">
        <div class="bar-item bar-left">
            <div>
                <i class="icon service"></i>
                <span>客服</span>
            </div>
            <div>
                <i class="icon shop"></i>
                <span>店铺</span>
            </div>
            <div>
                <i class="icon select"></i>
                <span>收藏</span>
            </div>
        </div>
        <div class="bar-item bar-right">
            <div class="cart" @click="addToCart">加入购物车</div>
            <div class="buy">购买</div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'DetailBottomBar',
  data() {
    return {
    };
  },
  methods:{
      addToCart(){
          this.$emit('addCart');
      }
  }
  
};
</script>
<style  scoped>
.bottom-bar{
  height: 49px;
  line-height: 49px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 10px;
  background: #fff;
  display: flex;
  font-size: 13px;
  text-align: center;
}
.bar-item{
  flex: 1;
  display: flex;
}
.bar-item div{
    flex: 1;
}
.bar-item .icon{
    display: block;
    width: 22px;
    height: 22px;
    margin:5px auto 3px;
    
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
}
.bar-left .service{
    background-position: 0 -54px;
}
.bar-left .shop{
    background-position: 0 -98px;
}
.bar-left span{
    display: block;
     
    margin-top:-15px
}
.bar-right .cart{
    background: yellow;
    font-size: 16px;
}
.bar-right .buy{
    background: var(--color-tint);
    font-size: 16px;
    color: white;
}


</style>