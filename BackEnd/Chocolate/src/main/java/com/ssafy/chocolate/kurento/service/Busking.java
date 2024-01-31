package com.ssafy.chocolate.kurento.service;

import com.ssafy.chocolate.kurento.dto.UserSession;
import org.springframework.web.socket.WebSocketSession;

public interface Busking{

    UserSession join(String audience);
    void leave(String audience);
    void broadCast();

}
