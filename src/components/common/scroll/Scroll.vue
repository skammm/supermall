<template>
    <div class="wrapper" ref="wrapper">
        <!--使用这个插件必须有一个包含所有组件的根元素-->
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props:{
    probeType:{
        type:Number,
        default:0
    },
    pullUpLoad:{
        type:Boolean,
        default:false
    }
  },
  data() {
    return {
        scroll:null
    };
  },
  
  mounted() {
      this.scroll = new BScroll(this.$refs.wrapper,{
          click:true,
          probeType:this.probeType,
          pullUpLoad:this.pullUpLoad
      })
      this.scroll.on('scroll',(position) => {
          this.$emit('scroll',position)
      })
      this.scroll.on('pullingUp',() => {
          this.$emit('pullingUp')
      }) 
  },
  methods:{
       scrollTo(x,y,time=300){
          this.scroll.scrollTo(x,y,time);
      },
      finishPullUp(){
          this.scroll.finishPullUp();
      },
      refresh(){
          this.scroll&&this.scroll.refresh();
      },
      getScrollY(){
         return this.scroll.y;
      }
  }
};
</script>
<style  scoped>
</style>