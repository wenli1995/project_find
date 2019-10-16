<template>
  <div>
    <van-cell-group>
      <van-field v-model="title" required  label="失物名称" left-icon="send-gift-o" placeholder="请输入物品名称" />
      <van-field v-model="location" required  label="拾取地点" left-icon="location-o" placeholder="请输入拾取地点" />
      <van-field v-model="timeMsg" required  label="拾取时间" left-icon="clock-o" placeholder="请输入拾取时间" />
      <van-field v-model="contact" required  label="联系方式" left-icon="contact" placeholder="请输入联系方式" />
      <van-field v-model="feature" required  label="关键特征" left-icon="star-o" placeholder="请输入物品关键特征(英文逗号分隔)" />
      <van-field v-model="detail"  type="textarea"  rows="1" autosize required  label="详细描述" left-icon="notes-o" placeholder="请输入物品关详细描述" />
    </van-cell-group>
    <van-uploader v-model="imgList" multiple :max-count="1"  :after-read="afterRead"/>
    <div class="publish">
    <van-button type="primary" @click="submitPublish">发布</van-button>
    </div>
  </div>
</template>

<script>
    import axios from "axios"
    import {  Field,Button,CellGroup,Uploader,Toast,Image } from 'vant';
    import {genId} from "../util/util";
    export default {
        name: "PublishPage",
        components:{
            [Field.name]:Field,
            [Button.name]:Button,
            [CellGroup.name]:CellGroup,
            [Uploader.name]:Uploader,
            [Image.name]:Image
        },
        data:function(){
            return{
                title:'',  //失物名称
                location:'', //拾取地点
                timeMsg:'', //拾取时间
                contact:'', //联系方式
                feature:'', //关键特征
                detail:'', //详细描述
                imgList:[],//图片信息
            }
        },
        methods:{
            //将图片上传到服务器
            afterRead:function(file){
              //图片上传后，将file保存到本地static/images文件夹，然后将文件名作为提交到后台的JSON数据的一项
                //console.log(file);  //console.log输出file显示是一个对象，对象中还有一个file属性才有图片名信息
                /*console.log输出file显示是一个对象，会保存到imgList对象中，content属性保存文件本生，file属性保存文件信息*/

            },
            submitPublish:function(){
                //构造JSON数据
                //"thumb": "card.png",
                if(this.imgList.length==0){
                    Toast("请上传失物照片");
                    return;
                }
                let data={
                    "lostId":genId(20),
                    "title": this.title,
                    "feature": this.feature.split(","),
                    "location": this.location,
                    "time": this.timeMsg,
                    "contact": this.contact,
                    "detail":this.detail,
                    "status":"0",
                    "publisher":this.$store.state.loginUser.userId,
                    "owner":"",  //发布时失主没知
                    "thumb":{
                        name:this.imgList[0].file.name,
                        data:this.imgList[0].content.replace(/^data:image\/\w+;base64,/, '')
                    }
                }
                console.log("发布者:"+data.publisher);
                axios.post("/losts/publish",data).then((res)=>{
                    if(res.data.status=="0"){
                        Toast("发布成功");
                        //console.log(res.data.result);
                        //后台修改了用户积分，vuex中的用户数据也应该修改
                        let updateUserData={
                            userId:this.$store.state.loginUser.userId,
                            stars:this.$store.state.loginUser.stars+10
                        }
                        this.$store.dispatch("updateUserInfo",updateUserData);
                        this.$router.push("/losts/home");
                    }else{
                        Toast("发布失败");
                    }
                    //路由跳转到首页
                    //
                }).catch((err)=>{
                    Toast("发布失败"+err)
                })

            }
        }
    }
</script>

<style scoped>
  .van-uploader {
    top:10px;
    left: -80px;
  }
  .publish{
    margin:20px
  }
</style>
