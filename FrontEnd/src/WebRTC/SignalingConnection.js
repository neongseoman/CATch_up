// import SockJS from 'sockjs-client';
// import * as StompJS from '@stomp/stompjs';
//
// const messagePath = "/app/busking"
// // const socket = new SockJS("ws://127.0.0.1:8080")
// const stompClient = new StompJS.Client({
//     brokerURL:"ws://127.0.0.1:8080/busking"
// });
//
// export const pc = new RTCPeerConnection();
//
// const sendMessage = (message) =>{
//     stompClient.publish({
//         destination : messagePath+"/test",
//         body: message,
//         headers:{}
//     })
// }
//
// const broadCast = async () => {
//     console.log("방송 버튼 눌림")
//     sendMessage("hello world")
//     sendMessage("방송버튼 눌림")
//     pc.createOffer()
//         .then(sdp => pc.setLocalDescription(sdp))
//         .catch(error => console.log(error));
// }
//
// const stompInit = () => {
//     if ( typeof WebSocket !== 'function'){
//         console.log("no websocket")
//         stompClient.webSocketFactory = function (){
//             return new SockJS("ws://127.0.0.1:8080/busking")
//         }
//     }
//
//     stompClient.onConnect = function (frame) {
//         console.log(frame)
//         stompClient.subscribe("/audience", message =>
//             console.log(message))
//     }
//     stompClient.onStompError = function (frame) {
//         console.log('Broker reported error: ' + frame.headers['message'])
//         console.log('Additional details: ' + frame.body)
//     }
//
//     stompClient.activate()
// }
//
// const iceServerInit=()=>{
//     let iceServers = []
//
//     const urls = [
//         "stun.l.google.com:19302",
//         "stun1.l.google.com:19302",
//         "stun2.l.google.com:19302",
//         "stun3.l.google.com:19302",
//         "stun4.l.google.com:19302",
//         "stun.ekiga.net",
//         "stun.ideasip.com",
//         "stun.schlund.de",
//         "stun.stunprotocol.org:3478",
//         "stun.voiparound.com",
//         "stun.voipbuster.com",
//         "stun.voipstunt.com",
//         "stun.voxgratia.org"
//     ];
//     const turnServers = [
//         {
//             url: 'turn:numb.viagenie.ca',
//             credential: 'muazkh',
//             username: 'webrtc@live.com'
//         },
//         {
//             url: 'turn:192.158.29.39:3478?transport=udp',
//             credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
//             username: '28224511:1379330808'
//         },
//         {
//             url: 'turn:192.158.29.39:3478?transport=tcp',
//             credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
//             username: '28224511:1379330808'
//         },
//         {
//             url: 'turn:turn.bistri.com:80',
//             credential: 'homeo',
//             username: 'homeo'
//         },
//         {
//             url: 'turn:turn.anyfirewall.com:443?transport=tcp',
//             credential: 'webrtc',
//             username: 'webrtc'
//         }]
//
//     for (const url of urls) {
//         iceServers.push({urls: `stun:${url}`});
//         // 또는 TURN 서버를 사용하려면 "turn:${url}"과 같이 변경할 수 있습니다.
//     }
//     for (const server of turnServers) {
//         iceServers.push({
//             urls: server.url,
//             credential: server.credential,
//             username: server.username
//         });
//     }
//
//     return iceServers
// }