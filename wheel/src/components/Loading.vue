<template>
  <div v-show="isShow" class='loading'>
    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539078424942&di=4a1449b6b67dbf6f910d67ae4a216102&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F011d14554251780000019ae94718a3.jpg" alt="">
  </div>
</template>
<script>
  export default {
    name: 'Loading',
    computed: {
      isShow(){
        return this.$store.state.showLoading
      }
    }
  }
</script>
<style lang="scss">
  .loading{
    width:100%;
    height:100%;
    overflow:hidden;
    background:rgba(0,0,0,0.8);
    display:flex;
    justify-content:center;
    align-items:center;
    position:fixed;
    top:0;
    left:0;
    z-index:999;
  }
</style>