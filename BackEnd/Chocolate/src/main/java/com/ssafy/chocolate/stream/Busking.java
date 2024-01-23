package com.ssafy.chocolate.stream;

import org.springframework.web.socket.WebSocketSession;

public interface Busking{

    UserSession join(String audience, WebSocketSession session);
    void leave(String audience);
    void broadCast();

}
