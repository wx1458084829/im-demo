<template>
  <div class="home">
    <el-input v-model="user.username" placeholder="请输入账号" clearable />
    <el-input v-model="user.password" placeholder="请输入密码" clearable />
    <el-button type="primary" @click="login()">登录</el-button>
  </div>

  <div class="home">
    <el-input v-model="addUsername" placeholder="输入朋友账户名" clearable />
    <el-button type="primary" @click="addFriendFn()">添加朋友</el-button>
  </div>

  <div>
    <h3>来自{{addFriend.from}}--请求添加：{{addFriend.to}}({{addFriend.status}})</h3>
  </div>
</template>

<script>
import websdk from "easemob-websdk"
import { ElMessage } from 'element-plus'

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
      },
      // 添加朋友的朋友用户名
      addUsername: "",
      // 请求添加朋友的对象信息
      addFriend:{

      }
    }
  },


  methods: {
    async login() {
      this.conn = new websdk.connection(imConfig);
      this.conn.listen({
        //连接成功回调 
        onOpened: function () {
          console.log("连接成功");
        },
        //连接关闭回调
        onClosed: function () {
          console.log("链接关闭");
        },
        onTextMessage: function (message) { console.log(message); },    //收到文本消息
        onEmojiMessage: function (message) { console.log(message); },   //收到表情消息
        onPictureMessage: function (message) { console.log(message); }, //收到图片消息
        onCmdMessage: function (message) { console.log(message); },     //收到命令消息
        onAudioMessage: function (message) { console.log(message); },   //收到音频消息
        onLocationMessage: function (message) { console.log(message); },//收到位置消息
        onFileMessage: function (message) { console.log(message); },    //收到文件消息
        onCustomMessage: function (message) { console.log(message); },  //收到自定义消息
        onVideoMessage: function (message) {
          var node = document.getElementById('privateVideo');
          var option = {
            url: message.url,
            headers: {
              'Accept': 'audio/mp4'
            },
            onFileDownloadComplete: function (response) {
              var objectURL = WebIM.utils.parseDownloadResponse.call(conn, response);
              node.src = objectURL;
            },
            onFileDownloadError: function () {
              console.log('File down load error.')
            }
          };
          WebIM.utils.download.call(conn, option);
        },   //收到视频消息
        onPresence: function (message) { console.log(message); },       //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
        onRoster: function (message) { console.log(message); },         //处理好友申请
        onInviteMessage: function (message) { console.log(message); },  //处理群组邀请
        onOnline: function () { console.log(message); },                  //本机网络连接成功
        onOffline: function () { console.log(message); },                 //本机网络掉线
        onError: function (message) {
          ElMessage.error(message.message)
        },          //失败回调
        onBlacklistUpdate: function (list) {       //黑名单变动
          // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
          console.log(list);
        },
        onRecallMessage: function (message) { console.log(message); },      //收到撤回消息回调
        onReceivedMessage: function (message) { console.log(message); },    //收到消息送达服务器回执
        onDeliveredMessage: function (message) { console.log(message); },   //收到消息送达客户端回执
        onReadMessage: function (message) { console.log(message); },        //收到消息已读回执
        onCreateGroup: function (message) { console.log(message); },        //创建群组成功回执（需调用createGroupNew）
        onMutedMessage: function (message) { console.log(message); },       //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
        onChannelMessage: function (message) { console.log(message); },     //收到整个会话已读的回执，在对方发送channel ack时会在这个回调里收到消息
        onContactInvited: function (msg) { 
          this.addFriend = msg;
          console.log(msg);
        }, // 收到好友邀请
        onContactDeleted: function () { }, // 被删除时回调此方法
        onContactAdded: function () { }, // 增加了联系人时回调此方法
        onContactRefuse: function () { }, // 好友请求被拒绝
        onContactAgreed: function () { } // 好友请求被同意
      });

      let options = {
        user: this.user.username,
        pwd: this.user.password,
        appKey: imConfig.appKey
      };
      await this.conn.open(options);
    },
    /**
     * 添加朋友
     */
    async addFriendFn() {
      this.conn.addContact(this.addUsername, "添加个朋友！");
    }





  }
}
</script>

<style>
.home {
  width: 200px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 50px;
}
</style>