package com.ssafy.chocolate.kurento;

import com.google.gson.JsonObject;
import com.ssafy.chocolate.kurento.exception.NoBuskingException;
import org.kurento.client.KurentoClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class BuskingManagerImpl implements BuskingManager {

    private final Logger log = LoggerFactory.getLogger(BuskingManagerImpl.class);
    private final ConcurrentHashMap<String, BuskingImpl> buskings = new ConcurrentHashMap<>();
    private final KurentoClient kurentoClient;

    public BuskingManagerImpl(KurentoClient kurentoClient) {
        this.kurentoClient = kurentoClient;
    }


    @Override
    public BuskingImpl getBusking(String busker) {
        BuskingImpl buskingImpl = buskings.get(busker);
        if (buskingImpl == null){
            log.debug("There is no busker");
        }
        return buskingImpl;
    }



    @Override
    public void stopBusking(String busker) throws IOException {
        BuskingImpl buskingImpl = buskings.get(busker);
        if (buskingImpl == null){
            log.debug("There is no busker");
        }
        //Buking 듣던 사람들한테 안내하고 종료
        buskingImpl.close();
        ////

        buskings.remove(busker);

    }

    @Override
    public BuskingImpl startBusking(WebSocketSession session, JsonObject jsonMessage) throws NoBuskingException, IOException {
        String busker = jsonMessage.get("busker").getAsString();
        BuskingImpl buskingImpl = null;
        if (!buskings.containsKey(busker)) {
            buskingImpl = new BuskingImpl(busker,session,kurentoClient, jsonMessage);
            buskings.put(busker, buskingImpl);

            return buskingImpl;
        } else{
            log.debug("There is a busker, U can not new Busking");
            throw new NoBuskingException("버스킹 이미 하고 있는데용?");
        }

    }

    @Override
    public UserSession joinBusking(WebSocketSession session,JsonObject jsonMessage) {
        String busker = jsonMessage.get("busker").getAsString();
        String audience = jsonMessage.get("audience").getAsString();
        BuskingImpl buskingImpl = buskings.get(busker);
        UserSession userSession = buskingImpl.join(audience,session);
        return userSession;
    }

    @Override
    public void leaveBusking(WebSocketSession session, JsonObject jsonMessage) {
        String busker = jsonMessage.get("busker").getAsString();
        String audience = jsonMessage.get("audience").getAsString();
        BuskingImpl buskingImpl = buskings.get(busker);
        buskingImpl.leave(audience);

    }
}
