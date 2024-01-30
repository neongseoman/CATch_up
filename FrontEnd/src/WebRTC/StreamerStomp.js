import * as SockJS from 'sockjs-client';
import * as StompJS from '@stomp/stompjs';


// 이후에 중복 연결 확인해야함.
export const stompConnection = async (target)=>{
    console.log("연결 시도할게~")
    const client = new StompJS.Client({
        brokerURL: "ws://127.0.0.1:8080/signal"
    })

    if (typeof WebSocket !== 'function') {
        client.webSocketFactory =  function ()  {
            console.log("Stomp error sockjs is running")
            return new SockJS('http://127.0.0.1:8080/signal');
        };
    }

    client.onConnect = (frame) =>{
        console.log(frame);
        client.publish({
            destination:"/app/"+target,
            body:JSON.stringify({"test":"test"})
        })
    }

    client.onStompError = (frame) =>{
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
    }

    client.activate()
    return client
}
