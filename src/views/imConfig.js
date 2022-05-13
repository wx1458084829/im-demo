import websdk from "easemob-websdk";
import { ElMessage } from 'element-plus';
import store from '@/store';
import router from '@/router';

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
};
export default (await import('vue')).defineComponent({
name: 'HomeView',
data() {
return {
conn: {},
// 登录用户的对象
user: {
username: "",
password: ""
}
};
},


methods: {
conSuccess() {
console.log("连接成功");
},
async login() {
this.conn = new websdk.connection(imConfig);

console.log(store.commit);

store.commit('initCoon', this.conn);

this.conn.listen({
//连接成功回调 
onOpened: this.conSuccess,
//连接关闭回调
onClosed: function () {
console.log("链接关闭");
},
onTextMessage: function (message) { console.log(message); },
onEmojiMessage: function (message) { console.log(message); },
onPictureMessage: function (message) { console.log(message); },
onCmdMessage: function (message) { console.log(message); },
onAudioMessage: function (message) { console.log(message); },
onLocationMessage: function (message) { console.log(message); },
onFileMessage: function (message) { console.log(message); },
onCustomMessage: function (message) { console.log(message); },
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
console.log('File down load error.');
}
};
WebIM.utils.download.call(conn, option);
},
onPresence: function (message) { console.log(message); },
onRoster: function (message) { console.log(message); },
onInviteMessage: function (message) { console.log(message); },
onOnline: function () { console.log(message); },
onOffline: function () { console.log(message); },
onError: function (message) {
ElMessage.error(message.message);
},
onBlacklistUpdate: function (list) {
// 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
console.log(list);
},
onRecallMessage: function (message) { console.log(message); },
onReceivedMessage: function (message) { console.log(message); },
onDeliveredMessage: function (message) { console.log(message); },
onReadMessage: function (message) { console.log(message); },
onCreateGroup: function (message) { console.log(message); },
onMutedMessage: function (message) { console.log(message); },
onChannelMessage: function (message) { console.log(message); },
onContactInvited: function (msg) {
this.addFriend = msg;
console.log(msg);
},
onContactDeleted: function () { },
onContactAdded: function () { },
onContactRefuse: function () { },
onContactAgreed: function () { } // 好友请求被同意
});

let options = {
user: this.user.username,
pwd: this.user.password,
appKey: imConfig.appKey
};
await this.conn.open(options);
router.push("main");
},
}
});
