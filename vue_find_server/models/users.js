const mongoose=require("mongoose");
//1、创建数据表架构schema
const userSchema = mongoose.Schema({
    userId:String,
    username:String,
    password:String,
    signature:String,
    stars:Number
});

//2、将schema编译成model
module.exports=mongoose.model('User', userSchema);  //model 是我们构造 document 的 Class

//3、导出模型,以便再路由中使用

