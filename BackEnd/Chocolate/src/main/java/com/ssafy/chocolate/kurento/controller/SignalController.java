package com.ssafy.chocolate.kurento.controller;

import com.google.gson.JsonObject;
import com.ssafy.chocolate.kurento.service.BuskingManagingService;
import com.ssafy.chocolate.kurento.CallHandler;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
public class SignalController {

    private static final Logger log = LoggerFactory.getLogger(CallHandler.class);
    private final SimpMessagingTemplate webSocket;
    private final BuskingManagingService buskingManagingService;



    @MessageMapping("/busker")
    public String listenTestStomp() {
        return "[" + LocalDateTime.now().toString() + "message" + "]";
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
