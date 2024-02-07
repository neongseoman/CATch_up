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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class BuskingManagingService {
    private final Logger log = LoggerFactory.getLogger(BuskingManagingService.class);
    private final ConcurrentHashMap<String, Busking> buskingManaging = new ConcurrentHashMap<>();
    private final KurentoClient kurentoClient;
    private final SimpMessagingTemplate simpMessagingTemplate;

    public void setBusking(BuskingInfoDTO infoDTO) {
        String buskerEmail = infoDTO.getBuskerEmail();
        Busking busking = new Busking(kurentoClient, new IceMessageSendService(simpMessagingTemplate),
                infoDTO.getBuskerEmail(), infoDTO.getBuskingTitle(), infoDTO.getBuskingReport(),
                infoDTO.getBuskingHashtag(), infoDTO.getBuskingInfo());
//        System.out.println(busking);
//        System.out.println(buskingManaging);
        buskingManaging.put(buskerEmail, busking);
//        log.info("busker session : " + (buskingManaging.get(buskerEmail)));
    }

    public void startBusking(BuskerSdpOffer message) throws NoBuskingException, IOException {
        String buskerId = message.getUserId();
        log.info(buskerId + " is on set up busking");
//        System.out.println("여기까지는 괜찮고");
        Busking busking = buskingManaging.get(buskerId);
        JsonObject sdpAnswer = busking.BuskingStart(message);
        simpMessagingTemplate.convertAndSend("/busker/" + buskerId + "/sdpAnswer",
                sdpAnswer.toString());
        log.info("Busking set up is clear");
    }

    public void setBuskingIceCandidate(String busker, IceCandidateMessage iceCandidateMessage) {
        Busking busking = buskingManaging.get(busker);
//        log.info(iceCandidateMessage.getIceCandidate().getCandidate());
        if (busking == null) {
            log.debug("There is no busker");
        } else {
            IceCandidate iceCandidate = iceCandidateMessage.getIceCandidate();
            busking.addCandidate(iceCandidate);
        }
    }

    public List<BuskingInfoDTO> currentBusking() {
        List<BuskingInfoDTO> buskingInfoList = new ArrayList<>();

        for (Busking busking : buskingManaging.values()) {
            BuskingInfoDTO buskingInfoDTO = new BuskingInfoDTO();
            buskingInfoDTO.setBuskerEmail(busking.getBuskerEmail());
            buskingInfoDTO.setBuskingTitle(busking.getBuskingTitle());
            buskingInfoDTO.setBuskingReport(busking.getBuskingReport());
            buskingInfoDTO.setBuskingHashtag(busking.getBuskingHashtag());
            buskingInfoDTO.setBuskingInfo(busking.getBuskingInfo());

            buskingInfoList.add(buskingInfoDTO);
        }

        return buskingInfoList;

    }

    public void joinBusking(AudienceSdpOffer offer) throws NoBuskingException {
        Busking busking = buskingManaging.get(offer.getBuskerId());
        UserSession audienceSession = new UserSession();
        if (busking != null) {
            busking.audienceJoin(offer, audienceSession);
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
