package com.ssafy.chocolate.kurento;

import com.google.gson.JsonObject;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;

public interface BuskingManager {
//    ConcurrentHashMap<String, Busking> Buskers;

    BuskingImpl getBusking(String busker);
    void stopBusking(String busker) throws IOException;
    BuskingImpl startBusking(WebSocketSession session, JsonObject jsonMessage) throws Exception;
    UserSession joinBusking(WebSocketSession session,JsonObject jsonMessage);
    void leaveBusking(WebSocketSession session, JsonObject jsonMessage);

}
