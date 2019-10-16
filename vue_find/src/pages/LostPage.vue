<template>
  <van-tabs v-model="active">
    <van-tab title="我拾取的" name="find">
      <ul>
        <li v-for="(item,index) in findList" v-bind:key="index">
          <van-card :thumb="'http://localhost:3000/public/images/'+item.thumb">
            <div slot="title" id="title">
              失物名称：{{item.title}}
            </div>
            <div slot="desc">
              捡到地点：{{item.location}}
            </div>
            <div slot="desc">
              捡到时间：{{item.time}}
            </div>
            <div slot="tags">
              <van-tag v-for="desc in item.feature" plain  round type="danger">{{desc}}</van-tag>
            </div>
          </van-card>
        </li>
      </ul>
    </van-tab>
    <van-tab title="我丢失的" name="lost">
      <ul>
        <li v-for="(item,index) in lostList" v-bind:key="index">
          <van-card :thumb="'http://localhost:3000/public/images/'+item.thumb">
            <div slot="title" id="title">
              失物名称：{{item.title}}
            </div>
            <div slot="desc">
              捡到地点：{{item.location}}
            </div>
            <div slot="desc">
              捡到时间：{{item.time}}
            </div>
            <div slot="tags">
              <van-tag v-for="desc in item.feature" plain  round type="danger">{{desc}}</van-tag>
            </div>
          </van-card>
        </li>
      </ul>
    </van-tab>
  </van-tabs>
</template>

<script>
    import { Card, Tab, Tabs,Toast,CellGroup,Tag} from 'vant';
    import axios from "axios"
    export default {
        name: "LostPage",
        components:{
            [Card.name]:Card,
            [Tab.name]:Tab,
            [Tabs.name]:Tabs,
            [Tag.name]:Tag,
            [CellGroup.name]:CellGroup
        },
        data() {
            return {
                active: 'find',  //默认被选中标签
                findList:[],
                lostList:[]
            };
        },
        mounted:function(){
            let  userId=this.$store.state.loginUser.userId;
            axios.get("/losts/lost",{params:{userId:userId}}).then((response)=>{
                let userlosts=response.data.result;
                console.log(userlosts);
                this.findList=userlosts.filter((lost)=>
                    lost.publisher==this.$store.state.loginUser.userId
                );
                this.lostList=userlosts.filter((lost)=>
                    lost.owner==this.$store.state.loginUser.userId
                )
            }).catch((err)=>{
                console.log(err);
                Toast("加载失败，请稍后重试"+err)
            })
        }
    }
</script>

<style scoped>
  #title{
    font-size:1.2em

  }
  .van-card__content {
    text-align: left;
  }
  .van-cell-group{
    padding:10px;
  }
</style>
