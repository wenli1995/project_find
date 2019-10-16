<template>
  <div class="editPanel">
  <div class="info">
    <div>
    <van-icon name="arrow-left" @click="handleCancel"/>
    <span >个性签名</span>
    </div>
    <van-button type="primary" size="small" @click="handleEdit">保存</van-button>
  </div>
  <van-divider />
    <van-field v-model="signature"/>
  </div>
</template>

<script>
  import {Icon,Button, Divider,Field,Toast,CellGroup} from "vant"
  import axios from "axios"
    export default {
        name: "SignatureEditPage",
        components:{
            [Icon.name]:Icon,
            [Button.name]:Button,
            [ Divider.name]: Divider,
            [Field.name]:Field,
            [CellGroup.name]:CellGroup
        },
        data:function(){
            return{
                signature:this.$store.state.loginUser.signature||''
            }
        },
        methods:{
            handleCancel:function(){
                this.$router.go(-1);
            },
            handleEdit:function() {
                let data={
                    userId:this.$store.state.loginUser.userId,
                    signature:this.signature
                }
                axios.put("/users/signatureEdit", data).then((res) => {
                    if (res.data.status == "0") {
                        Toast("修改成功");
                        //修改vuex 登录用户数据
                        this.$store.dispatch("updateUserInfo",data);
                        this.$router.push("/losts/mine");
                    } else {
                        Toast("修改失败");
                    }
                }).catch((err) => {
                    Toast("修改失败" + err);
                })
            }
        }

    }
</script>

<style scoped>
.editPanel .info{
  display: flex;
  justify-content: space-between;
}
  .editPanel{
    margin:10px
  }
  .van-cell{
    border-bottom: 1px solid #07C160
  }
</style>
