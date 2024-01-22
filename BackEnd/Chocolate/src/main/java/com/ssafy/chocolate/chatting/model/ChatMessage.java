package com.ssafy.chocolate.chatting.model;


public class ChatMessage {
    private String content;
    private String sender;

    public ChatMessage() {
    }

    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSender() {
        return this.sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }
}
