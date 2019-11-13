<template>
    <div>
        <ul>
          <li v-for="(item,index) in 300" :key="index">{{item}}</li>
        </ul>
    </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  watch: {},
  computed: {},
  methods: {},
 
  mounted() {}
};
</script>
<style  scoped>
img{
    max-width: 100%;
}
</style>