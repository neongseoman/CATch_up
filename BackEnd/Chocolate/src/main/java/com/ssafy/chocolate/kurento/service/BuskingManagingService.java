package com.ssafy.chocolate.kurento.service;

import com.google.gson.JsonObject;
import com.ssafy.chocolate.common.exception.NoBuskingException;
import com.ssafy.chocolate.kurento.dto.*;
import lombok.RequiredArgsConstructor;
import org.kurento.client.IceCandidate;
import org.kurento.client.KurentoClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
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
        log.info(infoDTO.toString());
        String buskerEmail = infoDTO.getBuskerEmail();
        Busking busking = new Busking(kurentoClient, new IceMessageSendService(simpMessagingTemplate),
                infoDTO.getBuskerEmail(), infoDTO.getBuskingTitle(), infoDTO.getBuskingReport(),
                infoDTO.getBuskingHashtag(), infoDTO.getBuskingInfo(),infoDTO.getGeoLocation());
        buskingManaging.put(buskerEmail, busking);
    }

    public void startBusking(BuskerSdpOffer message) throws NoBuskingException, IOException {
        String buskerId = message.getUserId();
        log.info(buskerId + " is on set up busking");
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
            buskingInfoDTO.setAudienceCount(busking.getAudienceCount());
            buskingInfoDTO.setGeoLocation(busking.getGeoLocation());

            buskingInfoList.add(buskingInfoDTO);
        }

        return buskingInfoList;

    }

    public void joinBusking(AudienceSdpOffer offer) throws NoBuskingException {
        Busking busking = buskingManaging.get(offer.getBuskerId());
        UserSession audienceSession = new UserSession();
        audienceSession.setAudienceId(offer.getAudienceId());
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
        }else{
            busking.getBuskerWebRtcEndpoint().release();
            busking.close();
            buskingManaging.remove(busker);
        }
        //Buking 듣던 사람들한테 안내하고 종료

    }

    public void leaveBusking(LeaveParamDto leaveParamDto) {
        Busking busking = buskingManaging.get(leaveParamDto.getBuskerId());
        busking.leave(leaveParamDto.getUserId());
    }
}
