package com.ssafy.chocolate.kurento;

import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;

public interface BuskingManager {
//    ConcurrentHashMap<String, Busking> Buskers;

    BuskingImpl getBusking(String busker);
    void stopBusking(String busker) throws IOException;
    BuskingImpl startBusking(String busker, WebSocketSession session);
    UserSession joinBusking(String busker, String audience, WebSocketSession session);

}
