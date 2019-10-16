const mongoose=require("mongoose");
//1、创建数据表架构schema
const lostSchema = mongoose.Schema({
    lostId:String,
    title:String,
    thumb:String,
    feature:Array,
    location:String,
    time:String,
    contact:String,
    detail:String,
    status:String,
    publisher:String,
    owner:String
});
/*
  {
    "lostId":"xw8ejsu6msg00000123456",
    "title": "钱包",
    "thumb": "wallet.png",
    "feature": ["粉红色"],
    "location": "33栋教学楼201教室",
    "time": "9月6号晚上",
    "contact": "18817222261",
    "detail":"里面有身份证和银行卡,失主请通过电话联系我",
	"status":"0",
	"publisher": "xw8ejsu6msg00000",
	"owner":" "xw8ejsu6msg00001"
  },
 */
//2、将schema编译成model
module.exports=mongoose.model('Lost', lostSchema);  //model 是我们构造 document 的 Class

//3、导出模型,以便再路由中使用

