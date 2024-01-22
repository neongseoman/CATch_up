package com.ssafy.chocolate.kurento;


import com.google.gson.JsonObject;
import lombok.Getter;
import org.kurento.client.*;
import org.kurento.jsonrpc.JsonUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.Closeable;
import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;


@Getter
public class BuskingImpl implements Busking, Closeable {
    private final Logger log = LoggerFactory.getLogger(BuskingImpl.class);
    private final ConcurrentHashMap<String, UserSession> audiences = new ConcurrentHashMap<>();
    private final String buskerName;
    private final KurentoClient kurentoClient;
    private MediaPipeline buskerPipeline;
    private UserSession buskerSession;

    public BuskingImpl(String buskerName, WebSocketSession session, KurentoClient kurentoClient, JsonObject jsonMessage) throws IOException {
        this.buskerName = buskerName;
        this.kurentoClient = kurentoClient;
        log.debug("Busking is Start!");
        BuskingStart(session,jsonMessage);
    }

    public void BuskingStart(WebSocketSession session, JsonObject jsonMessage) throws IOException {
        buskerSession = new UserSession(session);
        buskerPipeline = kurentoClient.createMediaPipeline();
        buskerSession.setWebRtcEndpoint(new WebRtcEndpoint.Builder(buskerPipeline).build());

        WebRtcEndpoint webRtcEndpoint = buskerSession.getWebRtcEndpoint();
        webRtcEndpoint.addIceCandidateFoundListener(new EventListener<IceCandidateFoundEvent>() {

            @Override
            public void onEvent(IceCandidateFoundEvent iceCandidateFoundEvent) {
                JsonObject response = new JsonObject();
                response.addProperty("id", "iceCandidate");
                response.add("candidate", JsonUtils.toJsonObject(iceCandidateFoundEvent.getCandidate()));
                try {
                    synchronized (session) {
                        session.sendMessage(new TextMessage(response.toString()));
                    }
                } catch (IOException e) {
                    log.debug(e.getMessage());
                }
            }
        });

        String sdpOffer = jsonMessage.get("sdpOffer").getAsString();
        String sdpAnswer = webRtcEndpoint.processOffer(sdpOffer);
        JsonObject response = new JsonObject();
        response.addProperty("id","buskingStartResponse");
        response.addProperty("reponse","accepted");
        response.addProperty("sdpAnswer",sdpAnswer);

        synchronized (session) {
            buskerSession.sendMessage(response);
        }

//        session.sendMessage(new TextMessage(sdpAnswer.toString()));


    }

    @Override // 방송에 참여하는 시청자
    public UserSession join(String audience, WebSocketSession session) {
        UserSession audienceSession = new UserSession(session);
        MediaPipeline mediaPipeline = kurentoClient.createMediaPipeline();
        audienceSession.setWebRtcEndpoint(new WebRtcEndpoint.Builder(mediaPipeline).build());

        WebRtcEndpoint webRtcEndpoint  = audienceSession.getWebRtcEndpoint();
        webRtcEndpoint.addIceCandidateFoundListener(new EventListener<IceCandidateFoundEvent>() {
            @Override
            public void onEvent(IceCandidateFoundEvent iceCandidateFoundEvent) {
                JsonObject response = new JsonObject();
                response.addProperty("id", "iceCandidate");
                response.add("candidate",JsonUtils.toJsonObject(iceCandidateFoundEvent.getCandidate()));
                try {
                    session.sendMessage(new TextMessage(response.toString()));
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }

            }
        });

//        String sdpOffer =


        audiences.put(audience, audienceSession);
        return audienceSession;

    }

    @Override
    public void leave(String audience) {
        if (!audiences.containsKey(audience)) {
            log.debug("there is no audience");
            return;
        }
        audiences.remove(audience);
    }

    @Override
    public void broadCast() {
    }

    @Override
    public void close() throws IOException { // 방송 종료할 때 시청자들한테 메세지 보냄.
        JsonObject message = new JsonObject();
        message.addProperty("message", "방송 종료됐어요~~");
        for (UserSession user : audiences.values()) {
            user.sendMessage(message);
        }
    }
}
