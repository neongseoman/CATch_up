package com.ssafy.chocolate.kurento.service;

import com.google.gson.JsonObject;
import com.ssafy.chocolate.common.exception.NoBuskingException;
import com.ssafy.chocolate.kurento.dto.AudienceSdpOffer;
import com.ssafy.chocolate.kurento.dto.BuskerSdpOffer;
import com.ssafy.chocolate.kurento.dto.UserSession;
import lombok.RequiredArgsConstructor;
import org.kurento.client.KurentoClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.HashMap;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;

@Service
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
        Busking busking = buskingManaging.get(busker);
        if (busking == null) {
            log.debug("There is no busker");
        }
        //Buking 듣던 사람들한테 안내하고 종료
        busking.close();
        buskingManaging.remove(busker);

    }

    public void startBusking(BuskerSdpOffer message) throws NoBuskingException, IOException {
        String buskerId = message.getUserId();
        log.debug(message.getUserId() + " Busking is ok");
//        System.out.println("여기까지는 괜찮고");
        Busking busking = new Busking(buskerId, kurentoClient, new IceMessageSendService(simpMessagingTemplate));
        JsonObject sdpAnswer = busking.BuskingStart(message);
        buskingManaging.put(buskerId, busking);
//        System.out.println("sdpAnswer : " + sdpAnswer);
        simpMessagingTemplate.convertAndSend("/busker/" + buskerId + "/sdpAnswer",
                sdpAnswer.toString());

    }

    public void joinBusking(AudienceSdpOffer offer) throws NoBuskingException {
//        String audience = offer.getAudienceId();
        Busking busking = buskingManaging.get(offer.getBuskerId());
        if (busking != null) {
//            log.info("Au");
            busking.audienceJoin(offer);
        } else {
            simpMessagingTemplate.convertAndSend("/audience/" + offer.getAudienceId() + "receiveError",
                    new HashMap<String, Object>().put("error", "busking session is null"));
            throw new NoBuskingException("no busking");
        }

    }


    public void leaveBusking(WebSocketSession session, JsonObject jsonMessage) {
        String busker = jsonMessage.get("busker").getAsString();
        String audience = jsonMessage.get("audience").getAsString();
        Busking busking = buskingManaging.get(busker);
        busking.leave(audience);
    }
}
