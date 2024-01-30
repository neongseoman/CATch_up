package com.ssafy.chocolate.kurento.controller;

import com.google.gson.JsonObject;
import com.ssafy.chocolate.kurento.service.BuskingManagingService;
import com.ssafy.chocolate.kurento.CallHandler;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;

@RestController
@RequiredArgsConstructor
public class SignalController {

    private static final Logger log = LoggerFactory.getLogger(CallHandler.class);
    private final SimpMessagingTemplate simpMessagingTemplate;

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
//        System.out.println("");
        HashMap<String,String> map = new HashMap<>();
        map.put("buskerName","test success");

        simpMessagingTemplate.convertAndSend("/busker/"+buskerName,map);
        return;
    }


    @MessageMapping("startBusking")
    public void startBusking() {

    }

    @MessageMapping("join")
    public void joinBusking(){

    }

    @MessageMapping("leaveBusking")
    public void leaveBusking(){}

    @MessageMapping("stopBusking")
    public void stopBusking(){}
}
