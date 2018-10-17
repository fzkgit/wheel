<template>
  <div class='Carmoney'>
    <div class="Carmoney-header">
      <span>全部车款</span>
    </div>
    <div class="Carmoney-Detail">
      <div class="Carmoney-Detail-header">
        <span v-for="(item,index) in keys" :key='index' @click="changeChild(index)">{{item}}</span>
      </div>
      <div class='Carmoney-Detail-List'>
        <div class='Carmoney-Detail-List-every' v-for="(value,key) in ChildArr" :key="key">
          <h6>{{key}}</h6>
          <div v-for="(item,index) in value" :key="index" @click="carmoneyChange(item.car_id)">
            <p><span>{{item.car_name}}</span><span style="color:red">{{item.market_attribute.dealer_price_min}}万起</span></p>
            <p><span style="color:#ccc">{{item.horse_power}}马力{{item.gear_num}}档{{item.trans_type}}</span><span>指导价：{{item.market_attribute.official_refer_price}}</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex'
  export default {
    name: 'Carmoney',
    data(){
      return {
        id: 0
      }
    },
    computed: {
      ...mapState({
        Carmoney:state => state.Detail.Carmoney
      }),
      keys(){
        return Object.keys(this.Carmoney).sort((a,b)=>{
          return a < b
        })
      },
      ChildArr(){
        return this.Carmoney[this.keys[this.id]]
      }
    },
    methods: {
      ...mapActions({
        getDetailArr: 'Detail/getDetailArr'
      }),
      changeChild(id){
        this.id = id
      },
      carmoneyChange(id){
        this.$router.push({
          path:'/Imgs',
          query: Object.assign(this.$route.query,{
            CarID:id * 1
          })
        })
      }
    },
    mounted() {
      this.getDetailArr(this.$route.query.SerialID)
    },
  }
</script>

<style lang="scss">
  .Carmoney{
    width:100%;
    height:100%;
    background:#eee;
    padding-top:10px;
    display:flex;
    flex-direction:column;
    .Carmoney-header{
      width:100%;
      height:45px;
      flex-shrink:0;
      background:#fff;
      line-height:45px;
      text-align:center;
      span{
        color:#00afff;
        font-size:16px;
      }
    }
    .Carmoney-Detail{
      flex:1;
      padding-top:10px;
      .Carmoney-Detail-header{
        width:100%;
        height:40px;
        background:#fff;
        line-height:40px;
        span{
           margin: 0 20px;
        }
      }
      .Carmoney-Detail-List{
        width:100%;
        .Carmoney-Detail-List-every{
          width:100%;
          background:#fff;
          h6{
            background:#eee;
            padding:0 10px;
          }
          >div{
            padding:10px;
            border-bottom:solid 1px #ccc;            
          }
          p{
            width:100%;
            display:flex;
            justify-content:space-between;
          }
        }
      }
    }
  }
</style>