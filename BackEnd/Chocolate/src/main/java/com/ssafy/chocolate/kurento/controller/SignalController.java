package com.ssafy.chocolate.kurento.controller;

import com.google.gson.JsonObject;
import com.ssafy.chocolate.common.exception.NoBuskingException;
import com.ssafy.chocolate.kurento.dto.BuskerOfferReceive;
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
import java.time.LocalDateTime;
import java.util.HashMap;

@RestController
@RequiredArgsConstructor
public class SignalController {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final BuskingManagingService buskingManagingService;

//    @MessageMapping("/busker")
//    public void listenTestStomp( @Payload String message) {
//        System.out.println(message);
////        System.out.println("test");
//        HashMap<String,String> map = new HashMap<>();
//        map.put("test","test");
//
//        simpMessagingTemplate.convertAndSend("/busker",map);
//        return;
//    }

    @MessageMapping("/busker/{buskerName}")
    public void listenTestStomp2(@DestinationVariable String buskerName, @Payload String message) {
        System.out.println(buskerName+" "+message);
        HashMap<String,String> map = new HashMap<>();
        map.put("buskerName","test success");

        simpMessagingTemplate.convertAndSend("/busker/"+buskerName,map);
        return;
    }

    @MessageMapping("/busker/{userId}/offer")
    public void buskerOfferReceive(@DestinationVariable String userId, @Payload BuskerOfferReceive offerMessage) throws NoBuskingException, IOException {
        System.out.println(userId+" send Offer");
        System.out.println(offerMessage.toString());
//        if (offerMessage != null)
        try {

            buskingManagingService.startBusking(offerMessage);
        }catch (Exception e){
            e.printStackTrace();
        }
        HashMap<String,String> map = new HashMap<>();
        map.put("buskerName","test success");

        simpMessagingTemplate.convertAndSend("/busker/"+userId+"/answer",map);
        return;
    }


    @MessageMapping("join")
    public void joinBusking(){

    }

    @MessageMapping("leaveBusking")
    public void leaveBusking(){}

    @MessageMapping("stopBusking")
    public void stopBusking(){}
}
