<template>
  <div class="recommend" @click="heartChange">
    <div :class="heartShow?'heart heart-active':'heart'" ref='heart' v-for="(item,index) in arr" ::key="index">
      {{item}}
    </div>
    <h6>大多数人都等不到来日方长<br>只有乍然离场而已</h6>
    <div class="banner">
      <iframe frameborder="0" src="https://v.qq.com/txp/iframe/player.html?autoPlay=true&vid=w0357ptsfjx" allowFullScreen="true" allowtransparency class="video"></iframe>
    </div>
    <div class="box">
      <p>@一禅经典语录</p>
      <span>在合适的时间遇到合适的人是一种幸福。@抖音小助手#情感语录#一禅小和尚</span>
      <span>♪ @一禅经典语录创作</span>
      <div><img src="../../../assets/img/5.png" alt=""></div>
    </div>
    <Aside/>
    <Talk/>
    <span v-for="(item,index) in data" :key="index" :class="index==idx?'Barrage':'hidden'" :ref="index==idx?'Barrage':''">
      {{item.content}}{{Idx}}
    </span>
  </div>
</template>

<script>
  import Aside from '../../../components/Aside'
  import Talk from '../../../components/talk'
  import {mapState,mapActions,mapMutations} from 'vuex'
  export default {
    name: 'recommend',
    data() {
      return {
        firstClick: 0,
        heartShow: false,
        arr: [],
        idx: 0,
      }
    },
    components: {
      Aside,
      Talk
    },
    computed: {
      ...mapState({
        data:state => state.Index.data,
      }),
      Idx(){
        setInterval(()=>{
          this.idx ++
          if(this.idx>=this.data.length){
            this.idx = 0
          }
        },3000)
        return ''
      }
    },
    methods: {
      heartChange(e){
        var newData = +new Date
        if(newData-this.firstClick<400){
          this.heartShow = true
          this.arr.push('❤')
          let num = this.arr.length - 1
          this.$nextTick(()=>{
            this.$refs.heart[num].style.left = e.clientX - this.$refs.heart[num].getBoundingClientRect().width / 2 + 'px'
            this.$refs.heart[num].style.top = e.clientY - 45 - this.$refs.heart[num].getBoundingClientRect().height / 2 + 'px'
          })
          
        }else{
          this.firstClick = newData
        }
      },
      ChangeThePosition(){
        this.$refs.Barrage[0].style.top= Math.ceil(Math.random()*200+220) + "px"
      }
    },
    updated() {
      this.ChangeThePosition()
    },
  }
</script>

<style lang="scss">
  .recommend{
    width:100%;
    height:100%;
    display:flex;
    justify-content:center;
    flex-direction:column;
    position:relative;
    .Barrage{
      font-size:16px;
      color:#fff;
      position:absolute;
      animation:BarrageChange 3s linear;
      overflow:hidden;
      height:20px;
      top:20px;
      left:100%;
    }
    .hidden{
      display:none;
    }
    @keyframes BarrageChange {
      0% {
         left:100%;
      }
      100% {
         left:-100%;
      }
    } 
    .heart{
      position:absolute;
      background-image: -webkit-gradient(linear, left 0, right 0, from(red),to(blue));
      -webkit-background-clip: text; 
      -webkit-text-fill-color: transparent; 
      top:0;
      left:0;
      z-index:0;
      font-size:48px;
      opacity:0;
    }
    .heart-active{
      animation:heart 2s forwards;
      display:block;
    }
    @keyframes heart {
      0% {
          transform:scale(0.5) rotate(0);
          opacity:0;
      }
      20% {
          transform:scale(1.5) rotate(30deg);
          opacity:1;
      }
      80% {
          transform:scale(2) rotate(-30deg);
          opacity:1;
      }
      100% {
          transform:scale(1.5) rotate(0);
          opacity:0;
      }
    } 
    h6{
      font-size:28px;
      text-align:center;
      letter-spacing:2px;
      color:#010000;
      margin:10px 0;
    }
    .banner{
      width:100%;
      img{
        width:100%;
      }
    }
    .box{
      position:absolute;
      left:0;
      bottom:20px;
      color:#fff;
      padding-left:10px;
      span{
        width:65%;
        display:flex;
        margin:10px 0;
        font-size:16px;
      }
      div{
        position:absolute;
        right:15px;
        bottom:10px;
        img{
          width:40px;
          animation:change 4s linear infinite;
        }
        @keyframes change {
          0% {
              transform:rotate(0)
          }
          100% {
              transform:rotate(360deg)
          }
        } 
      }
    }
  }
  .video{
    width:100%;
    height:220px;
  }
</style>