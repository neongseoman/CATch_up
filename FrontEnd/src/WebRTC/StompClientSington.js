// StompClientSington.js
import * as StompJS from "@stomp/stompjs";
import * as SockJS from "sockjs-client";

function createStompClient() {
    const client = new StompJS.Client({
        brokerURL: "ws://127.0.0.1:8081/signal"
    });

    if (typeof WebSocket !== 'function') {
        client.webSocketFactory = function () {
            console.log("Stomp error sockjs is running");
            return new SockJS('http://127.0.0.1:8081/signal');
        };
    }

    client.onConnect = (frame) => {
        console.log(frame);

    };

    client.onStompError = (frame) => {
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
    };

    client.activate();

    return client; // 이게 나오면 안되긴해.
}

export const stompClient = createStompClient();
