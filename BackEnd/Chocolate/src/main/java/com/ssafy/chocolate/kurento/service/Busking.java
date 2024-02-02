package com.ssafy.chocolate.kurento.service;


import com.google.gson.JsonObject;
import com.ssafy.chocolate.kurento.dto.AudienceSdpOffer;
import com.ssafy.chocolate.kurento.dto.BuskerSdpOffer;
import com.ssafy.chocolate.kurento.dto.UserSession;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.kurento.client.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Closeable;
import java.io.IOException;
import java.util.HashMap;
import java.util.concurrent.ConcurrentHashMap;


@Getter
@Setter
@RequiredArgsConstructor
public class Busking extends UserSession implements  Closeable {
    private final Logger log = LoggerFactory.getLogger(Busking.class);
    private final ConcurrentHashMap<String, UserSession> buskingSession = new ConcurrentHashMap<>();
    private final String buskerName;
    private final KurentoClient kurentoClient;
    private final IceMessageSendService iceMessageSendService;
    private WebRtcEndpoint buskerWebRtcEndpoint;
    private MediaPipeline buskerPipeline;

    public JsonObject BuskingStart(BuskerSdpOffer offerMessage) throws IOException {
        System.out.println("Busking start");
        buskerPipeline = kurentoClient.createMediaPipeline();
        this.setBuskerWebRtcEndpoint(new WebRtcEndpoint.Builder(buskerPipeline).build());
        WebRtcEndpoint buskerWebRtcEndpoint = this.getBuskerWebRtcEndpoint();

        buskerWebRtcEndpoint.addIceCandidateFoundListener(iceCandidateFoundEvent -> {
            IceCandidate eventCandidate = iceCandidateFoundEvent.getCandidate();

            HashMap<String, Object> response = new HashMap<>();
            HashMap<String, String> candidate = new HashMap<>();

            candidate.put("candidate",eventCandidate.getCandidate());
            candidate.put("sdpMid",eventCandidate.getSdpMid());
            candidate.put("sdpMLineIndex",String.valueOf(eventCandidate.getSdpMLineIndex()));

            response.put("id", "iceCandidate");
            response.put("candidate", candidate);

            try {
                iceMessageSendService.buskerSendIceCandidate(buskerName, response);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });

        String sdpOffer = offerMessage.getOffer().getSdp();
        String sdpAnswer = buskerWebRtcEndpoint.processOffer(sdpOffer);

        buskerWebRtcEndpoint.gatherCandidates();

        JsonObject response = new JsonObject();
        response.addProperty("id", "buskingStartResponse");
        response.addProperty("response", "accepted");
        response.addProperty("sdpAnswer", sdpAnswer);
        log.info("buskerWebRtcEndPoint is created "+ (buskerWebRtcEndpoint.getClass()));

        return response;
    }

// 방송에 참여하는 시청자
    public void audienceJoin(AudienceSdpOffer sdpOffer) {
        UserSession audienceSession = new UserSession();
        String audienceId = sdpOffer.getAudienceId();
        log.info("audience Join");
//        MediaPipeline mediaPipeline = kurentoClient.createMediaPipeline();
        WebRtcEndpoint audienceWebRtcEndpoint = new WebRtcEndpoint.Builder(buskerPipeline).build();

        audienceWebRtcEndpoint.addIceCandidateFoundListener(iceCandidateFoundEvent -> {
            IceCandidate eventCandidate = iceCandidateFoundEvent.getCandidate();

            HashMap<String, Object> response = new HashMap<>();
            HashMap<String, String> candidate = new HashMap<>();

            candidate.put("candidate",eventCandidate.getCandidate());
            candidate.put("sdpMid",eventCandidate.getSdpMid());
            candidate.put("sdpMLineIndex",String.valueOf(eventCandidate.getSdpMLineIndex()));

            response.put("id", "iceCandidate");
            response.put("candidate", candidate);

            try {
                iceMessageSendService.audienceSendIceCandidate(audienceId, response);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });

        String sdpAnswer = audienceWebRtcEndpoint.processOffer(sdpOffer.getOffer().getSdp());
        JsonObject sdpResponse = new JsonObject();
        sdpResponse.addProperty("id","audienceSdpAnswer");
        sdpResponse.addProperty("response","accepted");
        sdpResponse.addProperty("sdpAnswer",sdpAnswer);

        iceMessageSendService.audienceSendSdpAnswer(audienceId,sdpResponse);
        audienceWebRtcEndpoint.gatherCandidates();

        buskingSession.put(sdpOffer.getBuskerId(), audienceSession);

        JsonObject response = new JsonObject();
        response.addProperty("id", "audienceSdpAnswer");
        response.addProperty("response", "accepted");
        response.addProperty("sdpAnswer", sdpAnswer);

        audienceSession.setWebRtcEndpoint(audienceWebRtcEndpoint);
        buskerWebRtcEndpoint.connect(audienceWebRtcEndpoint);

    }

    public void leave(String audience) {
        if (!buskingSession.containsKey(audience)) {
            log.debug("there is no audience");
            return;
        }
        buskingSession.remove(audience);
    }

    public void broadCast() {
    }

    public void addCandidate(IceCandidate iceCandidate) {
        buskerWebRtcEndpoint.addIceCandidate(iceCandidate);
    }

    @Override
    public void close() throws IOException { // 방송 종료할 때 시청자들한테 메세지 보냄.
        JsonObject message = new JsonObject();
        message.addProperty("message", "방송 종료됐어요~~");
        for (UserSession user : buskingSession.values()) {
//            user.sendMessage(message);
        }
    }

}