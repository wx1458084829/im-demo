<template>
  <div class="home">
    <el-input
      style="margin-top: 30px"
      v-model="toMsg"
      placeholder="请输入消息内容"
      clearable
    />
    <el-input
      style="margin-top: 30px"
      v-model="toUser"
      placeholder="请输入对方账号"
      clearable
    />
    <el-button style="margin-top: 30px" type="primary" @click="sendMessage()"
      >发送</el-button
    >
  </div>
</template>

<script>

import store from '@/store'
import router from '@/router'


export default {
  name: 'HomeView',
  data() {
    return {
      toMsg: "",
      toUser: "",
      imConn: {}
    }
  },
  mounted() {
    this.imConn = store.getters.getImConn;
    this.imConn.getRoster().then((res) => {
      console.log(res) // res.data > ['user1', 'user2']
    });
    this.imConn.listen({
      onTextMessage: function (message) {
        console.log(message);
      },    //收到文本消息
    })

  },
  methods: {
    sendMessage() {
      let id = this.imConn.getUniqueId();                 // 生成本地消息id
   
      let msg = new WebIM.message(this.toMsg, id);      // 创建文本消息
      // msg.set({
      //   msg: 'message content',                  // 消息内容
      //   to: this.toUser,                          // 接收消息对象（用户id）
      //   chatType: 'singleChat',                  // 设置为单聊
      //   ext: {
      //   },                                  //扩展消息
      //   success: function (id, serverMsgId) {
      //     console.log('send private text Success');
      //   },
      //   fail: function (e) {
      //     // 失败原因:
      //     // e.type === '603' 被拉黑
      //     // e.type === '605' 群组不存在
      //     // e.type === '602' 不在群组或聊天室中
      //     // e.type === '504' 撤回消息时超出撤回时间
      //     // e.type === '505' 未开通消息撤回
      //     // e.type === '506' 没有在群组或聊天室白名单
      //     // e.type === '501' 消息包含敏感词
      //     // e.type === '502' 被设置的自定义拦截捕获
      //     // e.type === '503' 未知错误
      //     console.log("Send private text error");
      //   }
      // });
      console.log(msg);
      this.imConn.send(msg);
    }
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