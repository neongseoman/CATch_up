package com.ssafy.chocolate.kurento;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import org.kurento.client.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;


public class CallHandler extends TextWebSocketHandler {

    public CallHandler(KurentoClient kurentoClient) {
        this.kurentoClient = kurentoClient;
    }

    private static final Logger log = LoggerFactory.getLogger(CallHandler.class);
    private static final Gson gson = new GsonBuilder().create();

    private final KurentoClient kurentoClient;
    private MediaPipeline pipeline;

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        JsonObject jsonMessage = gson.fromJson(message.getPayload(), JsonObject.class);
        String type = jsonMessage.get("type").getAsString();
        StringBuilder sb = new StringBuilder();
        sb.append("Incoming Message from Session : {").append(session.getId()).append("} : {").append(jsonMessage).append("}");
        log.debug(sb.toString());
        switch (type) {
            case "startBusking":
            case "joinBusking":
                try {
                } catch (Exception e) {
                    e.printStackTrace();
                }
                break;
            case "leaveBusking":
                break;
            case "onIceCandidate":
                break;


            default:
                break;

        }

        super.handleTextMessage(session, message);
    }

    public void startBusking(WebSocketSession session,JsonObject jsonMessage){
        String userId = jsonMessage.get("userId").getAsString();
//        BuskingManager.
    }

}
