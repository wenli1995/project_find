<template>
  <div>
    <van-cell-group>
      <van-field v-model="username" required clearable label="用户名" placeholder="请输入用户名"/>
      <van-field v-model="password" required clearable type="password" label="登录密码" placeholder="请输入密码" />
      <van-field v-model="confirmPassword" required clearable type="password" label="重输密码" placeholder="请再次输入密码" />
      <van-field v-model="signature"  type="textarea"  rows="1" autosize  clearable label="个性签名" placeholder="请输入个性签名" />
    </van-cell-group>
    <van-button type="primary"  @click="handleRegister">提交</van-button>
    <van-button type="default" @click="handleCancel">取消</van-button>
  </div>
</template>

<script>
    import { Field,Button,Image,CellGroup,Toast } from 'vant';
    import axios from "axios"
    import {genId} from "../util/util"
    export default {
        name: "UserEditPage",
        components:{
            [Button.name]:Button,
            [Field.name]:Field,
            [Image.name]:Image,
            [CellGroup.name]:CellGroup,
        },
        data:function(){
            return{
                username:'',
                password:'',
                confirmPassword:'',
                signature:''
            }
        },
        methods:{
            handleCancel:function(){
               this.$router.go(-1);
            },
            handleRegister:function(){
                if(this.password!=this.confirmPassword){
                    Toast("两次输入密码不一致");
                    return;
                }
                let data={
                    userId:genId(12),
                    username:this.username,
                    password:this.password,
                    signature:this.signature,
                    stars:0
                }
                axios.post("/users/register",data).then((res)=>{
                    if(res.data.status=="0"){
                        Toast("注册成功");
                        this.$router.push("/users/login")
                    }else{
                        Toast("注册失败");
                    }

                }).catch((err)=>{
                    Toast("注册失败"+err);
                })
            }
        }
    }
</script>

<style scoped>
  .van-button{
    margin-top:2em;
    margin-left:2em;
  }
</style>
