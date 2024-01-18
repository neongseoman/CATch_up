package com.ssafy.chocolate.kurento;

import org.kurento.client.KurentoClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.WebSocketSession;

import java.io.Closeable;
import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

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
    public BuskingImpl startBusking(String busker, WebSocketSession session) {
        BuskingImpl buskingImpl = buskings.get(busker);
        if (buskingImpl != null){
            log.debug("There is busker, U can not new Busking");
        }
        buskingImpl = new BuskingImpl(busker,kurentoClient.createMediaPipeline(),session);
        buskings.put(busker, buskingImpl);
        return buskingImpl;
    }

    @Override
    public UserSession joinBusking(String busker, String audience, WebSocketSession session) {
        BuskingImpl buskingImpl = buskings.get(busker);
        UserSession userSession = buskingImpl.join(audience,session);
        return userSession;

    }
}
