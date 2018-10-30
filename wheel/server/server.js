const express = require('express');
const SMSClient = require('@alicloud/sms-sdk');
const bodyParser = require('body-parser')
let app = express();

let mysql = require('mysql');
let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'using'
});

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});

app.post('/Login', bodyParser.json(),(req,res)=>{
    let {name,password,phone, code} = req.body;
    //查询手机号是否注册过
    connection.query(`select count(*) as num from user where phone=${phone}`, function (error, results, fields) {
        if (error) throw error;
        console.log('result...', results);
        if (results[0].num){
            //查询到数据，做登陆操作
            connection.query(`select phone_code.code as code, phone_code.status as status, phone_code.create_time as create_time from user,phone_code where user.phone=phone_code.phone
            and username="${name}" and password="${password}" and phone_code.phone=${phone} order by phone_code.create_time desc limit 1`, function (error, results, fields) {
                if(error) throw error
                console.log(results[0].code,code)
                if (results.status == 0){
                    res.json({
                        code: -1,
                        data: {},
                        msg: '登陆失败，验证码已失效'
                    })
                }else if((+new Date()) - results.create_time > 60*60*1000) {
                    res.json({
                        code: -2,
                        data: {},
                        msg: '登陆失败，请重新获取验证码'
                    })
                }else if(results[0].code != code*1){
                    res.json({
                        code: -3,
                        data: {},
                        msg: '登陆失败，验证码错误'
                    })
                }else{
                    connection.query(`update phone_code set status=0 where phone=${phone}`, function (error, results, fields) {
                    })
                    res.json({
                        code: 1,
                        data: {},
                        msg: '登陆成功'
                    })
                }
            })
        }else{
            // 做注册操作
            connection.query(`insert into user (username,password,phone,create_time) values("${name}","${password}",${phone},${+new Date()})`, function (error, results, fields) {
                if(error) throw error
                if (results.insertId){
                    res.json({
                        code: 1,
                        data: {},
                        msg: '注册成功'
                    })
                }else{
                    res.json({
                        code: -1,
                        data: {},
                        msg: '注册失败'
                    })
                }
            })
        }
    });
})

app.get('/', (req, res) => {
    res.json('hello world');
})
app.post('/sendSMS', bodyParser.json(), async (req, res) => {
    let code = Math.floor(Math.random()*899999)+100000
    try {
        let result = await sendSMS(req.body.phone,code);
        if (result==-2){
            res.json({
                code: -2,
                msg: '发送短信失败',
            })
        }else{
            connection.query(`insert into phone_code (phone,code, create_time) values(${req.body.phone},${code}, ${+new Date()})`, function (error, results, fields) {
                if(error) throw error
                if(results.insertId){
                    res.json({
                        code: 0,
                        msg: '发送短信成功'
                    })
                }else{
                    res.json({
                        code: -1,
                        msg: '存入数据库错误'
                    })
                }
            })
        }
    } catch (e) {
        res.json({
            code: -3,
            msg: '解析验证码出错'
        })
    }
});

function sendSMS(phone,data) {
    // ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
    const accessKeyId = 'omFtRkaRs3Xu0pTW'
    const secretAccessKey = 'a8LXFS3hXAU3vbtJqjEQh038j7iTDU'
    //初始化sms_client
    let smsClient = new SMSClient({
        accessKeyId,
        secretAccessKey
    })
    //发送短信
    return smsClient.sendSMS({
        PhoneNumbers: phone,
        // 必填: 待发送手机号。 支持以逗号分隔的形式进行批量调用， 批量上限为1000个手机号码,
        // 批量调用相对于单条调用及时性稍有延迟,
        // 验证码类型的短信推荐使用单条调用的方式； 发送国际 / 港澳台消息时， 接收号码格式为： 国际区号 + 号码， 如“ 85200000000”
        SignName: 'jasonandjay',
        // 必填: 短信签名 - 可在短信控制台中找到
        TemplateCode: 'SMS_144457028',
        // 必填: 短信模板 - 可在短信控制台中找到， 发送国际 / 港澳台消息时， 请使用国际 / 港澳台短信模版
        TemplateParam: `{"code":${data}}`
        // 可选: 模板中的变量替换JSON串,
        // 如模板内容为 "亲爱的${name},您的验证码为${code}" 时。
    }).then(function (res) {
        let {
            Code
        } = res
        if (Code === 'OK') {
            //处理返回参数
            return 0;
        }
        return -2;
    }, function (err) {
        console.log(err)
    })
}

app.listen(8091, () => {
    console.log('正在监听8091端口');
});