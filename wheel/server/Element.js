const express = require('express');
const SMSClient = require('@alicloud/sms-sdk');
const bodyParser = require('body-parser')
let app = express();

let mysql = require('mysql');
let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'element'
});

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});

app.get('/', (req, res) => {
    res.json('hello world');
})
app.post('/element', bodyParser.json(), (req, res) => {
    connection.query(`select * from user`, function (error, results, fields){
        if (error) throw error;
        res.json(results)
    })
});

app.listen(8888, () => {
    console.log('正在监听8888端口');
});