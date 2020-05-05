const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

// 设置跨域
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1');
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

// const db = require('./serve.json')
function login(){
   app.get('/login', (req, res) => {
    // res.send(db)
     MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("name");
        dbo.collection("user"). find({}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
             res.send(result)
             db.close();
            });
        });
    })
}
login()

app.use(bodyParser.urlencoded({extended: true}))  // 解析 urlencoded 格式
app.use(bodyParser.json())  // 解析 json 格式

app.post('/register', (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("name");
        var myobj = {UserName: req.body.Account, PassWord: req.body.PassWord};
        dbo.collection("user").insertOne(myobj, function(err, result) {
            if (err) throw err;
            console.log('插入成功')
            res.send(result)
            db.close();
        });
            
   });
});

app.use(express.static(path.join(__dirname, 'public')))

app.listen(8080, () => console.log('ok'))
// var server = app.listen(8080, function () {
 
//     var host = server.address().address
//     var port = server.address().port
   
//     console.log("应用实例，访问地址为 http://%s:%s", host, port)
   
//   })