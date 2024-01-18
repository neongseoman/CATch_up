package com.ssafy.chocolate.kurento;

import com.google.gson.JsonObject;
import org.kurento.client.EventListener;
import org.kurento.client.IceCandidate;
import org.kurento.client.IceCandidateFoundEvent;
import org.kurento.client.WebRtcEndpoint;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;

public class UserSession {

    private static final Logger log = LoggerFactory.getLogger(UserSession.class);
    private final WebSocketSession socketSession;
    private WebRtcEndpoint webRtcEndpoint;
    private String userType;

    public UserSession(WebSocketSession socketSession, String userType) {
        this.socketSession = socketSession;
        this.userType = userType;
    }

    public WebSocketSession getSocketSession(){
        return socketSession;
    }

    public void sendMessage(JsonObject message) throws IOException {
        socketSession.sendMessage(new TextMessage(message.toString()));
    }
    public void setWebRtcEndpoint(WebRtcEndpoint webRtcEndpoint){
        this.webRtcEndpoint = webRtcEndpoint;
    }

    public WebRtcEndpoint getWebRtcEndpoint() {
        return webRtcEndpoint;
    }

    public void addIceCandidate(IceCandidate candidate){
        webRtcEndpoint.addIceCandidate(candidate);
    }
}
