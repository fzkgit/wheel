<template>
  <div class="detail">
    <div class="car-detail">
      <div class="car-detail-content">
        <router-link tag="div" :to="{ path: '/Imgs', query: { SerialID: this.$route.query.id}}" class="car-detail-banner">
          <img :src="detailArr.CoverPhoto" alt="">
          <span>{{detailArr.pic_group_count}}张照片</span>
        </router-link>
        <div class="car-detail-info">
          <div class="car-detail-info-left">
            <p>{{detailArr.market_attribute.dealer_price}}</p>
            <p>指导价：{{detailArr.market_attribute.official_refer_price}}</p>
          </div>
          <div class="car-detail-info-right">
            <router-link tag="button" :to="{ path: '/Inquiry', query: { carId: carId}}">
              <button>{{detailArr.BottomEntranceTitle}}</button>
            </router-link>
          </div>
        </div>
        <div class="car-detail-list">
          <div class="car-detail-nav">
            <span v-for="(item,index) in keys" :key='index' :class="index===id?'span-active':''" @click='changeList(index)'>{{item}}</span>
          </div>
          <div class="car-detail-list-content">
            <List :listArr = 'listArr'/>
          </div>
        </div>
      </div>
      <router-link tag="div" :to="{ path: '/Inquiry', query: { carId: carId}}" class="car-detail-bottom">
        <p>询问低价</p>
        <p>本地经销商为你报价</p>
      </router-link>
    </div>
    <div :class='ishidden?"ishidden":""'><Loading/></div>
  </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
import Loading from '../components/Loading'
import List from '../components/list'
export default {
  name: 'Detail',
  components: {
    Loading,
    List
  },
  data(){
    return {
      id: 0
    }
  },
  computed: {
    ...mapState({
      detailArr: state => state.Detail.detailArr,
      ishidden: state => state.Detail.isHidden
    }),
    keys(){
      return Object.keys(this.detailArr.list).sort((a,b)=>{
        return a < b
      })
    },
    listArr(){
      return this.detailArr.list[this.keys[this.id]]
    },
    carId(){
      let arr = this.detailArr.BottomEntranceLink.split("/");
      let num = arr[arr.length-1]*1
      return num
    }
  },
  methods: {
    ...mapActions({
      getDetailArr: 'Detail/getDetailArr'
    }),
    changeList(i){
      this.id = i
    }
  },
  mounted() {
    this.getDetailArr(this.$route.query.id)
  },
}
</script>

<style lang="scss">
.ishidden{
  display:none;
}
.detail{
  width:100%;
  height:100%;
  overflow:hidden;
}
.car-detail{
  height:100%;
  width:100%;
}
.car-detail-content{
  width:100%;
  height:100%;
  padding-bottom:50px;
  overflow-y:auto;
  background:#f4f4f4;
  .car-detail-banner{
    width:100%;
    height:160px;
    overflow:hidden;
    display:flex;
    align-items:center;
    position:relative;
    img{
      width:100%;
    }
    span{
      background:rgba(0,0,0,0.6);
      color:#fff;
      position:absolute;
      left:78%;
      bottom:10%;
      font-size:12px;
      border-radius:10px;
      padding:2px 5px;
    }
  }
}
.car-detail-bottom{
  position: fixed;
  width: 100%;
  bottom: 0;
  left:0;
  z-index: 99;
  background: #3aacff;
  height: 50px;
  color: #fff;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
}
.car-detail-info{
  background:#fff;
  width:100%;
  display:flex;
  padding:15px 10px;
  justify-content:space-between;
  .car-detail-info-left{
    flex-shrink:0;
    p{
      color: silver;
      &:nth-child(1){
        font-size:18px;
        color:#f00;
        font-weight:500;
      }
    }
  }
  .car-detail-info-right{
    button{
      background: #00afff;
      color: #fff;
      border-radius: .1rem;
      font-size: .32rem;
      height: .7rem;
      width: 3.45rem;
      border: none;
      box-sizing: border-box;
    }
  }
}
.car-detail-list{
  margin-top:10px;
  width:100%;
  background:#fff;
  .car-detail-nav{
    width:100%;
    height:35px;
    display:flex;
    align-items:center;
    color:#000;
    span{
      font-size:16px;
      margin:10px;
    }
    .span-active{
      color:#3abeff;
    }
  }
}
</style>
