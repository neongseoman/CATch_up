package com.ssafy.chocolate.chatting.controller;//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//


import com.ssafy.chocolate.chatting.model.ChatMessage;
import com.ssafy.chocolate.chatting.service.ChatService;
import com.ssafy.chocolate.chatting.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class ChatController {


    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private ChatService chatService;


    @Autowired
    private TopicService topicService;

    public ChatController() {
    }



    public String createTopic(@RequestParam String topicName) {
        topicService.createTopic(topicName);
        return "success";
    }

    public String deleteTopic(@RequestParam String topicName) {
        topicService.deleteTopic(topicName);
        return "success";
    }


    @PostMapping("/createChatRoom")
    @ResponseBody
    public String createChatRoom(@RequestBody String chatId) {

        System.out.println("제대로 요청 들어왔음: " + chatId);

        createTopic(chatId);

        String chatRoomId = chatService.createChatRoom(chatId);

        return "성공했습니다. 생성된 방 아이디: " + chatRoomId;
    }


    @MessageMapping("/chat.sendToNewTopic") // 클라이언트에서 해당 경로로 메시지를 전송
    public void sendToNewTopic(@Payload String message) {

        String topicName = message.split("LLLL")[1];

        String topicPath = "/topic/" + topicName;

        messagingTemplate.convertAndSend(topicPath, message);
    }

    @GetMapping({"/chatapp"})
    public String chatApp() {
        return "chatapp.html";
    }
}
