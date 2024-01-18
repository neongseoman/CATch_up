package com.ssafy.chocolate.chatting.controller;


import com.ssafy.chocolate.chatting.model.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class WebSockController {
    public WebSockController() {
    }
    @MessageMapping({"/sendMessage"})
    @SendTo({"/topic/public"})
    @ResponseBody
    public ChatMessage sendMessage(ChatMessage message) {
        return message;
    }
}
