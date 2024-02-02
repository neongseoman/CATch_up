package com.ssafy.chocolate.kurento.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AudienceSdpOffer {
    String buskerId;
    String audienceId;
    SDPOffer offer;

    @Override
    public String toString() {
        return "AudienceSdpOffer{" +
                "buskerId='" + buskerId + '\'' +
                ", audienceId='" + audienceId + '\'' +
                ", offer=" + offer +
                '}';
    }
}
