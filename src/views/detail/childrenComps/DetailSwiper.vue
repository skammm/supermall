<template>  
        <Swiper class="Swiper">
            <swiper-item v-for="(item,index) in topImages" 
            :key="index">
                <img :src="item" alt="">
            </swiper-item>            
        </Swiper> 
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper/index.js'
export default {
  name: 'DetailSwiper',
  data() {
    return {
    };
  },
  props:{
      topImages:{
          type:Array,
          default(){
              return []
          }
      }
  },
  components:{
      Swiper,
      SwiperItem
  }
};
</script>
<style  scoped>
.Swiper{
    height: 300px;
}
</style>