package com.ssafy.chocolate.kurento.service;

import com.google.gson.JsonObject;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
public class IceMessageSendService {
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    public void buskerSendIceCandidate(String userId, JsonObject iceCandidate){
        simpMessagingTemplate.convertAndSend(
                "/busker/"+userId+"/iceCandidate", iceCandidate

        );
    }



}
