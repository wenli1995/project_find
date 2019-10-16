import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    loginUser:''
  },
  getters:{
  },
  mutations:{
    setUser:function(state,user){
      console.log("setUser:"+user.userId);
      state.loginUser=user;
    },
    updateUser:function(state,data){
      console.log("updateUser:"+data);
      let keys=Object.keys(data);
      console.log(keys);
      for(let i=1;i<keys.length;i++){
        //修改的data第一项是id.id不修改，故从第二项开始遍历
        state.loginUser[keys[i]]=data[keys[i]];
      }

    }
  },
  actions:{
    setUserInfo:function({commit},user){
      commit('setUser',user);
    },
    updateUserInfo:function({commit},data){
      //data是进包含id和被修改字段的对象，例如{ userId: 'xw8ejsu6msg00000', signature: '1234567' }
      commit('updateUser',data);
    }
  }
})
