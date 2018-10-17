<template>
  <div class='Imgs'>
    <div class="Imgs-header">
      <router-link tag="p" :to="{ path: '/Color', query: this.$route.query}" class="car-detail-banner">
        <span>颜色</span>
      </router-link>
      <router-link tag="p" :to="{ path: '/Carmoney' , query: this.$route.query}" class="car-detail-banner">
        <span>车款</span>
      </router-link>
    </div>
    <div v-if="ImageList.length===0" class='waitFor'>
      <img src="http://img5.imgtn.bdimg.com/it/u=1395960659,1372657650&fm=26&gp=0.jpg" alt="">
      <span>暂无数据,请重新选择</span>
    </div>
    <div class="Img-type-list">
      <ul v-for='(item,index) in ImageList' :key='index'>
        <li v-for='(i,idx) in item.List' :key='idx' style="" v-if="idx===1" @click='ImgAll(item.Id)'>
          <div class='Img-mask'>
            <span>{{item.Name}}</span>
            <span>{{item.Count}}张></span>
          </div>
          <img :src="`${i.Url.replace('{0}', i.LowSize)}`">
        </li>
        <li v-for='(i,idx) in item.List' :key='idx' style="" v-if="idx!==1">
          <img :src="`${i.Url.replace('{0}', i.LowSize)}`">
        </li>
      </ul>
    </div>
    <TypeImg v-show="isShow" :SerialID="this.$route.query.SerialID*1" :ImageID="ImageID"/>
  </div>
</template> 

<script>
  import { mapState, mapActions, mapMutations } from 'vuex'
  import TypeImg from '../components/TypeImg'
  export default {
    name: 'Imgs',
    data() {
      return {
        ImageID: 0
      }
    },
    components: {
      TypeImg
    },
    computed: {
      ...mapState({
        ImageList: state => state.Imgs.ImageList,
        isShow: state => state.Imgs.isShow
      }),
    },
    methods: {
      ...mapActions({
        sendImageList: 'Imgs/sendImageList',
        sendCategoryImgList: 'Imgs/sendCategoryImgList'
      }),
      ...mapMutations({
        updateIsShow: 'Imgs/updateIsShow'
      }),
      ImgAll(id){
        this.updateIsShow()
        this.ImageID = id
        this.sendCategoryImgList({SerialID:this.$route.query.SerialID,ImageID:id})
      }
    },
    mounted() {
      this.sendImageList(this.$route.query)
    },
  }
</script>

<style lang="scss">
  .Imgs{
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    overflow:hidden;
    .Imgs-header{
      width:100%;
      height:45px;
      display:flex;
      flex-shrink:0;
      justify-content:space-around;
      align-items:center;
      p{
        flex:1;
        text-align:center;
        border-right:solid 1px #ccc;
        &:nth-child(2){
          border:none;
        }
      }
    }
    .Img-type-list{
      flex:1;
      background:#f4f4f4;
      padding-top:10px;
      overflow-y:auto;
      ul{
        width:100%;
        display:flex;
        flex-wrap:wrap;
        li{
          width:100%;
          width:32%;
          margin:0 0.5%;
          position:relative;
          div{
            position:absolute;
            width:100%;
            height:100%;
            background:rgba(36,54,79,0.6);
            top:0;
            left:0;
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
            span{
              color:#fff;
            }
          }
          img{
            width:100%;
            height:100px;
          }
        }
      }
    }
    .waitFor{
      width:100%;
      display:flex;
      align-items:center;
      flex-direction:column;
      span{
        display:inline-block;
        line-height:45px;
      }
      img{
        width:100%;
      }
    }
  }
</style>