<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-image"></slot></div>
    <div v-else><slot name="item-image-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
       
</template>

<script>
export default {
  
  components: {},
  props: {
      path:String,
      activeColor:{
          type:String,
          default:'red'
      }
  },
  data() {
    return {

    };
  },
 computed:{
     isActive(){
         return this.$route.path.indexOf(this.path) !== -1
     },
     activeStyle(){
         return this.isActive?{color:this.activeColor}:{}
     }
 },
 
  methods: {
      itemClick(){  
          if(this.$route.path!==this.path){
              this.$router.replace(this.path)
          }
      }
  },
  created() {},
  mounted() {}
};
</script>
<style  scoped>
.tab-bar-item{
  flex: 1;
  height: 49px;
}
img{
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-top: 3px;
}
</style>