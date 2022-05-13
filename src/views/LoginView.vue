<template>
  <div class="home">
    <el-input
      style="margin-top: 30px"
      v-model="user.username"
      placeholder="请输入账号"
      clearable
    />
    <el-input
      style="margin-top: 20px"
      v-model="user.password"
      placeholder="请输入密码"
      clearable
    />
    <el-button style="margin-top: 30px" type="primary" @click="login()"
      >登录</el-button
    >
  </div>
</template>

<script>
import websdk from "easemob-websdk"
import { ElMessage } from 'element-plus'
import store from '@/store'
import router from '@/router'
import { connCallBack } from "@/util/im-util"

const imConfig = {
  appKey: "1124220429165819#demo",
  isHttpDNS: true,
  isMultiLoginSessions: false,
  https: false,
  url: "http://im-api-v2.easemob.com/",
  apiUrl: "http://a1.easemob.com/",
  isAutoLogin: true,
  autoReconnectNumMax: 2,
  autoReconnectInterval: 3,
  delivery: true,
  useOwnUploadFun: false
}

export default {
  name: 'HomeView',
  data() {
    return {
      conn: {},
      // 登录用户的对象
      user: {
        username: "",
        password: ""
      }
    }
  },
  /**
   * 生命周期回调
   */
  unmounted() {
  },
  methods: {
    async login() {
      this.conn = new websdk.connection(imConfig);
      store.commit('initConn', this.conn);
      connCallBack.onOpened = () => {
        console.log("登录成功");
        router.push("/main")
      }
      this.conn.listen(connCallBack);
      let options = {
        user: this.user.username,
        pwd: this.user.password,
        appKey: imConfig.appKey
      };
      await this.conn.open(options);

    },
  }
}
</script>

<style>
.home {
  width: 200px;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  margin-top: 50px;
}
body {
  display: flex;
  justify-content: center;
}
</style>