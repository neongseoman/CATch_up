package com.ssafy.chocolate.kurento.controller;

import com.ssafy.chocolate.common.exception.NoBuskingException;
import com.ssafy.chocolate.kurento.dto.*;
import com.ssafy.chocolate.kurento.service.BuskingManagingService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class SignalController {
    private final Logger log = LoggerFactory.getLogger(SignalController.class);
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final BuskingManagingService buskingManagingService;

    @MessageMapping("/api/busker")
    public void listenTestStomp(@Payload String message) {
        System.out.println(message);
//        System.out.println("test");
        HashMap<String, String> map = new HashMap<>();
        map.put("test", "test");

        simpMessagingTemplate.convertAndSend("/busker", map);
        return;
    }

    @MessageMapping("/api/busker/{buskerName}")
    public void listenBusker(@DestinationVariable String buskerName, @Payload String message) {
        System.out.println(buskerName + " " + message);
        HashMap<String, String> map = new HashMap<>();
        map.put("buskerName", "test success");

        simpMessagingTemplate.convertAndSend("/busker/" + buskerName, map);
        return;
    }

    @MessageMapping("/api/audience/{audienceId}")
    public void listenAudience(@DestinationVariable String audienceId, @Payload String message) {
        System.out.println(audienceId + " " + message);
        HashMap<String, String> map = new HashMap<>();
        map.put(audienceId, "test success");

        simpMessagingTemplate.convertAndSend("/audience/" + audienceId, map);
        return;
    }

    @MessageMapping("/api/busker/{userId}/offer")
    public void receiveBuskerSDPOffer(@DestinationVariable String userId,
                                      @Payload BuskerSdpOffer SdpOfferMessage) throws NoBuskingException, IOException {
//        log.info(userId + " Send Offer");
        try {
            buskingManagingService.startBusking(SdpOfferMessage);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }


    @MessageMapping("/api/busker/{userId}/iceCandidate")
    public void setBuskerIceCandidate(
            @DestinationVariable String userId,
            @Payload IceCandidateMessage iceCandidate
    ) {
        buskingManagingService.setBuskingIceCandidate(userId,iceCandidate);
    }


    @MessageMapping("/api/audience/{audienceId}/offer")
    public void receiveAudienceSDPOffer(@DestinationVariable String audienceId,
                                        @Payload AudienceSdpOffer sdpOfferMessage) throws NoBuskingException { //offer And Answer
        log.info("Audience send Offer");
        try {
            buskingManagingService.joinBusking(sdpOfferMessage);
        } catch (NoBuskingException e) {
            e.printStackTrace();
        }
        HashMap<String, String> map = new HashMap<>();
        map.put("audience", "join busking");

        simpMessagingTemplate.convertAndSend("/audience/" + audienceId + "/answer", map);

    }

    @MessageMapping("/api/audience/{audienceId}/iceCandidate")
    public void setAudienceIceCandidate(@DestinationVariable String audienceId,
                                        @Payload AudienceIceCandidateMessage audienceIceCandidateMessage) { // Handle iceCandidate
        log.info("audience " + audienceId + "iceCandidate is sent");
        buskingManagingService.setAudienceIceCandidate(audienceId,audienceIceCandidateMessage);
    }

    @MessageMapping("/api/leaveBusking")
    public void leaveBusking() {
    }

    @PostMapping("/api/busker/{buskerId}/stopBusking")
    public void stopBusking(@PathVariable String buskerId) throws IOException {
//        log.info(buskerId);
        buskingManagingService.stopBusking(buskerId); // 에러처리 해야하는데...
    }

    @PostMapping("/api/busking/info")
    public ResponseEntity buskingInfo(@RequestBody BuskingInfoDTO buskingInfoDTO) {
        log.info("Set busking by busking info");
        log.info(buskingInfoDTO.toString());
        buskingManagingService.setBusking(buskingInfoDTO);
        log.info("manager set busking");
        return ResponseEntity.ok().build();
    }

    @GetMapping("/api/busking/buskerList")
    public ResponseEntity<List<BuskingInfoDTO>> buskerList(){
        return ResponseEntity.ok(buskingManagingService.currentBusking());
    }
}
