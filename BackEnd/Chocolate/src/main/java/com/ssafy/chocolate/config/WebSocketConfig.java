package com.ssafy.chocolate.config;

import com.ssafy.chocolate.kurento.BuskingManager;
import com.ssafy.chocolate.kurento.BuskingManagerImpl;
import com.ssafy.chocolate.kurento.CallHandler;
import org.kurento.client.KurentoClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;


@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    private final BuskingManagerImpl buskingManagerImpl;

    public WebSocketConfig(BuskingManagerImpl buskingManagerImpl) {
        this.buskingManagerImpl = buskingManagerImpl;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(new CallHandler(buskingManagerImpl),"/busking");
    }


}
