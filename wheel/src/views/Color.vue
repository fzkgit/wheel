<template>
  <div class='color'>
    <div class="color-header">
      <span>全部颜色</span>
    </div>
    <div>
      <div class="color-year">
        <span v-for='(item,index) in keys' :key="index" @click='renderChild(item)'>{{item}}</span>
      </div>
      <div class="color-item">
        <p v-for="(item,index) in redirectArr || renderArr" @click="DetermineTheColor(item.ColorId)"><span :style="`background:${item.Value}`"></span>{{item.Name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex'
  export default {
    name: 'color',
    data() {
      return {
        renderArr: [],
        redirectArr: ''
      }
    },
    computed: {
      ...mapState({
        ModelImageYearColor:state => state.Imgs.ModelImageYearColor
      }),
      keys(){
        return Object.keys(this.ModelImageYearColor).sort((a,b)=>{
          return a < b
        })
      }
    },
    methods: {
      ...mapActions({
        sendModelImageYearColor: 'Imgs/sendModelImageYearColor',
      }),
      renderChild(key){
        this.redirectArr = this.ModelImageYearColor[key]
      },
      DetermineTheColor(id){
        this.$router.push({
          path:'/Imgs',
          query:Object.assign(this.$route.query,{
            ColorID:id * 1
          })
        })
      }
    },
    updated() {
      this.renderArr = this.ModelImageYearColor[this.keys[0]]
    },
    mounted() {
      this.sendModelImageYearColor(this.$route.query.SerialID)
    },
  }
</script>

<style lang="scss">
  .color{
    width:100%;
    height:100%;
    background:#eee;
    padding-top:10px;
    .color-header{
      width:100%;
      height:45px;
      background:#fff;
      line-height:45px;
      text-align:center;
      span{
        color:#00afff;
        font-size:16px;
      }
    }
    .color-year{
      width:100%;
      height:40px;
      line-height:40px;
      display:flex;
      background:#fff;
      margin:10px 0;
      overflow-x:auto;
      box-sizing:border-box;
      span{
        width:20%;
        flex-shrink:0;
        text-align:center;
      }
    }
    .color-item{
      width:100%;
      background:#fff;
      display:flex;
      flex-wrap:wrap;
      p{
        width:44%;
        border:solid 1px #3aacff;
        margin:5px 3%;
        display:flex;
        align-items:center;
        font-size:18px;
        span{
          width:20px;
          height:20px;
          display:inline-block;
          margin: 5px 10px;
        }
      }
    }
  }
</style>