<template>
  <div>
    <div class="avatar">
      <van-image  round width="5rem" height="5rem" src="../static/images/timg.jpg"/>
    </div>
    <van-cell-group>
      <van-cell title="用户名:" :value="this.$store.state.loginUser.username" />
    </van-cell-group>
  <van-cell-group>
    <van-cell title="个性签名:" :value="this.$store.state.loginUser.signature"  is-link  to="/users/signatureEdit" />
  </van-cell-group>
  <van-cell-group>
    <van-cell title="贝壳:" :value="this.$store.state.loginUser.stars"  />
  </van-cell-group>
    <van-button type="primary" @click="onLogout">退出账号</van-button>
  </div>
</template>

<script>
    import {  CellGroup,Cell,Image,Button  } from 'vant';
    import axios from "axios"
    export default {
        name: "MinePage",
        components:{
            [ CellGroup.name]: CellGroup,
            [Cell.name]:Cell,
            [Image.name]:Image,
            [Button.name]:Button
        },
        methods:{
            onEdit:function(){
                this.$router.push("/users/userEdit");
            },
            onLogout:function(){
                this.$store.state.loginUser=null;
                this.$router.push("/users/login");
            }
        }
    }
</script>

<style scoped>
.avatar{
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.van-button{
  margin:10px 0;
}
</style>
