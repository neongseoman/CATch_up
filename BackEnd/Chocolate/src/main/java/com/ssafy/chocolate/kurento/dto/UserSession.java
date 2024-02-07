package com.ssafy.chocolate.kurento.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.kurento.client.IceCandidate;
import org.kurento.client.WebRtcEndpoint;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Getter
@Setter
public class UserSession {

    private static final Logger log = LoggerFactory.getLogger(UserSession.class);
    private String audienceId;
    private WebRtcEndpoint webRtcEndpoint;


    public void addIceCandidate(IceCandidate iceCandidate) {
        log.info("audience add ice candidate");
        webRtcEndpoint.addIceCandidate(iceCandidate);
    }

}
