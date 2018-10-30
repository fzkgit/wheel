<template>
  <div class="Aside">
    <div><img src="../assets/img/6.png" alt=""></div>
    <div><img src="../assets/img/7.png" alt=""><span>3.7万</span></div>
    <div @click="isShowChange"><img src="../assets/img/8.png" alt=""><span>851</span></div>
    <div><img src="../assets/img/9.png" alt=""><span>1.1万</span></div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    name: 'Aside',
    methods: {
      ...mapMutations({
        updateIsShow: 'Index/updateIsShow'
      }),
      isShowChange() {
        this.updateIsShow()
      }
    }
  }
</script>

<style lang="scss">
  .Aside{
    position:absolute;
    right:0;
    margin-top:30px;
    div{
      text-align:center;
      margin:10px 0;
      img{
        width:35px;
      }
      span{
        width:100%;
        color:#fff;
        display:inline-block;
        text-align:center;
        font-size:12px;
      }
    }
  }
</style>