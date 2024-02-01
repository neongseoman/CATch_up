package com.ssafy.chocolate.kurento.service;

import com.google.gson.JsonObject;
import com.ssafy.chocolate.common.exception.NoBuskingException;
import com.ssafy.chocolate.kurento.dto.BuskerOfferReceive;
import com.ssafy.chocolate.kurento.dto.UserSession;
import lombok.RequiredArgsConstructor;
import org.kurento.client.KurentoClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

@Component
@RequiredArgsConstructor
public class BuskingManagingService {
    private final Logger log = LoggerFactory.getLogger(BuskingManagingService.class);
    private final ConcurrentHashMap<String, Busking> buskingManaging = new ConcurrentHashMap<>();
    private final KurentoClient kurentoClient;
    private final SimpMessagingTemplate simpMessagingTemplate;

    public Busking getBusking(String busker) {
        Busking buskingImpl = buskingManaging.get(busker);
//        System.out.println(buskingImpl.StateCheck);
        if (buskingImpl == null) {
            log.debug("There is no busker");
        }
        return buskingImpl;
    }


    public void stopBusking(String busker) throws IOException {
        Busking buskingImpl = buskingManaging.get(busker);
        if (buskingImpl == null) {
            log.debug("There is no busker");
        }
        //Buking 듣던 사람들한테 안내하고 종료
        buskingImpl.close();
        ////

        buskingManaging.remove(busker);

    }

    public void startBusking(BuskerOfferReceive message) throws NoBuskingException, IOException {
        String buskerId = message.getUserId();
        log.debug("start Busking is ok");
        System.out.println("여기까지는 괜찮고");
        Busking busking = new Busking(buskerId, kurentoClient, new IceMessageSendService());
        JsonObject sdpAnswer = busking.BuskingStart(message);
        buskingManaging.put(buskerId, busking);
        System.out.println("sdpAnswer : " + sdpAnswer);
        simpMessagingTemplate.convertAndSend("/busker/" + buskerId + "/sdpAnswer",
                sdpAnswer.toString());

    }

    public UserSession joinBusking(JsonObject jsonMessage) {
        String busker = jsonMessage.get("busker").getAsString();
        String audience = jsonMessage.get("audience").getAsString();
        Busking busking = buskingManaging.get(busker);
        UserSession userSession = busking.audienceJoin(audience);
        return userSession;
    }

    public void leaveBusking(WebSocketSession session, JsonObject jsonMessage) {
        String busker = jsonMessage.get("busker").getAsString();
        String audience = jsonMessage.get("audience").getAsString();
        Busking busking = buskingManaging.get(busker);
        busking.leave(audience);

    }
}
