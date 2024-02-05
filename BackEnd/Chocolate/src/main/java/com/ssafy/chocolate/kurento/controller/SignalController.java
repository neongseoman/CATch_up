package com.ssafy.chocolate.kurento.controller;

import com.ssafy.chocolate.common.exception.NoBuskingException;
import com.ssafy.chocolate.kurento.dto.AudienceSdpOffer;
import com.ssafy.chocolate.kurento.dto.BuskerSdpOffer;
import com.ssafy.chocolate.kurento.dto.IceCandidateMessage;
import com.ssafy.chocolate.kurento.service.BuskingManagingService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.HashMap;

@RestController
@RequiredArgsConstructor
public class SignalController {
    private final Logger log = LoggerFactory.getLogger(SignalController.class);
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final BuskingManagingService buskingManagingService;

    @MessageMapping("/busker")
    public void listenTestStomp(@Payload String message) {
        System.out.println(message);
//        System.out.println("test");
        HashMap<String, String> map = new HashMap<>();
        map.put("test", "test");

        simpMessagingTemplate.convertAndSend("/busker", map);
        return;
    }

    @MessageMapping("/busker/{buskerName}")
    public void listenTestStomp2(@DestinationVariable String buskerName, @Payload String message) {
        System.out.println(buskerName + " " + message);
        HashMap<String, String> map = new HashMap<>();
        map.put("buskerName", "test success");

        simpMessagingTemplate.convertAndSend("/busker/" + buskerName, map);
        return;
    }

    @MessageMapping("/busker/{userId}/offer")
    public void receiveBuskerSDPOffer(@DestinationVariable String userId,
                                      @Payload BuskerSdpOffer SdpOfferMessage) throws NoBuskingException, IOException {
        System.out.println(userId + " send Offer");
        try {

            buskingManagingService.startBusking(SdpOfferMessage);
        } catch (Exception e) {
            e.printStackTrace();
        }
        HashMap<String, String> map = new HashMap<>();
        map.put("buskerName", "test success");

        simpMessagingTemplate.convertAndSend("/busker/" + userId + "/answer", map);
        return;
    }


    @MessageMapping("/busker/{userId}/iceCandidate")
    public void setBuskerIceCandidate(
            @DestinationVariable String userId,
            @Payload IceCandidateMessage iceCandidate
    ) {
        log.info("Ice Candidate is sent");

        buskingManagingService.setBuskingIceCandidate(userId,iceCandidate);
    }


    @MessageMapping("/audience/{userId}/offer")
    public void setAudienceIcaCandidate(@DestinationVariable String userId,
                                        @Payload AudienceSdpOffer sdpOfferMessage) throws NoBuskingException { //offer And Answer
        System.out.println("Audience send Offer");
//        System.out.println(sdpOfferMessage.toString());
        try {
            buskingManagingService.joinBusking(sdpOfferMessage);
        } catch (NoBuskingException e) {
            e.printStackTrace();
        }
        HashMap<String, String> map = new HashMap<>();
        map.put("audience", "join busking");

        simpMessagingTemplate.convertAndSend("/audience/" + userId + "/answer", map);

    }

    @MessageMapping("/audience/{userId}/iceCandidate")
    public void setAudienceIcaCandidate(@DestinationVariable String userId,
                                        @Payload IceCandidateMessage iceCandidateMessage) { // Handle iceCandidate

    }

    @MessageMapping("leaveBusking")
    public void leaveBusking() {
    }

    @MessageMapping("stopBusking")
    public void stopBusking() {
    }
}
