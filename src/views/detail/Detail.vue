<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" 
    @titleClick="titleClick" ref="nav"/>
    <Scroll class="content" ref="scroll" 
    @scroll="contentScroll" :probe-type="3">
       <detail-swiper :top-images="topImages"></detail-swiper>
       <detail-base-info :goods="goods"></detail-base-info>
       <detail-shop-info :shop="shop"></detail-shop-info>
       <detail-goods-info :detail-info="detailInfo"
       @imageLoad="imageLoad"></detail-goods-info>
       <detail-param-info ref="params" :param-info="paramInfo"/>
       <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
       <goods-list ref="recommend" :goods="recommendList"></goods-list>
    
    
    
    </Scroll>
    <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
     <back-top @click.native="backClick" v-show="isShow"/>
  </div>
</template>

<script>
import DetailNavBar from './childrenComps/DetailNavBar'
import DetailSwiper from './childrenComps/DetailSwiper'
import DetailBaseInfo from './childrenComps/DetailBaseInfo'
import DetailShopInfo from './childrenComps/DetailShopInfo'
import DetailGoodsInfo from './childrenComps/DetailGoodsInfo'
import DetailParamInfo from './childrenComps/DetailParamInfo'
import DetailCommentInfo from './childrenComps/DetailCommentInfo'
import DetailBottomBar from './childrenComps/DetailBottomBar'

import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'


import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
import {itemListenerMixin, backTopMixin} from 'common/mixin'
import {debounce} from 'common/utils'
export default {
  name: 'Detail',
  mixins:[itemListenerMixin, backTopMixin],
  data() {
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommendList:[],
      itemListener:null,
      themeTopYs:[],
      getThemeTopY:null,
      currentIndex:0

    };
  },
  created(){
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then((res)=>{
   
     const data = res.data.result;
     this.topImages = res.data.result.itemInfo.topImages;
     this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
     this.shop = new Shop(data.shopInfo)
     this.detailInfo = data.detailInfo;
     this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
     if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
        
      }
     

    
    });
    getRecommend().then(res => {
        this.recommendList = res.data.data.list;
      
      });
      
      this.getThemeTopY = debounce(()=>{
       
        this.themeTopYs = [];
         this.themeTopYs.push(0);
       this.themeTopYs.push(this.$refs.params.$el.offsetTop)
       this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
       this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
       this.themeTopYs.push(Number.MAX_VALUE);
       console.log(this.themeTopYs)
      },800)
  },
  
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    Scroll,
    DetailBottomBar
    
  },
  methods:{
    imageLoad(){
      
       this.$refs.scroll.refresh();
      this.getThemeTopY();
   
      
    },
    titleClick(index){
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200);
    },
    contentScroll(position){
      const positionY = -position.y;
      const length = this.themeTopYs.length;
      for(var i=0;i<length-1;i++){
        if(this.currentIndex!=i&&positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1]){
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      this.isShow = -position.y >1000;

    },
    addCart(){
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      product.count = 0;
      this.checked = false;
      this.$store.dispatch('addCart',product).then(res=>{
          this.$toast.show(res)
      })
      
   
    }
  },
   mounted(){
       //这里利用了混入
       
       
  },
  destoryed(){
    this.$bus.$off('itemImageLoad',this.itemListener)
  }
  
};
</script>
<style  scoped>
#detail{
  position: relative;
  z-index: 9;
  background: #fff;
  height: 100vh;
}
.content{
   height: calc(100% - 44px); 
}
.detail-nav{
  position: relative;
  z-index: 9;
  background: #fff;
}

</style>