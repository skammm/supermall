<template>
   <div id="tab-bar">
      <slot></slot>
    </div>
</template>

<script>
export default {
  
  
  data() {
    return {
    };
  },

};
</script>
<style  scoped>
   #tab-bar{
  display: flex;
  text-align: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 13px;
  box-shadow: 0px -1px 1px rgba(100, 100,100, .1);
  background: #f6f6f6;
}

</style>