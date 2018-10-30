<template>
  <div class='login'>
    <div><span>用户名:</span><input type="text" placeholder='请输入您的用户名' v-model='name'></div>
    <div><span>密码:</span><input type="password" placeholder='请输入您的密码' v-model='password'></div>
    <div><span>手机号:</span><input type="number" placeholder='请输入您的手机号' v-model='phone'></div>
    <div><span>验证码:</span><input type="number" placeholder='请输入验证码' v-model='code'><button class='message' @click='sendMessage'>获取短信验证码</button></div>
    <button @click="Login">登陆</button>
  </div>
</template>

<script>
  import md5 from 'js-md5';
  export default {
    name: 'Login',
    data(){
      return {
        name: '',
        password: '',
        phone: '',
        code: ''
      }
    },
    methods: {
      Login() {
        if (!/[\u4e00-\u9fa5|\w]{2,12}/.test(this.name)){
          console.log('请输入正确的用户名');
          return;
        }
        if (!/\w{3,8}/.test(this.password)){
          console.log('请输入正确的密码');
          return;
        }
        if(!(/^1[34578]\d{9}$/.test(this.phone))){
          console.log("手机号码有误，请重填");
          return;
        }
        if(!(/^\d{6}$/.test(this.code))){
          console.log("请输入6位验证码");
          return;
        }
        var opts = {
            method:"POST",   //请求方法
            body:JSON.stringify({
                name: this.name,
                password: md5(this.password+"hello world"),
                phone: this.phone,
                code: this.code
            }),   //请求体
  　　　　　 headers: {
              'Accept': 'application/json',
      　　　　 'Content-Type': 'application/json'
    　　　　 },
        }
        fetch('/api/Login',opts)
        .then(res=>res.json())
        .then(body => {
          console.log(body)
        })
      },
      sendMessage(){
        if(!this.phone){
          console.log('请输入您的手机号')
          return;
        }
        if(!(/^1[34578]\d{9}$/.test(this.phone))){
          console.log('手机号有误，请重新输入')
          return
        }
        var opts = {
          method:"POST",   //请求方法
          body:JSON.stringify({phone:this.phone}),   //请求体
　　　　　 headers: {
            'Accept': 'application/json',
    　　　　 'Content-Type': 'application/json'
  　　　　 },
        }
        fetch('/api/sendSMS',opts)
        .then(res=>res.json())
        .then(body => {
          console.log(body)
        })
      }
    }
  }
</script>

<style lang="scss">
  .login{
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    padding:0 20px;
    position:fixed;
    top:0;
    left:0;
    background:#fff;
    z-index:999;
    div{
      width:100%;
      height:45px;
      display:flex;
      align-items:center;
      span{
        width:20%;
        text-align:center;
        flex-shrink:0;
      }
      .message{
        width:30%;
        background:#f4f4f4;
        height:30px;
        line-height:30px;
        font-size:12px;
        flex-shrink:0;
        padding:0;
        margin-left:10px;
        color:#000;
      }
      input{
        flex:1;
        height:30px;
        outline:none;
        padding-left:10px;
      }
      &:nth-child(4){
        input{
          width:40%;
        }
      }
    }
    button{
      width:100%; 
      height:45px;
      background:skyblue;
      outline:none;
      margin:20px 0;
      color:#fff;
      div{
        width:100%;
        display:flex;
        justify-content:center;
      }
    }
  }
</style>