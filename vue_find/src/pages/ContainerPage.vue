<template>
  <div>
  <router-view />

  <van-tabbar route  v-model="active" active-color="#07c160" inactive-color="#000">
    <van-tabbar-item replace to="/losts/home" name="home" icon="home-o">失物</van-tabbar-item>
    <van-tabbar-item replace to="/losts/publish" name="publish" icon="records">发布</van-tabbar-item>
    <van-tabbar-item replace to="/losts/lost" name="lost" icon="browsing-history-o">汇总</van-tabbar-item>
    <van-tabbar-item replace to="/losts/mine" name="mine" icon="manager-o" >我的</van-tabbar-item>
  </van-tabbar>
  </div>
</template>

<script>
    import { Tabbar, TabbarItem } from 'vant';
    export default {
        name: "ContainerPage",
        components:{
            [Tabbar.name]:Tabbar,
            [TabbarItem.name]:TabbarItem
        },
         data:function() {
            return {
                active: 'home'
            }
        }
    }
</script>

<style scoped>

</style>
