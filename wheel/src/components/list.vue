<template>
  <div class='List'>
    <div v-for="(value,key) in listArr" :key='key'>
      <h6>{{key}}</h6>
      <div class="list-every" v-for='(item,index) in value' :key="index">
        <p>{{item.market_attribute.year}}款 {{item.car_name}}</p>
        <p>{{item.horse_power}}马力{{item.gear_num}}档{{item.trans_type}}</p>
        <p><span>指导价 {{item.market_attribute.official_refer_price}}</span><span>{{item.market_attribute.dealer_price_min}}起</span></p>
        <router-link tag="button" :to="{ path: '/Inquiry', query: { carId: item.car_id }}">
          询问底价
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'List',
    props: {
      listArr: {
        type: Object,
        default: []
      }
    }
  }
</script>
<style lang="scss">
  .List{
    width:100%;
    h6{
      width:100%;
      background:#f4f4f4;
      color:#999999;
      padding:5px 10px;
      font-weight:400;
    }
    .list-every{
      width:100%;
      border-bottom:solid 5px #f4f4f4;
      p{
        &:nth-child(1){
          padding: 10px 10px;
          font-size: 16px;
          line-height: 1;
          color: #3d3d3d;
        }
        &:nth-child(2){
          font-size: 14px;
          padding: 0 10px;          
          color: #bdbdbd;
        }
        &:nth-child(3){
          text-align:right;
          line-height:25px;
          span:nth-child(1){
            font-size:12px;
            color:#666;
          }
          span:nth-child(2){
            font-size:16px;
            color:red;
            margin:0 20px 0 10px;
          }
        }
      }
      button{
        border: none;
        border-top: 1px solid #eee;
        width: 100%;
        height:45px;
        font-size: 16px;
        color: #00afff;
        background: #fff;
        font-weight: 500;
      }
    }
  }
</style>