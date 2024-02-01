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
public class BuskingManagingService implements BuskingManager {

    private final Logger log = LoggerFactory.getLogger(BuskingManagingService.class);
    private final ConcurrentHashMap<String, BuskingService> buskingManaging = new ConcurrentHashMap<>();
    private final KurentoClient kurentoClient;
    private final SimpMessagingTemplate simpMessagingTemplate;

    public BuskingService getBusking(String busker) {
        BuskingService buskingImpl = buskingManaging.get(busker);
        if (buskingImpl == null) {
            log.debug("There is no busker");
        }
        return buskingImpl;
    }


    public void stopBusking(String busker) throws IOException {
        BuskingService buskingImpl = buskingManaging.get(busker);
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
        BuskingService buskingService = null;
//        try {
//            if (!buskingManaging.containsKey(buskerId)) {
                buskingService = new BuskingService(buskerId,kurentoClient,new IceMessageSendService());
                JsonObject resMessage = buskingService.BuskingStart(message);
//                buskingManaging.put(buskerId, buskingService);
                System.out.println("\n resMessage check : " + resMessage);
                simpMessagingTemplate.convertAndSend("/busker/" + buskerId + "/sdpAnswer",
                        resMessage.toString());
//            }else{}
//        } catch (Exception e) {
//            e.printStackTrace();
//        }


//        } else{
//            log.debug("There is a busker, U can not new Busking");
//            throw new NoBuskingException("버스킹 이미 하고 있는데용?");
//        }

    }

    public UserSession joinBusking(WebSocketSession session, JsonObject jsonMessage) {
        String busker = jsonMessage.get("busker").getAsString();
        String audience = jsonMessage.get("audience").getAsString();
        BuskingService buskingService = buskingManaging.get(busker);
        UserSession userSession = buskingService.join(audience);
        return userSession;
    }

    public void leaveBusking(WebSocketSession session, JsonObject jsonMessage) {
        String busker = jsonMessage.get("busker").getAsString();
        String audience = jsonMessage.get("audience").getAsString();
        BuskingService buskingService = buskingManaging.get(busker);
        buskingService.leave(audience);

    }
}
