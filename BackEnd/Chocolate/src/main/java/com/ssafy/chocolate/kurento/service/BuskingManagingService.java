package com.ssafy.chocolate.kurento.service;

import com.google.gson.JsonObject;
import com.ssafy.chocolate.common.exception.NoBuskingException;
import com.ssafy.chocolate.kurento.dto.UserSession;
import org.kurento.client.KurentoClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class BuskingManagingService implements BuskingManager {

    private final Logger log = LoggerFactory.getLogger(BuskingManagingService.class);
    private final ConcurrentHashMap<String, BuskingService> buskings = new ConcurrentHashMap<>();
    private final KurentoClient kurentoClient;

    public BuskingManagingService(KurentoClient kurentoClient) {
        this.kurentoClient = kurentoClient;
    }


    @Override
    public BuskingService getBusking(String busker) {
        BuskingService buskingImpl = buskings.get(busker);
        if (buskingImpl == null){
            log.debug("There is no busker");
        }
        return buskingImpl;
    }



    @Override
    public void stopBusking(String busker) throws IOException {
        BuskingService buskingImpl = buskings.get(busker);
        if (buskingImpl == null){
            log.debug("There is no busker");
        }
        //Buking 듣던 사람들한테 안내하고 종료
        buskingImpl.close();
        ////

        buskings.remove(busker);

    }

    @Override
    public BuskingService startBusking(WebSocketSession session, JsonObject jsonMessage) throws NoBuskingException, IOException {
        String busker = jsonMessage.get("busker").getAsString();
        BuskingService buskingService = null;
        if (!buskings.containsKey(busker)) {
            buskingService = new BuskingService(busker,session,kurentoClient, jsonMessage);
            buskings.put(busker, buskingService);

            return buskingService;
        } else{
            log.debug("There is a busker, U can not new Busking");
            throw new NoBuskingException("버스킹 이미 하고 있는데용?");
        }

    }

    @Override
    public UserSession joinBusking(WebSocketSession session, JsonObject jsonMessage) {
        String busker = jsonMessage.get("busker").getAsString();
        String audience = jsonMessage.get("audience").getAsString();
        BuskingService buskingService = buskings.get(busker);
        UserSession userSession = buskingService.join(audience,session);
        return userSession;
    }

    @Override
    public void leaveBusking(WebSocketSession session, JsonObject jsonMessage) {
        String busker = jsonMessage.get("busker").getAsString();
        String audience = jsonMessage.get("audience").getAsString();
        BuskingService buskingService = buskings.get(busker);
        buskingService.leave(audience);

    }
}
