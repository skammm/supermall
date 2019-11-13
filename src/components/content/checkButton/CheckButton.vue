<template>
    <div class="check-button" :class="{check:isChecked}">
        <img src="~assets/img/cart/tick.svg" alt="">

    </div>
</template>

<script>
export default {
  name: 'CheckButton',
  data() {
    return {
    };
  },
  props:{
      isChecked:{
          type:Boolean,
          default:false
      }
  }

};
</script>
<style  scoped>
.check-button{
    border: 1px solid #ccc;
    border-radius: 50%;
    width: 20px;
    height: 20px;
}
.check{
    background: var(--color-high-text);
}
</style>