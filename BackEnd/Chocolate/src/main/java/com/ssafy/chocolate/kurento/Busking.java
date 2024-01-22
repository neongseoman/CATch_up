package com.ssafy.chocolate.kurento;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.WebSocketSession;

public interface Busking{

    UserSession join(String audience, WebSocketSession session);
    void leave(String audience);
    void broadCast();

}
