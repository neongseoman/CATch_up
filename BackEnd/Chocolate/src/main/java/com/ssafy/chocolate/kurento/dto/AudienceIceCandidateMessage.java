package com.ssafy.chocolate.kurento.dto;

import lombok.Getter;
import lombok.Setter;
import org.kurento.client.IceCandidate;

@Getter
@Setter
public class AudienceIceCandidateMessage {
    private String buskerId;
    private String audienceId;
    private IceCandidate iceCandidate;

    @Override
    public String toString() {
        return "AudienceIceCandidateMessage{" +
                "buskerId='" + buskerId + '\'' +
                ", audienceId='" + audienceId + '\'' +
                ", iceCandidate=" + iceCandidate +
                '}';
    }
}
