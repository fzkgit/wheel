<template>
  <div class="wrap">
    <section>
      <router-view></router-view>
    </section>
    <footer>
      <router-link  tag="span" to="/index/main/recommend" active-class="Sactive">首页</router-link>
      <router-link tag="span" to="/index/follow" active-class="Sactive">关注</router-link>
      <router-link tag="span" to="/index/more" active-class="Sactive"><img src="../assets/img/1.png" alt=""></router-link>
      <router-link tag="span" to="/index/message" active-class="Sactive">消息</router-link>
      <router-link tag="span" to="/index/myself" active-class="Sactive">我</router-link>
    </footer>
  </div> 
</template>

<script>
  import {mapState,mapActions,mapMutations} from 'vuex'
  export default {
    name:'Index',
    data(){
      return {
       
      }
    },
    computed: {
      ...mapState({
      })
    },
    methods: {
      ...mapActions({
      })
    }
  }
</script>

<style lang="scss">
  .wrap{
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    section{
      flex:1;
    }
    footer{
      width:100%;
      height:1rem;
      flex-shrink:0;
      display:flex;
      justify-content:space-around;
      align-items:center;
      background:#75706A;
      span{
        color:#C9C6C4;
        font-size:16px;
        line-height:45px;
        img{
          height:30px;
        }
        &:nth-child(3){
          border:none;
          display:flex;
          align-items:center;
        }
      }
      .Sactive{
        color:#fff;
        border-bottom:solid #fff 2px;
      }
    }
  }
</style>
