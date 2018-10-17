<template>
  <div class='TypeImg' ref='TypeImg'>
    <div class="TypeImg-section" ref='TypeImg-section'>
      <p v-for='(item, index) in CategoryImgList.List' :key="index" @click="swiperChange(index)"><img :data-src="`${item.Url.replace('{0}', item.LowSize)}`"></p>
    </div>
    <div class="swiper" v-show="swiperIsShow" @click="swiperShow">
      <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for='(item, index) in CategoryImgList.List' :key="index"><img :src="`${item.Url.replace('{0}', item.HighSize)}`"></swiper-slide>
      </swiper>
      <p>{{currentId*1+1}}/{{CategoryImgList.Count}}</p>
    </div>
  </div>
</template>

<script>
  import {mapState,mapActions,mapMutations} from 'vuex'
  import {lazyLoad} from '../utils/lazyLoading'
  import {debounce} from '../utils/debounce'
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name: 'TypeImg',
    data(){
      return {
        pageId: 2,
        currentId: 0
      }
    },
    props: {
      SerialID: {
        type: Number,
        default: 0
      },
      ImageID: {
        type: Number,
        default: 0
      }
    },
    components: {
      swiper,
      swiperSlide
    },
    computed: {
      ...mapState({
        CategoryImgList: state => state.Imgs.CategoryImgList,
        swiperIsShow: state => state.Imgs.swiperIsShow,
        current: state => state.Imgs.current,
      }),
      swiperOption(){
        let that = this
        return {
          on: {
            slideChange: function(){
              if(this.activeIndex>that.CategoryImgList.List.length-3){
                that.sendCategoryImgList({SerialID:that.SerialID,ImageID:that.ImageID,Page:that.pageId})
              }
              that.currentId = this.activeIndex
            },
          },
        }
      },
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    updated() {
      lazyLoad('.TypeImg')
    },
    methods: {
      ...mapActions({
        sendCategoryImgList:'Imgs/sendCategoryImgList'
      }),
      ...mapMutations({
        updateswiperIsShow:'Imgs/updateswiperIsShow'
      }),
      ToScroll(){
        const height = this.$refs['TypeImg-section'].getBoundingClientRect().height - this.$refs['TypeImg'].getBoundingClientRect().height -20
        if(this.$refs['TypeImg'].scrollTop>height){
          this.sendCategoryImgList({SerialID:this.SerialID,ImageID:this.ImageID,Page:this.pageId})
          this.pageId = this.pageId + 1
        }
      },
      swiperChange(id){
        this.updateswiperIsShow()
        this.currentId = id
        this.swiper.slideTo(id, 1000, false)
      },
      swiperShow(e){
        if(e.target.nodeName!=="IMG"){
          this.updateswiperIsShow()
        }
      }
    },
    mounted() {
      let func = debounce(this.ToScroll, 150);
      this.$refs.TypeImg.addEventListener('scroll', func);
    },
  }
</script>

<style lang="scss">
  .TypeImg{
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    overflow-y:auto;
    left:0;
    .TypeImg-section{
      width:100%;
      display:flex;
      flex-wrap:wrap;
      background:#fff;
      p{
        width:100%;
        width:32%;
        margin:0 0.5%;
        position:relative;
        img{
          width:100%;
          height:100px;
        }
      }
    }
    .swiper{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,1);
      z-index: 99;
      display:flex;
      align-items:center;
      img{
        width:100%;
      }
      p{
        position:absolute;
        width:100%;
        bottom:10px;
        left:0;
        color:#fff;
        text-align:center;
      }
    }
  }
</style>