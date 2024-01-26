package com.ssafy.chocolate.common.config;

import com.ssafy.chocolate.stream.BuskingManagerImpl;
import com.ssafy.chocolate.stream.CallHandler;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.*;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;


@Configuration
@EnableWebSocket
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketConfigurer,WebSocketMessageBrokerConfigurer  {
    private final BuskingManagerImpl buskingManagerImpl;

    public WebSocketConfig(BuskingManagerImpl buskingManagerImpl) {
        this.buskingManagerImpl = buskingManagerImpl;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(new CallHandler(buskingManagerImpl),"/busking");
    }

    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker(new String[]{"/topic"});
        config.setApplicationDestinationPrefixes(new String[]{"/app"});
    }

    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // registry.addEndpoint(new String[]{"/chat"}).setAllowedOrigins("*");
        registry.addEndpoint(new String[]{"/chat"}).setAllowedOriginPatterns("*").withSockJS();
    }
}
