package com.ssafy.chocolate.chatting.controller;//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//


import com.ssafy.chocolate.chatting.model.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ChatController {
    public ChatController() {
    }

    @MessageMapping({"/chat.sendMessage"})
    @SendTo({"/topic/public"})
    public ChatMessage sendMessage(ChatMessage chatMessage) {
        return chatMessage;
    }

    @MessageMapping({"/chat.addUser"})
    @SendTo({"/topic/public"})
    public ChatMessage addUser(ChatMessage chatMessage) {
        return chatMessage;
    }

    @GetMapping({"/chatapp"})
    public String chatApp() {
        return "chatapp.html";
    }
}
