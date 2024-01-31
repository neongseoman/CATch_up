package com.ssafy.chocolate.kurento.service;


import com.google.gson.JsonObject;
import com.ssafy.chocolate.kurento.dto.BuskerOfferReceive;
import com.ssafy.chocolate.kurento.dto.UserSession;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.kurento.client.*;
import org.kurento.jsonrpc.JsonUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.Closeable;
import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;


@Getter
public class BuskingService implements Busking, Closeable {
    private final Logger log = LoggerFactory.getLogger(BuskingService.class);
    private final ConcurrentHashMap<String, UserSession> audiences = new ConcurrentHashMap<>();
    private final String buskerName;
    private final KurentoClient kurentoClient;
    private MediaPipeline buskerPipeline;
    private UserSession buskerSession;

    public BuskingService(String buskerName, KurentoClient kurentoClient, BuskerOfferReceive jsonMessage) throws IOException {
        this.buskerName = buskerName;
        this.kurentoClient = kurentoClient;
        log.debug("Busking is Start!");
    }

    public JsonObject BuskingStart( BuskerOfferReceive offerMessage) throws IOException {
        buskerSession = new UserSession();
        buskerPipeline = kurentoClient.createMediaPipeline();
        buskerSession.setWebRtcEndpoint(new WebRtcEndpoint.Builder(buskerPipeline).build());

        WebRtcEndpoint webRtcEndpoint = buskerSession.getWebRtcEndpoint();
        webRtcEndpoint.addIceCandidateFoundListener(new EventListener<IceCandidateFoundEvent>() {

            @Override
            public void onEvent(IceCandidateFoundEvent iceCandidateFoundEvent) {
                JsonObject response = new JsonObject();
                response.addProperty("id", "iceCandidate");
                response.add("candidate", JsonUtils.toJsonObject(iceCandidateFoundEvent.getCandidate()));

            }
        });

        String sdpOffer = offerMessage.getOffer().getSdp();
        String sdpAnswer = webRtcEndpoint.processOffer(sdpOffer);
        JsonObject response = new JsonObject();
        response.addProperty("id","buskingStartResponse");
        response.addProperty("reponse","accepted");
        response.addProperty("sdpAnswer",sdpAnswer);

        return response;
    }

    @Override // 방송에 참여하는 시청자
    public UserSession join(String audience) {
        UserSession audienceSession = new UserSession();
        MediaPipeline mediaPipeline = kurentoClient.createMediaPipeline();
        audienceSession.setWebRtcEndpoint(new WebRtcEndpoint.Builder(mediaPipeline).build());

        WebRtcEndpoint webRtcEndpoint  = audienceSession.getWebRtcEndpoint();
        webRtcEndpoint.addIceCandidateFoundListener(new EventListener<IceCandidateFoundEvent>() {
            @Override
            public void onEvent(IceCandidateFoundEvent iceCandidateFoundEvent) {
                JsonObject response = new JsonObject();
                response.addProperty("id", "iceCandidate");
                response.add("candidate",JsonUtils.toJsonObject(iceCandidateFoundEvent.getCandidate()));


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
//            user.sendMessage(message);
        }
    }
}
