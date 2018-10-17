<template>
  <div class='Inquiry'>
    <div class="Inquiry-header">
      <span>可向多个商家咨询最低价，商家及时回复</span>
    </div>  
    <div class="Inquiry-detail"  @scroll='scroll'>
      <router-link tag="div" :to="{ path: '/Carmoney' , query: { SerialID: inquiryInfo.details.serial.SerialID}}" class="Inquiry-car">
        <span><img :src="inquiryInfo.details.serial.Picture" alt=""></span>
        <div class="Inquiry-car-middle">
          <h6>{{inquiryInfo.details.serial.AliasName}}</h6>
          <span>{{inquiryInfo.details.car_name}}</span>
        </div>
        <span>></span>
      </router-link>
      <div class="Inquiry-detail-info">
        <h5>个人信息</h5>
        <ul>
          <li><span>姓名</span><input type="text" placeholder='请输入您的真实的中文姓名' ref='name'></li>
          <li><span>手机</span><input type="text" placeholder='请输入您的真实的手机号码' ref='photo'></li>
          <li><span>城市</span><input type="text" :placeholder="ShowCity || cityInfo.CityName" @click="changeIshidden"></li>
        </ul>
        <div class="Inquiry-detail-button">
          <button ref='button' @click='changeAlert'>询最低价</button>
        </div>
      </div>
      <div class="Inquiry-detail-list">
        <h6>选择报价经销商</h6>
        <div class="Inquiry-detail-List">
          <ul>
            <li v-for="(item,index) in inquiryInfo.list">
              <input type="checkbox">
              <div class="Inquiry-detail-List-middle">
                <h5>{{item.dealerShortName}}</h5>
                <p>{{item.address}}</p>
              </div>
              <div class="Inquiry-detail-List-right">
                <span>{{parseInt(item.promotePrice)}}万</span>
                <span>售{{item.saleRange}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div :class='isHidden?"Province-active":""'><Province/></div>
    <button :class='isShowJump?"jump jump-active":"jump"' @click='changeAlert'>询最低价</button>
    <div :class='isShowAlertContent?"":"alertContent"'>
      <ProjectileFrame>
        <span>{{alertContent}}</span>
      </ProjectileFrame>
    </div>
  </div>
</template>

<script>
  import {mapState,mapActions,mapMutations} from 'vuex'
  import Province from '../components/Province'
  import ProjectileFrame from '../components/ProjectileFrame'
  export default {
    name:'Inquiry',
    data(){
      return {
        isShowJump:false,
        alertContent:''
      }
    },
    components: {
      Province,
      ProjectileFrame
    },
    computed: {
      ...mapState({
        cityInfo: state => state.Inquiry.cityInfo,
        inquiryInfo: state => state.Inquiry.inquiryInfo,
        isHidden: state => state.Inquiry.isHidden,
        ShowCity: state => state.Inquiry.ShowCity,
        isShowAlertContent: state => state.Inquiry.isShowAlertContent
      })
    },
    methods: {
      ...mapActions({
        sendCityInfo: 'Inquiry/sendCityInfo',
        sendInquiryInfo: 'Inquiry/sendInquiryInfo'
      }),
      ...mapMutations({
        updataisHidden: 'Inquiry/updataisHidden',
        updataCarId: 'Inquiry/updataCarId',
        updataAlertContent:'Inquiry/updataAlertContent'
      }),
      changeIshidden(){
        this.updataisHidden()
      },
      scroll(e){
        if(e.target.scrollTop > this.$refs.button.offsetTop + 20){
          this.isShowJump = true
        }else{
          this.isShowJump = false
        }
      },
      changeAlert(){
        if(!this.$refs.name.value){
          this.alertContent = '请输入您的真实的中文姓名'
        }else{
          if(!this.$refs.photo.value){
            this.alertContent = '请输入正确的手机号'
          }else{
            // fetch('/api/sendSMS')
            // .then(res => res.json()).then(body => {
            //     console.log('fetch...', body);
            // })
            var opts = {
                method:"POST",   //请求方法
                body:JSON.stringify({phone:this.$refs.photo.value}),   //请求体
      　　　　　 headers: {
                  'Accept': 'application/json',
          　　　　 'Content-Type': 'application/json'
        　　　　 },
            }
            fetch('/api/sendSMS',opts)
            .then(res=>res.json())
            .then(body => {
              this.alertContent = body.msg
            })
          }
        }
        this.updataAlertContent()
      }
    },
    mounted() {
      this.sendCityInfo()
      this.updataCarId(this.$route.query.carId)
      this.sendInquiryInfo({carId:this.$route.query.carId})
    }
  }
</script>

<style lang="scss">
  .Inquiry{
    width:100%;
    height:100%;
    overflow:hidden;
    .Inquiry-header{
      position:fixed;
      height: 30px;
      line-height: 30px;
      width: 100%;
      background: #79cd92;
      text-align: center;
      color:#fff;
      z-index: 99;
      top:0;
      left:0
    }
  }
  .Inquiry-detail{
    width:100%;
    height:100%;
    padding-top:30px;
    padding-bottom:50px;
    overflow-y:auto;
  }
  .Inquiry-car{
    width:100%;
    display:flex;
    padding:15px 10px;
    >span{
      &:nth-of-type(1){
        width:35%;
        height: 70px;
        box-sizing: border-box;
        overflow:hidden;
        border:solid 1px #ccc;
        display:flex;
        align-items:center;
        border-radius:10px;
        img{
          width:100%;
        }
      } 
      &:nth-of-type(2){
        width:20px;
        display:flex;
        justify-content:center;
        align-items:center;
      }
    }
    .Inquiry-car-middle{
      flex:1;
      margin:0 10px;
      display:flex;
      justify-content:space-around;
      flex-direction:column;
      h6{
        font-size:18px;
        font-weight:400;
      }
      span{
        font-size:16px;
        color:#333;
      }
    }
  }
  .Inquiry-detail-info{
    width:100%;
    h5{
      width:100%;
      height:25px;
      line-height:25px;
      padding-left:10px;
      background:#eee;
      color:#666;
      font-size:12px;
      font-weight:400;
    }
    ul{
      width:100%;
      padding:0 10px;
      li{
        width:100%;
        display:flex;
        justify-content:space-between;
        height:50px;
        align-items:center;
        border-bottom:solid 1px #ccc;
        span{
          font-size:16px;
        }
        input{
          background:none;
          border:none;
          text-align:right;
          font-size:16px;
          color:#000;
          outline:none;
          height:30px;
          padding-right:10px;
        }
      }
    }
    .Inquiry-detail-button{
      width:100%;
      display:flex;
      justify-content:center;
      button{
        font-size: .32rem;
        color: #fff;
        width: 80%;
        background: #3aacff;
        height: .7rem;
        border-radius: .1rem;
        outline:none;
        margin:15px auto;
      }
    }
  }
  .Inquiry-detail-list{
    width:100%;
    h6{
      width:100%;
      height:25px;
      line-height:25px;
      padding-left:10px;
      background:#eee;
      color:#666;
      font-size:12px;
      font-weight:400;
    }
  }
  .Inquiry-detail-List{
    width:100%;
    ul{
      width:100%;
      padding:0 10px;
      li{
        width:100%;
        display:flex;
        border-bottom:solid 1px #ccc;
        align-items:center;
        padding: 15px 0;
        justify-content:space-between;
        input{
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 2px solid #ccc;
          outline:none;
        }
        .Inquiry-detail-List-middle{
          flex:1;
          display:flex;
          flex-direction:column;
          justify-content:space-around;
          padding:0 10px;
          h5{
            font-size:16px;
            font-weight:400;
            line-height:25px;
          }
          p{
            font-size:12px;
            color:#ccc;
          }
        }
        .Inquiry-detail-List-right{
          width:15%;
          display:flex;
          flex-direction:column;
          justify-content:space-around;
          span{
            width:100%;
            &:nth-child(1){
              line-height:25px;              
              color:red;
            }
            &:nth-child(2){
              color:#ccc;
              font-size:12px;
            }
          }
        }
      }
    }
  }
  .Province-active{
    display:none;
  }
  .jump{
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #3aacff;
    text-align: center;
    font-size: 18px;
    color: #fff;
    position:absolute;
    left:0;
    bottom:0;
    display:none;
  }
  .jump-active{
    display:block;
  }
  .alertContent{
    display:none;
  }
</style>