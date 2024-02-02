package com.ssafy.chocolate.kurento.service;

import com.google.gson.JsonObject;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class IceMessageSendService {

    private final Logger log = LoggerFactory.getLogger(BuskingManagingService.class);
    private final SimpMessagingTemplate simpMessagingTemplate;

    public void buskerSendIceCandidate(String userId, HashMap<String, Object> iceCandidate){
//        log.info(userId+ " iceCandidate send ");
//        System.out.println(iceCandidate.values());
        simpMessagingTemplate.convertAndSend(
                "/busker/" + userId + "/iceCandidate", iceCandidate
        );
    }

    public void audienceSendIceCandidate(String userId, HashMap<String, Object> iceCandidate){
        log.info(userId + " send IceCandidate to audience");
        simpMessagingTemplate.convertAndSend("/audience/"+userId+"/iceCandidate",iceCandidate);
    }

    public void audienceSendSdpAnswer(String userId, JsonObject sdpAnswer){
        log.info("Audience "+ userId + "send SDP Answer");
        simpMessagingTemplate.convertAndSend("/audience/"+userId+"/sdpAnswer",sdpAnswer.toString());
    }

}
