package com.ssafy.chocolate.kurento.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class StreamingInfoDto {
    private String buskerEmail;
    private String buskingTitle;
    private String buskingReport;
    private String buskingHashtag;
    private String buskingInfo;
    private Geolocation geoLocation;

    @Getter
    @Setter
    public static class Geolocation {
        private Double latitude;
        private Double longitude;
    }
}
