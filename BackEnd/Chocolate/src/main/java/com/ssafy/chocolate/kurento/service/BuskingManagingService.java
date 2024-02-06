package com.ssafy.chocolate.kurento.service;

import com.google.gson.JsonObject;
import com.ssafy.chocolate.common.exception.NoBuskingException;
import com.ssafy.chocolate.kurento.dto.*;
import lombok.RequiredArgsConstructor;
import org.kurento.client.IceCandidate;
import org.kurento.client.KurentoClient;
import org.kurento.client.WebRtcEndpoint;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class BuskingManagingService {
    private final Logger log = LoggerFactory.getLogger(BuskingManagingService.class);
    private final ConcurrentHashMap<String, Busking> buskingManaging = new ConcurrentHashMap<>();
    private final KurentoClient kurentoClient;
    private final SimpMessagingTemplate simpMessagingTemplate;

    public void startBusking(BuskerSdpOffer message) throws NoBuskingException, IOException {
        String buskerId = message.getUserId();
        log.debug(message.getUserId() + " Busking is ok");
//        System.out.println("여기까지는 괜찮고");
        Busking busking = new Busking(buskerId, kurentoClient, new IceMessageSendService(simpMessagingTemplate));
        JsonObject sdpAnswer = busking.BuskingStart(message);
        buskingManaging.put(buskerId, busking);
        simpMessagingTemplate.convertAndSend("/busker/" + buskerId + "/sdpAnswer",
                sdpAnswer.toString());

    }


    public void setBuskingIceCandidate(String busker, IceCandidateMessage iceCandidateMessage) {
        Busking busking = buskingManaging.get(busker);
        if (busking == null) {
            log.debug("There is no busker");
        } else{
            IceCandidate iceCandidate = iceCandidateMessage.getIceCandidate();
            busking.addCandidate(iceCandidate);
        }
    }


    public void joinBusking(AudienceSdpOffer offer) throws NoBuskingException {
        Busking busking = buskingManaging.get(offer.getBuskerId());
        UserSession audienceSession = new UserSession();
        if (busking != null) {
            busking.audienceJoin(offer,audienceSession);
        } else {
            log.info("No Busking rooms");
        }

    }

    public void setAudienceIceCandidate(String audienceId, AudienceIceCandidateMessage audienceIceCandidateMessage) {
        System.out.println(audienceIceCandidateMessage.getBuskerId());

//        System.out.println(buskingManaging.keys().asIterator().toString());

        Busking busking = buskingManaging.get(audienceIceCandidateMessage.getBuskerId());
        if (busking == null) {
            log.info("Audience Ice Candidate Error");
            return;
        } else {
            IceCandidate iceCandidate = audienceIceCandidateMessage.getIceCandidate();
            busking.audienceAddIceCandidate(audienceId, iceCandidate);
        }
    }


    public void stopBusking(String busker) throws IOException {
        Busking busking = buskingManaging.get(busker);
        if (busking == null) {
            log.debug("There is no busker");
        }
        //Buking 듣던 사람들한테 안내하고 종료
        busking.close();
        buskingManaging.remove(busker);

    }


    public void leaveBusking(WebSocketSession session, JsonObject jsonMessage) {
        String busker = jsonMessage.get("busker").getAsString();
        String audience = jsonMessage.get("audience").getAsString();
        Busking busking = buskingManaging.get(busker);
        busking.leave(audience);
    }
}
