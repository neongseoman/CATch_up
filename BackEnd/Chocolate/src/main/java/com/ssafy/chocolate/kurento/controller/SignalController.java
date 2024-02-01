package com.ssafy.chocolate.kurento.controller;

import com.ssafy.chocolate.common.exception.NoBuskingException;
import com.ssafy.chocolate.kurento.dto.BuskerOfferReceive;
import com.ssafy.chocolate.kurento.dto.IceCandidateMessage;
import com.ssafy.chocolate.kurento.service.BuskingManagingService;
import com.ssafy.chocolate.kurento.service.Busking;
import lombok.RequiredArgsConstructor;
import org.kurento.client.Continuation;
import org.kurento.client.IceCandidate;
import org.kurento.client.WebRtcEndpoint;
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
    public void buskerOfferReceive(@DestinationVariable String userId,
//                                   @Payload BuskerOfferReceive offerMessage) throws NoBuskingException, IOException {
                                   @Payload BuskerOfferReceive offerMessage) throws NoBuskingException, IOException {
        System.out.println(userId + " send Offer");
        try {

            buskingManagingService.startBusking(offerMessage);
        } catch (Exception e) {
            e.printStackTrace();
        }
        HashMap<String, String> map = new HashMap<>();
        map.put("buskerName", "test success");

        simpMessagingTemplate.convertAndSend("/busker/" + userId + "/answer", map);
        return;
    }


    @MessageMapping("/busker/{userId}/iceCandidate")
    public void buskerIceCandidateReceive(
            @DestinationVariable String userId,
            @Payload IceCandidateMessage iceCandidateMessage
    ) {
        log.info("Ice Candidate is sent");
//        System.out.println(iceCandidateMessage.toString());
        Busking busking = buskingManagingService.getBusking(userId);
        if (busking != null) {
            IceCandidate iceCandidate = iceCandidateMessage.getIceCandidate();
            System.out.println("iceCandidate : " + iceCandidate.getCandidate());
            WebRtcEndpoint rtcEndpoint = busking.getWebRtcEndpoint();
            log.info(busking.getWebRtcEndpoint().toString());
            rtcEndpoint.addIceCandidate(
                    iceCandidate, new Continuation<Void>() {
                        @Override
                        public void onSuccess(Void unused) throws Exception {
                            log.info("add IceCandidate is success");
                        }
                        @Override
                        public void onError(Throwable throwable) throws Exception {
                            log.info("add IceCandidate is fail");
                        }
                    }
            );
//        System.out.println(buskingService.getWebRtcEndpoint().getMediaState());
        }
    }


    @MessageMapping("join")
    public void joinBusking() {

    }

    @MessageMapping("leaveBusking")
    public void leaveBusking() {
    }

    @MessageMapping("stopBusking")
    public void stopBusking() {
    }
}
