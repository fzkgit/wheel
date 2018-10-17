<template>
  <div class="wrap" ref='wrap'>
    <div class="MasterBrandList" ref="MasterBrandList">
      <div class="MasterBrandList-scroll">
        <div class="MasterBrandList-every" v-for="(value,key,index) in MasterBrandList" :key="index">
          <h6 :ref="'a'+index" @click='makeListHidden'>{{key}}</h6>
          <ul class="MasterBrandList-list">
            <li v-for="(item,idx) in value" :key="idx" v-on:click='sendIdToDetail(item.MasterID)'>
              <img :src="item.CoverPhoto" alt="">
              <span>{{item.Name}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="nav-list">
      <span @touchstart='touchstart(0,$event)'>#</span>
      <span v-for="(value,key,index) in MasterBrandList" :key="index"
            @touchstart='touchstart(index,$event)' 
            @touchmove='touchmove'>{{key}}</span>
    </div>
    <div :class="isShow?'makeList makeList-active':'makeList'"
         @touchstart.stop='makeListTouchstart' 
         @touchmove.stop='makeListTouchmove' 
         @touchend.stop='makeListTouchend' 
         ref='makeList'>
      <div class="makeList-every" v-for='(item,index) in MakeList' :key="index">
        <h6 @click='makeListHidden'>{{item.GroupName}}</h6>
        <ul class="makeList-list">
          <router-link tag="li" :to="{ path: '/Detail', query: { id: i.SerialID }}" v-for='(i,idx) in item.GroupList' :key="idx" >
            <img :data-src="i.Picture" alt="">
            <div class="right">
              <h5>{{i.AliasName}}</h5>
              <span>{{i.DealerPrice}}</span>
            </div>
          </router-link>
        </ul>
      </div>
    </div>
    <div :class='ishidden?"ishidden":""'><Loading/></div>
  </div> 
</template>

<script>
  import {mapState,mapActions,mapMutations} from 'vuex'
  import BScroll from 'better-scroll'
  import Loading from '../components/Loading'
  import {lazyLoad} from '../utils/lazyLoading'
  export default {
    name:'Index',
    data(){
      return {
        scroll:'',
        id:0,
        start:0,
        isShow:false,
        makeListId:0
      }
    },
    components: {
      Loading,
    },
    computed: {
      ...mapState({
        MasterBrandList: state => state.Index.MasterBrandList,
        MakeList: state => state.Index.MakeList,
        ishidden: state => state.Index.ishidden
      })
    },
    methods: {
      ...mapActions({
        masterBrandListAsync: 'Index/masterBrandListAsync',
        makeListAsync: 'Index/makeListAsync'
      }),
      useBScroll(){
        this.scroll = new BScroll(this.$refs.MasterBrandList,{
          click:true
        })
      },
      touchstart(id,e){
        this.id = id
        this.start=e.changedTouches[0].clientY
        this.scroll.scrollToElement(this.$refs['a'+id][0])
      },
      touchmove(e){
        /**
          * window.scrollTo(0,0)  页面直接可设滚动  滚动window  宽高及内容宽高不可定的情况下
          * document.scrollTo(0,0)  设置该容器滚动   滚动该容器  宽高可定 100%;内容不可定的情况下
          * (e.changedTouches[0].clientY-this.start)/e.target.clientHeight  下滑的盒子数量
        */
        let newID = this.id + parseInt((e.changedTouches[0].clientY-this.start)/e.target.clientHeight)
        if(newID<0){
          newID=0
        }
        if(newID>20){
          newID=20
        }
        this.scroll.scrollToElement(this.$refs['a'+newID][0])
      },
      sendIdToDetail(id){
        /**
          * 使用事件源  
          * 好处1：减少绑定次数 只绑定一次
          * 好处2：加载更多时 加载内容不必再绑定事件
        */
        this.makeListAsync(id)
        this.isShow = true
      },
      makeListHidden(){
        this.isShow = false
      },
      makeListTouchstart(e){
        /**
          *  this.$refs.wrap.offsetWidth-this.$refs.makeList.offsetWidth 侧边盒子距离页面的边距
          *  e.changedTouches[0].clientX-(this.$refs.wrap.offsetWidth-this.$refs.makeList.offsetWidth)  触摸处距离侧边盒子的边距
          *  (e.changedTouches[0].clientX-(this.$refs.wrap.offsetWidth-this.$refs.makeList.offsetWidth))/this.$refs.makeList.offsetWidth 触摸处距离侧边盒子的比例
        */
        this.makeListId = (e.changedTouches[0].clientX-(this.$refs.wrap.offsetWidth-this.$refs.makeList.offsetWidth))/this.$refs.makeList.offsetWidth
      },
      makeListTouchmove(e){
        let ProgressBar = (e.changedTouches[0].clientX-(this.$refs.wrap.offsetWidth-this.$refs.makeList.offsetWidth))/this.$refs.makeList.offsetWidth
        /**
          * ProgressBar-this.makeListId  前后比例相减 如果X轴左滑会>0 
          * this.$refs.makeList.style.transform=`translateX(${(ProgressBar-this.makeListId)*100+'%'})` 移动前后滑动增加比例
        */
        if(ProgressBar-this.makeListId>0){
          this.isShow = false        
          this.$refs.makeList.style.transform=`translateX(${(ProgressBar-this.makeListId)*100+'%'})`
        }      
      },
      makeListTouchend(){
        /**
        * 动画还原
        */
        this.$refs.makeList.style.transform=`translateX(100%)`
        this.isShow = false
      },
      jumpToDetail(e){
        /**
          *  木有用的操作
        */
        // let id = 0;
        // if(e.target.nodeName=="H5" || e.target.nodeName == "SPAN"){
        //   id =  e.target.parentNode.parentNode.dataset.id
        // }
        // if(e.target.nodeName=="IMG" || e.target.nodeName == "DIV"){
        //   id =  e.target.parentNode.dataset.id
        // }
        // if(e.target.nodeName=="LI"){
        //   id =  e.target.dataset.id
        // }
      }
    },
    mounted() {
      this.masterBrandListAsync()
      this.useBScroll()
    },
    updated() {
      lazyLoad('.makeList')
    },
  }
</script>

<style lang="scss">
  .wrap{
    width:100%;
    height:100%;
    position:relative;
  }
  .nav-list{
    position:absolute;
    z-index:1;
    right:15px;
    display:flex;
    flex-direction:column;
    top:0;
    height:100%;
    justify-content:center;
    align-items:center;
    span{
      height:20px;
    }
  }
  .MasterBrandList{
    width:100%;
    height:100%;
    overflow:hidden;
    .MasterBrandList-every{
      width:100%;
      h6{
        width:100%;
        background:#F3F3F3;
        color:#B3B4B5;
        height:25px;
        line-height:25px;
        padding-left:20px;
      }
      .MasterBrandList-list{
        width:100%;
        padding:0 20px;
        li{
          width:100%;
          border-bottom:solid 1px #DDDDDD;
          height:60px;
          display:flex;
          align-items:center;
          img{
            width:50px;
            margin-right:20px;
          }
        }
      }
    }
  }
  .makeList{
    position:absolute;
    z-index:2;
    height:100%;
    width:80%;
    top:0;
    right:0;
    background:#fff;
    overflow:hidden;
    overflow-y:auto;
    transform:translateX(100%);
    transition:all 0.2s;   
    .makeList-every{
      width:100%;
      h6{
        width:100%;
        background:#F3F3F3;
        color:#aaa;
        height:30px;
        line-height:30px;
        padding-left:20px;
      }
      .makeList-list{
        width:100%;
        padding:0 5px;
        li{
          width:100%;
          display:flex;
          align-items:center;
          border-bottom:solid 1px #ccc;
          padding:10px;
          img{
            width:40%;
            flex-shrink:0;
          }
          .right{
            flex:1;
            padding-left:5px;
            h5{
              width:100%;
              font-size:16px;
              font-weight:400;
              margin-bottom:5px;
            }
            span{
              color:#ff3737;
            }
          }
        }
      }
    }
  }
  .makeList-active{
    transform:translateX(0) !important;
  }
  .ishidden{
    display:none;
  }
</style>
