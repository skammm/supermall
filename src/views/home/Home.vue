<template>
    <div id="home">
       <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>        
       <tab-control :title="['流行','新款','精选']" 
                 @tabClick='tabClick' 
                 ref="tabcontrol1" class="tab-control" v-show="isTabFixed"></tab-control>
       <Scroll class="content" 
       ref="scroll" 
       :probe-type="3" 
       @scroll="contentScroll" 
       :pull-up-load="true" @pullingUp="loadMore">
        <home-swiper :banners="banners"
                     ref="hSwiper" @swiperImageLoad="swiperImageLoad"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view/>
        <tab-control :title="['流行','新款','精选']" 
                 @tabClick='tabClick' 
                 ref="tabcontrol2"></tab-control>
        <goods-list :goods="showGoods" ></goods-list>
       </Scroll>
       <back-top @click.native="backClick" v-show="isShow"/>
      
    </div>
</template>

<script>

import HomeSwiper from 'views/home/childrenComps/HomeSwiper'
import RecommendView from 'views/home/childrenComps/RecommendView'
import FeatureView from 'views/home/childrenComps/FeatureView'


import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backtop/BackTop'

import {
    getHomeMultidata,
    getHomeGoods
} from 'network/home'
import {debounce} from 'common/utils'
import {itemListenerMixin, backTopMixin} from 'common/mixin'
export default {
  name:'Home',
  mixins:[itemListenerMixin, backTopMixin],
  data() {
    return {
        banners:[],
        recommends:[],
        goods:{
            'pop':{page:0,list:[]},
            'new':{page:0,list:[]},
            'sell':{page:0,list:[]}
        },
        currentType:'pop',
       
        tabOffsetTop :0,
        isTabFixed:false,
        saveY:0,
        itemListener:null
    };
  },
  components:{
      
      HomeSwiper,
      RecommendView,
      FeatureView,
     
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      
  },
  computed:{
      showGoods(){
          return this.goods[this.currentType].list;
      }
  },
  created(){
      this.getHomeMultidata();
      //2.请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

     
  },
  mounted(){
       //事件总线(因为两个组件之间没有联系，涉及到非父子组件之间的通信)
     const refresh = debounce(this.$refs.scroll.refresh,300)
     this.itemListener = () => {
         refresh()
      }
     this.$bus.$on('itemImageLoad', this.itemListener);
  },
  activated(){
  
      this.$refs.scroll.scrollTo(0,this.saveY,10);
      this.$refs.scroll.refresh();
 },
  deactivated(){
      this.saveY = this.$refs.scroll.getScrollY();   
      
      this.$bus.$off('itemImageLoad',this.itemListener)
  },
  methods:{
      /*
       *网络请求相关
      */
      getHomeMultidata(){
          getHomeMultidata().then(res => {
   
         this.banners = res.data.data.banner.list;
  
         this.recommends = res.data.data.recommend.list;
    
      });
      },
      getHomeGoods(type){
          const page = this.goods[type].page+1;
          getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.data.list);
          this.goods[type].page += 1;
         
      })
      },
      /*
       *事件监听相关
      */
     
     tabClick(index){
         switch(index){
             case 0:
                 this.currentType = 'pop';
                 break;
             case 1:
                 this.currentType = 'new';
                 break;
             case 2:
                 this.currentType = 'sell';
                 break;
         }
         this.$refs.tabcontrol1.currentIndex = index;
         this.$refs.tabcontrol2.currentIndex = index;
     },
    //   backClick(){
    //       this.$refs.scroll.scrollTo(0,0,500);
    //   },
      contentScroll(position){
          this.isShow = -position.y >1000;
          this.isTabFixed = -position.y > this.tabOffsetTop;
      },
      loadMore(){
         
          this.getHomeGoods(this.currentType);
          //在用这个插件时一定要用这句，不然只会上拉加载一次
          this.$refs.scroll.finishPullUp();
      },
      swiperImageLoad(){
          this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop;
      }

  }

};
</script>
<style  scoped>
#home{
    /* padding-top:44px; */
    height: 100vh; 
    position: relative;
}
.home-nav{
    background: var(--color-high-text);
    color:#fff;
  
    
}

.content{

    overflow: hidden;
    position: absolute;
    top:44px;
    bottom:49px;
}
.tab-control{
    position: relative;
    z-index: 5;
}


</style>