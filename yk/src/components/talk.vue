<template>
  <div :class="isShow?'talk talkChange':'talk'">
    <div class="top">
      <span></span>
      <span>851条评论</span>
      <span @click="isShowChange">X</span>
    </div>
    <ul ref="ul">
      <div ref="Toscroll">
        <li v-for="(item,index) in data" :key="index">
          <img src="../assets/img/10.png" alt="">
          <div class="libox">
            <div class="left">
              <h4>@{{item.name}}</h4>
              <span>{{item.content}}</span>
              <span>{{item.time}}</span>
            </div>
            <div class="right">
              <span @click="numChange(index)" :class="item.isNumChange?'redColor':''">❤</span>
              <span>{{item.num}}</span>
            </div>
          </div>
        </li>
      </div>
    </ul>
    <div class="talk-bottom">
      <input type="text" placeholder="友爱评论，说点儿好听的~" ref="talk" @focus="newfocus" @blur="newblur">
      <span>@</span>
      <span>☺</span>
      <span v-show="isSendShow" @click="talkChange">✈</span>
    </div>
  </div>
</template>

<script>
  import {mapState,mapMutations,mapActions} from 'vuex'
  import {debounce} from '../utils/debounce'
  export default {
    name: 'talk',
    data(){
      return {
        isSendShow: false
      }
    },
    computed: {
      ...mapState({
        isShow:state => state.Index.isShow,
        data:state => state.Index.data
      })
    },
    methods: {
      ...mapActions({
        getData: 'Index/getData'
      }),
      ...mapMutations({
        updateIsShow: 'Index/updateIsShow',
        updateNum: 'Index/updateNum',
        updateNewData: 'Index/updateNewData'
      }),
      isShowChange() {
        this.updateIsShow()
      },
      numChange(id){
        this.updateNum(id)
      },
      talkChange(){
        if(!this.$refs.talk.value){
          alert("评论不能为空")
          return
        }
        let obj = {
          name: "无名氏",
          content: this.$refs.talk.value,
          num: 0,
          time: this.timestampToTime(+new Date),
          isNumChange: false
        }
        this.updateNewData(obj)
        this.$refs.talk.value = ""
      },
      Scroll(e){
        if(this.$refs.Toscroll.offsetHeight-this.$refs.ul.offsetHeight-20<this.$refs.ul.scrollTop){
          this.getData()
        }
      },
      newfocus(){
        this.isSendShow = true
      },
      newblur(){
        this.isSendShow = false
      },
      timestampToTime(timestamp) {
        var date = new Date(timestamp);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return Y+M+D+h+m+s;
      }
    },
    mounted() {
      this.getData()
      let func = debounce(this.Scroll, 150);
      this.$refs.ul.addEventListener('scroll', func);
    },
  }
</script>

<style lang="scss">
  .talk{
    width:100%;
    background:#2D2A23;
    position:absolute;
    bottom:-50px;
    left:0;
    border-radius:10px;
    height:0;
    overflow:hidden;
    transition:all 1s;
    .top{
      width:100%;
      height:40px;
      display:flex;
      justify-content:space-around;
      color:#6D6B68;
      align-items:center;
    }
    .talk-bottom{
      width:100%;
      height:45px;
      display:flex;
      background:#000;
      span{
        font-size:28px;
        color:#505052;
        margin:0 10px;
        flex-shrink:0;
      }
      .active{
        color:#fff;
      }
      input{
        flex:1;
        background:#000;
        outline:none;
        border:none;
        padding-left:20px;
        color:#999;
      }
    }
    ul{
      width:100%;
      height:360px;
      overflow-y:auto;
      li{
        width:100%;
        display:flex;
        align-items:center;
        padding-right:15px;
        img{
          width:10%;
          flex-shrink:0;
          margin:0 15px;
        }
        .libox{
          flex:1;
          border-bottom:solid 1px #505052;
          display:flex;
          justify-content:space-between;
          color:#EAE9E9;
          padding:10px 0;
          .left{
            h4{
              color:#979693;
              line-height:20px;
            }
            span{
              display:block;
              line-height:20px;
              &:nth-of-type(2){
                color:#979693;
                font-size:12px;
              }
            }
          }
          .right{
            width:10%;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            color:#505052;
            span:nth-child(1){
              font-size:25px;
            }
          }
        }
      }
    }
  }
  .talkChange{
    height:78%;
  }
  .redColor{
    color: red;
  }
</style>