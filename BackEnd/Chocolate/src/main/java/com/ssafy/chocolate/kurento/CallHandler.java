package com.ssafy.chocolate.kurento;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import org.kurento.client.*;
import org.kurento.jsonrpc.JsonUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;


public class CallHandler extends TextWebSocketHandler {

    public CallHandler() {
        kurentoClient = KurentoClient.create();
    }

    private static final Logger log = LoggerFactory.getLogger(CallHandler.class);
    private static final Gson gson = new GsonBuilder().create();
//    private final ConcurrentHashMap<String, UserSession> viewersMap = new ConcurrentHashMap<>();
    //sessionId가 busker의 해쉬 Key값이다.
    private final ConcurrentHashMap<String, UserMap> buskerMap = new ConcurrentHashMap<>();

    private final KurentoClient kurentoClient;
    private IceCandidateState iceCandidateState;
    private MediaPipeline pipeline;

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        JsonObject jsonMessage = gson.fromJson(message.getPayload(), JsonObject.class);
        String iceState = jsonMessage.get("iceState").getAsString(); // onIceCandidate라면 onCandidate로 보내줘!!!
        String userType = jsonMessage.get("type").getAsString();
        StringBuilder sb = new StringBuilder();
        sb.append("Incoming Message from Session : {").append(session.getId()).append("} : {").append(jsonMessage).append("}");
        log.debug(sb.toString());
        switch (userType) {
            case "busker":
            case "audience":
                try {
                } catch (Exception e) {
                    e.printStackTrace();
                }
                break;
            case "stop":
                break;


            default:
                break;

        }

        super.handleTextMessage(session, message);
    }


    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        super.afterConnectionEstablished(session);
    }

    // presenter가 연결 끊으면 객체 소멸 시킴.
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        super.afterConnectionClosed(session, status);
    }
}
