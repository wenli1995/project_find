<template>
  <div>
    <!--展示失物信息的列表-->
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
          <div slot="footer">
            <van-button type="default"  plain size="mini" @click="showDetail(item)">查看详情</van-button>
            <van-button type="primary"  plain size="mini" @click="findOwner(item)">我是失主</van-button>
          </div>
        </van-card>
        <!--注意这里使用vant组件将其啊户型变成v-bind:属性名形式以动态绑定数值-->
      </li>
    </ul>
    <!--展示详细信息的展出层-->
    <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
      <van-cell-group>
        <van-icon name="smile-o" />失物名称：{{list.title}}
      </van-cell-group>
      <van-cell-group>
        <div><van-icon name="smile-o" />联系方式：{{list.contact}}</div>
      </van-cell-group>
      <van-cell-group>
        <div><van-icon name="description" />失物详情：{{list.detail}}</div>
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script>
    import { Card,Toast,Button,Tag,Popup, Icon,Divider,CellGroup} from 'vant';
    import axios from "axios"
    export default {
        name: 'HomePage',
        components:{
            [Card .name]:Card,
            [Button .name]:Button,
            [Tag.name]:Tag,
            [Popup.name]:Popup,
            [ Icon.name]: Icon,
            [Divider.name]:Divider,
            [CellGroup.name]:CellGroup
        }, //声明Vant组件
        data:function() {
            return{
                lostList:[],//失物列表
                show:false , //展示详情的弹窗默认不显示
                list:{} ,//展示弹窗的同时传递奥查看详情的对象以便显示详情
            }
        },
        methods:{
            getLosts:function(){
                axios.get("/losts/home").then((response)=>{
                    this.lostList=response.data.result
                }).catch((err)=>{
                    console.log(err);
                    Toast("加载失败，请稍后重试")
                })
            },
            showDetail:function(list){
                //展示显示详情弹窗
                this.show=true;
                this.list=list;
            },
            findOwner(item){
                //点击“我是失主后”,lost记录的status由0（正常）变为1（失效），并且标记失主
                let data={
                    lostId:item.lostId,
                    status:1,
                    owner:this.$store.state.loginUser.userId
                }
                axios.put("losts/comfirmOwner", data).then((res) => {
                    if (res.data.status == "0") {
                        Toast("修改成功");
                        this.getLosts();   //页面只显示没找到失主的失物信息，所以需要重新加载数据
                    } else {
                        Toast("修改失败");
                    }
                }).catch((err) => {
                    Toast("修改失败" + err);
                })

            }
        },
        mounted () {
            this.getLosts();
        }
    }
</script>

<style scoped>
  ul li{
    margin-bottom: 10px;
  }
  #title{
    font-size:1.2em

  }
  .van-card__content {
    text-align: left;
  }
  .van-cell-group{
    padding:10px;
  }
  .van-popup{
    text-align: left;
  }
</style>
