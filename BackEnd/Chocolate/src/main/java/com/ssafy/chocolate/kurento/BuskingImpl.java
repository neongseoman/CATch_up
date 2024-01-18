package com.ssafy.chocolate.kurento;


import com.google.gson.JsonObject;
import org.kurento.client.MediaPipeline;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.WebSocketSession;

import java.io.Closeable;
import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

public class BuskingImpl  implements Busking, Closeable {
    private final Logger log = LoggerFactory.getLogger(BuskingImpl.class);
    private final ConcurrentHashMap<String, UserSession> audiences = new ConcurrentHashMap<>();
    private UserSession userSession;
    private final String buskerName;
    private final MediaPipeline pipeline;

    public BuskingImpl(String buskerName, MediaPipeline pipeline, WebSocketSession session) {
        this.buskerName = buskerName;
        this.pipeline = pipeline;
        log.debug("Busking is Start!");
        BuskingOpen(session);
    }

    public String getBuskerName() {
        return buskerName;
    }

    public void BuskingOpen(WebSocketSession session){

        userSession = new UserSession(session);
    }

    @Override
    public UserSession join(String audience, WebSocketSession session) {
        UserSession userSession = new UserSession(session);
        audiences.put(audience,userSession);
        return userSession;

    }

    @Override
    public void leave(String audience) {
        if (!audiences.containsKey(audience)){
            log.debug("there is no audience");
            return;
        }
        audiences.remove(audience);
    }

    @Override
    public void broadCast() {

    }

    @Override
    public void close() throws IOException {
        JsonObject message = new JsonObject();
        message.addProperty("message","방송 종료됐어요~~");
        for (UserSession user : audiences.values()) {
            user.sendMessage(message);
        }

    }
}
