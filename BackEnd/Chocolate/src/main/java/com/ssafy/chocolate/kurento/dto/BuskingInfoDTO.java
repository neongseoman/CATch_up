package com.ssafy.chocolate.kurento.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BuskingInfoDTO {
    private String buskerEmail;
    private String buskingTitle;
    private String buskingReport;
    private String buskingHashtag;
    private String buskingInfo;
    private int audienceCount;
    private GeoLocation geoLocation;

    @Override
    public String toString() {
        return "BuskingInfoDTO{" +
                "buskerEmail='" + buskerEmail + '\'' +
                ", buskingTitle='" + buskingTitle + '\'' +
                ", buskingReport='" + buskingReport + '\'' +
                ", buskingHashtag='" + buskingHashtag + '\'' +
                ", buskingInfo='" + buskingInfo + '\'' +
                ", audienceCount=" + audienceCount +
                '}';
    }

    // 각 필드의 Getter 및 Setter 메서드

}
