<template>
  <div class="Main">
    <header>
      <span><img src="../../assets/img/2.png" alt=""></span>
      <div class="box">
         <router-link tag="span" to="/index/Main/recommend">推荐</router-link>
         <router-link tag="span" to="/index/Main/city">北京</router-link>
      </div>
      <span><img src="../../assets/img/3.png" alt=""></span>
    </header>
    <div class="Main-section">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Main'
  }
</script>

<style lang="scss">
  .Main{
    width:100%;
    height:100%;
    background: linear-gradient(#A59A89, #F2E2C7 70% ,#A59A89);
    display:flex;
    flex-direction:column;
    header{
      width:100%;
      height:45px;
      display:flex;
      justify-content:space-between;
      align-items:center;
      >span{
        img{
          width:20px;
          margin:0 15px;
        }
      }
      .box{
        span{
          color:#fff;
          margin:0 5px ;
          font-size:16px;
        }
      }
    }
    .Main-section{
      flex:1;
    }
  }
</style>