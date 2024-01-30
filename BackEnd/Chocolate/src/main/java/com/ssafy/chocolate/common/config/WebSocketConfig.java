package com.ssafy.chocolate.common.config;

import com.ssafy.chocolate.kurento.CallHandler;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.*;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;


@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer  {

    public void configureMessageBroker(MessageBrokerRegistry config) {config.enableSimpleBroker(new String[]{"/topic","/busker","/audience"}); // sub
        config.enableSimpleBroker(new String[]{"/topic","/busker","/audience"}); // sub

        config.setApplicationDestinationPrefixes(new String[]{"/app"});
    }

    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // registry.addEndpoint(new String[]{"/chat"}).setAllowedOrigins("*");
        registry.addEndpoint(new String[]{"/chat"}).setAllowedOriginPatterns("*").withSockJS();
        registry.addEndpoint(new String[]{"/signal"})
                .setAllowedOrigins("http://localhost:3000");
    }


}
