package com.ssafy.chocolate.kurento.service;

import com.google.gson.JsonObject;
import com.ssafy.chocolate.kurento.dto.UserSession;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;

public interface BuskingManager {
//    ConcurrentHashMap<String, Busking> Buskers;

    BuskingService getBusking(String busker);
    void stopBusking(String busker) throws IOException;
    BuskingService startBusking(WebSocketSession session, JsonObject jsonMessage) throws Exception;
    UserSession joinBusking(WebSocketSession session, JsonObject jsonMessage);
    void leaveBusking(WebSocketSession session, JsonObject jsonMessage);

}
