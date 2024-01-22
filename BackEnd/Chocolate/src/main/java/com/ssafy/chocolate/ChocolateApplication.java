package com.ssafy.chocolate;

import org.kurento.client.KurentoClient;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.server.standard.ServletServerContainerFactoryBean;

@SpringBootApplication
@EnableWebSocket
public class ChocolateApplication {

    @Bean
    public KurentoClient kurentoClient() {
        return KurentoClient.create();
    }


    @Bean
    public ServletServerContainerFactoryBean createServletServerContainerFactoryBean() {
        ServletServerContainerFactoryBean container = new ServletServerContainerFactoryBean();
        container.setMaxTextMessageBufferSize(32768);
        return container;
    }


    public static void main(String[] args) {
        SpringApplication.run(ChocolateApplication.class, args);
    }

}
