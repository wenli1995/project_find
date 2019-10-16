let express = require('express');
let router = express.Router();
let mongoose = require("mongoose")
let fs=require('fs');
//1、导入Lost 模型
let Lost = require("../models/losts")


/*连接mongoose数据库可接受回调函数火返回promise
http://www.mongoosejs.net/docs/connections.html
mongoose.connect(uri, options, function(error) {
    // Check error in initial connection. There is no 2nd param to the callback.
});
// Or using promises
mongoose.connect(uri, options).then(
    () => { //ready to use. The `mongoose.connect()` promise resolves to undefined.  },
    err => { // handle initial connection error }
);
*/
//2、连接mongodb建立好的db_find数据库
mongoose.connect("mongodb://localhost:27017/db_find").then(
    () => {
        console.log("数据库连接成功")
    },
    (err) => {
        console.log("数据库连接失败"+err)
    });

/*Express的方法：http://www.expressjs.com.cn/4x/api.html#res.json
Sends a JSON response. This method sends a response (with the correct content-type)
that is the parameter converted to a JSON string using JSON.stringify().
 */
//3、进行数据库操作
//（1）查询所有失物信息  /losts/home
router.get('/home', function(req, res, next) {
    /*使用model方法操作数据库：增删改查文档
    http://www.mongoosejs.net/docs/api.html#Model
     */
    Lost.find({status:'0'},function (err, lostitems) {
        if (err) {
            res.json({
                status: "1",
                msg: err.message
            })
        } else {
            res.json({
                status: "0",
                msg: "",
                result:lostitems
            })
        }
    });
})
//查询拾到者和丢失者是登录者的记录
router.get('/lost', function(req, res, next) {
    /*使用model方法操作数据库：增删改查文档
    http://www.mongoosejs.net/docs/api.html#Model
     */
    console.log("/lost参数:"+req.query);
    let userId=req.query.userId;
    console.log(userId);
    //不能指定status是'0',因为找到失主后status会变成'1'
    Lost.find({$or:[{publisher:userId},{owner:userId}]},function (err, lostitems) {
        if (err) {
            res.json({
                status: "1",
                msg: err.message
            })
        } else {
            console.log(lostitems);
            res.json({
                status: "0",
                msg: "",
                result:lostitems
            })
        }
    });
})

/*（2）保存前端提交的失物信息 ,不需要解析器就解析出req.body /losts/publish,
在这里，不矜将失物信息保存到lists集合，还更改用户的积分数，分布一条失物信息积分加10
 */
router.post('/publish',function(req,res,next){
    const imgname=req.body.thumb.name;
    const imgdata=req.body.thumb.data;
    const dataBuffer = Buffer.from(imgdata, 'base64');  //将数据写入Buffer缓冲区
    fs.writeFile(__dirname+`/../public/images/`+imgname, dataBuffer, function(err) {
        if(err){
            console.log(err)
        }
    });//将图片保存在静态资源文件中
    req.body.thumb=imgname;   //数据表的thumb字段只保存文件名
    let lostitem=new Lost(req.body);
    console.log(lostitem);
    lostitem.save(function(err,lost){
        if (err) {
            console.log("insertLostErr"+err.message);
            res.json({
                status: "1",
                msg: err.message
            })
        } else {
            /*将失物信息保存在失物表里，保存成功后，根据发布者ID查找用户信息，查找成功则更改用户积分，三个步骤任一出错返回错误响应*/
            let User = require('../models/users');
            let userId=lostitem.publisher;
            console.log("publisher:"+userId);
            User.findOne({userId:userId},function(err,user){
                if(err){
                    console.log("findUserErr"+err.message);
                    res.json({
                        status: "1",
                        msg: err.message
                    })
                }else{
                    console.log("user:"+user);
                    let  stars=user.stars+10   //必须要用findOne函数而不能用find函数，因为find返回的可能是一个集合，使用
                    console.log("new user stars:"+stars);
                    User.update({userId:userId},{stars:stars},function(err,raw) {
                             if(err){
                                 console.log("updateUserErr"+err.message);
                                 res.json({
                                     status: "1",
                                     msg: err.message
                                 })
                             }else{
                                 res.json({
                                     status: "0",
                                     msg: "",
                                     result:"success"
                                 })
                             }
                    });
                }

            });

        }
    })


})

//3、修改失物信息
router.put('/comfirmOwner',function(req,res,next){
    let data=req.body;
    console.log("comfirmOwner"+data.owner);
    Lost.update({lostId:data.lostId},{status:data.status,owner:data.owner},function(err,raw){
        if(err){
            res.json({
                status:"1",
                msg:err.message,
            })
        }else{
            res.json({
                status:"0",
                msg:raw,
            })
        }
    })
})



module.exports = router;
