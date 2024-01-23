package com.ssafy.chocolate.chat.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class TopicService {

    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public TopicService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }


    public void deleteTopic(String topicName) {
        String topicPath = "/topic/" + topicName;
        messagingTemplate.convertAndSend(topicPath, "Topic deleted: " + topicName);
    }
}
