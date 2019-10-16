var express = require('express');
var router = express.Router();
let mongoose = require("mongoose")
let User=require("../models/users")
/* GET users listing. */
router.get('/login', function(req, res, next) {
  console.log("登录参数"+req.query)
  console.log(req.query.username)
  User.find(req.query,function(err,user){
    if(err){
      res.json({
        status:"1",
        msg:err.message,
      })
    }else{
      console.log("登录用户："+user);
      res.json({
        status:"0",
        msg:"",
        result:user
      })
    }
  })
});
router.post('/register', function(req, res, next) {
  //console.log(req.body);
  let useritem=new User(req.body);
  useritem.save(function(err,user){
    if(err){
      res.json({
        status:"1",
        msg:err.message,
      })
    }else{
      res.json({
        status:"0",
        msg:"",
        result:user
      })
    }
  })
});
router.put("/signatureEdit",function(req,res,next){
  let data=req.body;
  console.log("signatureEdit"+data);
  //http://www.mongoosejs.net/docs/api.html#update_update,  update(查询条件，查改内容构成的对象，回调函数）
  User.update({userId:data.userId},{signature:data.signature},function(err,raw){
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
