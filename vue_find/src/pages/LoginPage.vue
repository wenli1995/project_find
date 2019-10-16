<template>
  <div>
    <div class="logo">
    <van-image round width="6rem" height="6rem" src="../static/images/timg.jpg"/>
    </div>
  <van-cell-group>
    <van-field v-model="username" required clearable label="用户名" placeholder="请输入用户名"/>
    <van-field v-model="password" required clearable type="password" label="登录密码" placeholder="请输入密码" />
  </van-cell-group>
    <van-button type="primary" @click="onLogin">登录</van-button>
    <van-button type="default" @click="onRegister">注册</van-button>
  </div>
</template>

<script>
    import { Field,Button,Image,CellGroup,Toast } from 'vant';
    import axios from "axios"
    export default {
        name: "LoginPage",
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
            }
        },
        methods:{
            onLogin:function(){
              axios.get("users/login",{params:{
                  username:this.username
                }}).then((res)=>{
                  if(res.data.status=="0"&&res.data.result.length!=0){
                      //将用户信息保存在vuex中
                      let user=res.data.result[0];
                      this.$store.dispatch("setUserInfo",user);
                      this.$router.push("/losts/home")
                  }else{
                      Toast("登陆失败,请先注册");
                  }
                }).catch((err)=>{
                      Toast("登陆失败"+err)
                })
            },
            onRegister:function(){
                this.$router.push("/users/userEdit");
            }

        }
    }
</script>

<style scoped>
  .logo{
    margin-bottom: 2em;
  }
  .van-button{
    margin-top:2em;
    margin-left:2em;
  }
</style>
