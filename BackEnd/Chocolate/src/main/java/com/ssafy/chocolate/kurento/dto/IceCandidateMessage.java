package com.ssafy.chocolate.kurento.dto;

import lombok.Getter;
import lombok.Setter;
import org.kurento.client.IceCandidate;

@Getter
@Setter
public class IceCandidateMessage {
    private IceCandidate iceCandidate;

    @Override
    public String toString() {
        return "IceCandidateMessage{" +
                "iceCandidate=" + iceCandidate +
                '}';
    }
}
