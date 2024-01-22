package com.ssafy.chocolate.kurento;

import com.google.gson.JsonObject;
import org.kurento.client.IceCandidate;
import org.kurento.client.WebRtcEndpoint;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;

public class UserSession {


    private static final Logger log = LoggerFactory.getLogger(UserSession.class);
    private final WebSocketSession session;
    private WebRtcEndpoint webRtcEndpoint;

    public UserSession(WebSocketSession session) {
        this.session = session;
    }

    public WebSocketSession getSession() {
        return session;
    }

    public WebRtcEndpoint getWebRtcEndpoint() {
        return webRtcEndpoint;
    }

    public void setWebRtcEndpoint(WebRtcEndpoint webRtcEndpoint) {
        this.webRtcEndpoint = webRtcEndpoint;
    }

    public void iceCandidate(IceCandidate iceCandidate) {webRtcEndpoint.addIceCandidate(iceCandidate);}

    public void sendMessage(JsonObject message) throws IOException {
        session.sendMessage(new TextMessage(message.toString()));
    }
}
