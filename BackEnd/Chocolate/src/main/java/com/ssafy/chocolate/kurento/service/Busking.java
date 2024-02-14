package com.ssafy.chocolate.kurento.service;


import com.google.gson.JsonObject;
import com.ssafy.chocolate.kurento.dto.AudienceSdpOffer;
import com.ssafy.chocolate.kurento.dto.BuskerSdpOffer;
import com.ssafy.chocolate.kurento.dto.GeoLocation;
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
public class Busking extends UserSession implements Closeable {
    private final Logger log = LoggerFactory.getLogger(Busking.class);
    private final ConcurrentHashMap<String, UserSession> buskingSession = new ConcurrentHashMap<>();
    private final KurentoClient kurentoClient;
    private final IceMessageSendService iceMessageSendService;
    private final String buskerEmail;
    private final String buskingTitle;
    private final String buskingReport;
    private final String buskingHashtag;
    private final String buskingInfo;
    private GeoLocation geoLocation;
    private int audienceCount = 0;
    private WebRtcEndpoint buskerWebRtcEndpoint;
    private MediaPipeline buskerPipeline;

    public Busking(KurentoClient kurentoClient, IceMessageSendService iceMessageSendService,
                   String buskerEmail, String buskingTitle,
                   String buskingReport, String buskingHashtag, String buskingInfo, GeoLocation geoLocation) {
        this.kurentoClient = kurentoClient;
        this.iceMessageSendService = iceMessageSendService;
        this.buskerEmail = buskerEmail;
        this.buskingTitle = buskingTitle;
        this.buskingReport = buskingReport;
        this.buskingHashtag = buskingHashtag;
        this.buskingInfo = buskingInfo;
        this.geoLocation = geoLocation;
        buskerPipeline = kurentoClient.createMediaPipeline();
        this.setBuskerWebRtcEndpoint(new WebRtcEndpoint.Builder(buskerPipeline).build());
        WebRtcEndpoint buskerWebRtcEndpoint = this.getBuskerWebRtcEndpoint();
//        log.info(geoLocation.toString()


        buskerWebRtcEndpoint.addIceCandidateFoundListener(iceCandidateFoundEvent -> {
            IceCandidate eventCandidate = iceCandidateFoundEvent.getCandidate();

            HashMap<String, Object> response = new HashMap<>();
            HashMap<String, String> candidate = new HashMap<>();

            candidate.put("candidate", eventCandidate.getCandidate());
            candidate.put("sdpMid", eventCandidate.getSdpMid());
            candidate.put("sdpMLineIndex", String.valueOf(eventCandidate.getSdpMLineIndex()));

            response.put("id", "iceCandidate");
            response.put("candidate", candidate);

            try {
//                log.info("busker add ice candidate");
                iceMessageSendService.buskerSendIceCandidate(buskerEmail, response);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
        buskerWebRtcEndpoint.addConnectionStateChangedListener(connectionStateChangedEvent -> {
            ConnectionState newState = connectionStateChangedEvent.getNewState();
            log.debug(newState.toString());
            if (newState == ConnectionState.CONNECTED) {
                // ICE 연결이 커넥티드 되었을 때 로그를 출력합니다.
                log.info("ICE connection is connected. State: " + newState);
            } else if (newState == ConnectionState.DISCONNECTED) {
                // ICE 연결이 종료되거나 실패한 경우 로그를 출력합니다.
                log.info("ICE connection is closed. State: " + newState);
            }
        });

        buskerWebRtcEndpoint.addIceComponentStateChangedListener(iceComponentStateChangedEvent ->
                log.debug(String.valueOf(iceComponentStateChangedEvent.getState()))

        );
        buskerWebRtcEndpoint.addErrorListener( errorEvent -> {
                    log.debug(String.valueOf(errorEvent.getErrorCode()));
                    log.debug(String.valueOf(errorEvent.getDescription()));
                }
        );





    }

    public JsonObject BuskingStart(BuskerSdpOffer offerMessage) throws IOException {
        log.info(offerMessage.getUserId() + " Start Busking");
        String sdpOffer = offerMessage.getOffer().getSdp();
        String sdpAnswer = buskerWebRtcEndpoint.processOffer(sdpOffer);

        buskerWebRtcEndpoint.gatherCandidates();

        JsonObject response = new JsonObject();
        response.addProperty("id", "buskingStartResponse");
        response.addProperty("response", "accepted");
        response.addProperty("sdpAnswer", sdpAnswer);
//        log.info("buskerWebRtcEndPoint is created "+ (buskerWebRtcEndpoint.getClass()));
        iceMessageSendService.createBuskerSession(offerMessage.getUserId());
        return response;
    }

    // 방송에 참여하는 시청자
    public void audienceJoin(AudienceSdpOffer sdpOffer,UserSession audienceSession) {
        String audienceId = sdpOffer.getAudienceId();
        log.info("audience Join");
//        MediaPipeline mediaPipeline = kurentoClient.createMediaPipeline();
        WebRtcEndpoint audienceWebRtcEndpoint = new WebRtcEndpoint.Builder(buskerPipeline).build();

        audienceWebRtcEndpoint.addIceCandidateFoundListener(iceCandidateFoundEvent -> {
            IceCandidate eventCandidate = iceCandidateFoundEvent.getCandidate();

            HashMap<String, Object> response = new HashMap<>();
            HashMap<String, String> candidate = new HashMap<>();

            candidate.put("candidate", eventCandidate.getCandidate());
            candidate.put("sdpMid", eventCandidate.getSdpMid());
            candidate.put("sdpMLineIndex", String.valueOf(eventCandidate.getSdpMLineIndex()));

            response.put("id", "iceCandidate");
            response.put("candidate", candidate);

            try {
                iceMessageSendService.audienceSendIceCandidate(audienceId, response);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });

        audienceWebRtcEndpoint.addConnectionStateChangedListener(connectionStateChangedEvent -> {
            ConnectionState newState = connectionStateChangedEvent.getNewState();

            log.debug(String.valueOf(newState));
            if (newState == ConnectionState.CONNECTED) {
                // ICE 연결이 커넥티드 되었을 때 로그를 출력합니다.
                log.info("ICE connection is connected. State: " + newState);
                audienceCount++;
            } else if (newState == ConnectionState.DISCONNECTED) {
                // ICE 연결이 종료되거나 실패한 경우 로그를 출력합니다.
                log.info("ICE connection is closed. State: " + newState);
            }
        });

        audienceWebRtcEndpoint.addIceComponentStateChangedListener(iceComponentStateChangedEvent ->
                log.debug(String.valueOf(iceComponentStateChangedEvent.getState()))

        );
        audienceWebRtcEndpoint.addErrorListener( errorEvent -> {
                log.debug(String.valueOf(errorEvent.getErrorCode()));
                log.debug(String.valueOf(errorEvent.getDescription()));
                }
        );




        String sdpAnswer = audienceWebRtcEndpoint.processOffer(sdpOffer.getOffer().getSdp());
        JsonObject sdpResponse = new JsonObject();
        sdpResponse.addProperty("id", "audienceSdpAnswer");
        sdpResponse.addProperty("response", "accepted");
        sdpResponse.addProperty("sdpAnswer", sdpAnswer);

        iceMessageSendService.audienceSendSdpAnswer(audienceId, sdpResponse);
        audienceWebRtcEndpoint.gatherCandidates();

        buskingSession.put(sdpOffer.getAudienceId(), audienceSession);

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
        audienceCount--;
    }

    public void addCandidate(IceCandidate iceCandidate) {
        buskerWebRtcEndpoint.addIceCandidate(iceCandidate);
    }

    public void audienceAddIceCandidate(String audienceId, IceCandidate iceCandidate) {
        UserSession audienceSession = buskingSession.get(audienceId);
        if (audienceSession == null) {
            log.info("no session");
        } else {
            audienceSession.addIceCandidate(iceCandidate);
        }
    }


    @Override
    public void close() throws IOException { // 방송 종료할 때 시청자들한테 메세지 보냄.
        JsonObject message = new JsonObject();
        message.addProperty("message", "방송 종료됐어요~~");
        for (UserSession user : buskingSession.values()) {
            user.getWebRtcEndpoint().release();
            buskingSession.remove(user.getAudienceId());
        }
        buskerWebRtcEndpoint.release();
    }
}
