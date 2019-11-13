<template>
  <div id="app">
     <keep-alive exclude="Detail"><router-view></router-view></keep-alive>
     <main-tab-bar/>
  </div>
</template>
<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar'
export default {
  name:'app',
  components:{
   MainTabBar
  },
  data(){
    return{
      profileId:'qiqi'
    }
  }
}
</script>
<style>
@import 'assets/css/base.css';
</style>
