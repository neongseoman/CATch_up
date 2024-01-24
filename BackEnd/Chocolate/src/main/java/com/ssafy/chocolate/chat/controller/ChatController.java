package com.ssafy.chocolate.chat.controller;//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//


import com.ssafy.chocolate.chat.service.TopicService;
import com.ssafy.chocolate.user.model.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class ChatController {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @Autowired
    private TopicService topicService;

    public ChatController() {
    }
    public String deleteTopic(@RequestParam String topicName) {
        topicService.deleteTopic(topicName);
        return "success";
    }
    public String getCurrentUsername() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            return ((UserDetails)principal).getUsername();
        } else {
            return principal.toString(); // 또는 null 반환
        }
    }
    @MessageMapping("/chat.sendToNewTopic") // 클라이언트에서 해당 경로로 메시지를 전송..
    public void sendToNewTopic(@Payload String message) {
        String topicName = message.split("LLLL")[1];
        String topicPath = "/topic/" + topicName;
        messagingTemplate.convertAndSend(topicPath, message);
    }
    @GetMapping({"/chatapp"})
    public String chatApp(Model model) {
        return "chatapp.html";
    }

    @GetMapping("/api/userinfo")
    public ResponseEntity<?> getUserInfo() {
        String username = getCurrentUsername();
        return ResponseEntity.ok().body(username);
    }
}
