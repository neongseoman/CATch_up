package com.ssafy.chocolate.kurento.service;


import com.google.gson.JsonObject;
import com.ssafy.chocolate.kurento.dto.BuskerOfferReceive;
import com.ssafy.chocolate.kurento.dto.UserSession;
import lombok.Getter;
import org.kurento.client.*;
import org.kurento.jsonrpc.JsonUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Closeable;
import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;


@Getter
public class Busking extends UserSession implements  Closeable {
    private final Logger log = LoggerFactory.getLogger(Busking.class);
    private final ConcurrentHashMap<String, UserSession> audiences = new ConcurrentHashMap<>();
    private final String buskerName;
    private final KurentoClient kurentoClient;
    private final IceMessageSendService iceMessageSendService;
    private WebRtcEndpoint webRtcEndpoint;
    private MediaPipeline buskerPipeline;
//    public String StateCheck = "";

    @Override
    public WebRtcEndpoint getWebRtcEndpoint() {
        return webRtcEndpoint;
    }

    @Override
    public void setWebRtcEndpoint(WebRtcEndpoint webRtcEndpoint) {
        this.webRtcEndpoint = webRtcEndpoint;
    }

    public Busking(String buskerName, KurentoClient kurentoClient, IceMessageSendService iceMessageSendService) {
        this.buskerName = buskerName;
        this.kurentoClient = kurentoClient;
        this.iceMessageSendService = iceMessageSendService;
    }


    public JsonObject BuskingStart(BuskerOfferReceive offerMessage) throws IOException {
//        log.info("Busking Start");
        System.out.println("Busking start");
        buskerPipeline = kurentoClient.createMediaPipeline();
        setWebRtcEndpoint(new WebRtcEndpoint.Builder(buskerPipeline).build());
        log.info(this.getWebRtcEndpoint().toString());
        WebRtcEndpoint webRtcEndpoint = getWebRtcEndpoint();
        webRtcEndpoint.addIceCandidateFoundListener(iceCandidateFoundEvent -> {
            log.info("this is Busker Ice Candidate");
            JsonObject response = new JsonObject();
            response.addProperty("id", "iceCandidate");
            response.add("candidate", JsonUtils.toJsonObject(iceCandidateFoundEvent.getCandidate()));
            System.out.println(response.get("id").getAsString());
            try {
                System.out.println("send Ice Candidate");
                synchronized (iceMessageSendService) {
                    iceMessageSendService.buskerSendIceCandidate(buskerName, response);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        });

        String sdpOffer = offerMessage.getOffer().getSdp();
        String sdpAnswer = webRtcEndpoint.processOffer(sdpOffer);
        JsonObject response = new JsonObject();
        response.addProperty("id", "buskingStartResponse");
        response.addProperty("response", "accepted");
        response.addProperty("sdpAnswer", sdpAnswer);

        return response;
    }

// 방송에 참여하는 시청자
    public UserSession audienceJoin(String audience) {
        UserSession audienceSession = new UserSession();
        MediaPipeline mediaPipeline = kurentoClient.createMediaPipeline();
        audienceSession.setWebRtcEndpoint(new WebRtcEndpoint.Builder(mediaPipeline).build());

        WebRtcEndpoint webRtcEndpoint = audienceSession.getWebRtcEndpoint();
        webRtcEndpoint.addIceCandidateFoundListener(new EventListener<IceCandidateFoundEvent>() {
            @Override
            public void onEvent(IceCandidateFoundEvent iceCandidateFoundEvent) {
                JsonObject response = new JsonObject();
                response.addProperty("id", "iceCandidate");
                response.add("candidate", JsonUtils.toJsonObject(iceCandidateFoundEvent.getCandidate()));

            }
        });

        audiences.put(audience, audienceSession);
        return audienceSession;

    }

    public void leave(String audience) {
        if (!audiences.containsKey(audience)) {
            log.debug("there is no audience");
            return;
        }
        audiences.remove(audience);
    }

    public void broadCast() {
    }

    public void addCandidate(IceCandidate iceCandidate) {
        webRtcEndpoint.addIceCandidate(iceCandidate);
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
