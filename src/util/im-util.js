
export const connCallBack = {
        //连接成功回调 
        onOpened: () => {
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
          console.log(message)
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
}