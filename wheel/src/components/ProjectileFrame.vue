<template>
  <div class='ProjectileFrame'>
    <div class="alert">
      <div class="alert-top">
        <slot></slot>
      </div>
      <div class="alert-bottom">
        <span @click='changeAlertContent'>好的</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    name: 'ProjectileFrame',
    methods: {
      ...mapMutations({
        updataAlertContent:'Inquiry/updataAlertContent'
      }),
      changeAlertContent(){
        this.updataAlertContent()
      }
    }
  }
</script>

<style lang="scss">
  .ProjectileFrame{
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.6);
    position:fixed;
    top:0;
    left:0;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .alert{
    width:70%;
    border-radius:10px;
    background:#fff;
    overflow:hidden;
    .alert-top{
      width:100%;
      display:flex;
      justify-content:center;
      align-items:center;
      padding:20px 0;
    }
    .alert-bottom{
      width:100%;
      display:flex;
      justify-content:center;
      align-items:center;
      height:45px;
      color:#1481ff;
      border-top:solid 1px #ccc;
    }
  }
</style>