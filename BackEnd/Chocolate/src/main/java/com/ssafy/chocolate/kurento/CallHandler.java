//package com.ssafy.chocolate.kurento;
//
//import com.google.gson.Gson;
//import com.google.gson.GsonBuilder;
//import com.google.gson.JsonObject;
//import com.ssafy.chocolate.common.exception.NoBuskingException;
//import com.ssafy.chocolate.kurento.service.BuskingManagingService;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.web.socket.TextMessage;
//import org.springframework.web.socket.WebSocketSession;
//import org.springframework.web.socket.handler.TextWebSocketHandler;
//
//import java.io.IOException;
//
//
//public class CallHandler extends TextWebSocketHandler {
//
//    public CallHandler(BuskingManagingService buskingManager) {
//        this.buskingManager = buskingManager;
//    }
//
//    private static final Logger log = LoggerFactory.getLogger(CallHandler.class);
//    private static final Gson gson = new GsonBuilder().create();
//
//    private final BuskingManagingService buskingManager;
//
//    @Override
//    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
//        JsonObject jsonMessage = gson.fromJson(message.getPayload(), JsonObject.class);
//        String type = jsonMessage.get("type").getAsString();
//        StringBuilder sb = new StringBuilder();
//        sb.append("Incoming Message from Session : {").append(session.getId()).append("} : {").append(jsonMessage).append("}");
//        log.debug(sb.toString());
//        switch (type) {
//            case "startBusking":
//                startBusking(session,jsonMessage);
//            case "joinBusking":
//                try {
//                    buskingManager.joinBusking(session, jsonMessage);
//                } catch (Exception e) {
//                    e.printStackTrace();
//                }
//                break;
//            case "leaveBusking":
//                break;
//            case "onIceCandidate":
//                break;
//
//
//            default:
//                break;
//
//        }
//
//        super.handleTextMessage(session, message);
//    }
//
//    public void startBusking(WebSocketSession session,JsonObject jsonMessage) throws IOException, NoBuskingException {
//        buskingManager.startBusking(session,jsonMessage);
//    }
//
//}
