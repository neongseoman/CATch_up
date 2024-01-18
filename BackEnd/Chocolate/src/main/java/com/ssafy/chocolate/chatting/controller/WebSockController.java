package com.ssafy.chocolate.chatting.controller;


import com.ssafy.chocolate.chatting.model.ChatMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class WebSockController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public WebSockController() {
    }
}
