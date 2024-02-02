package com.ssafy.chocolate.kurento.dto;

public class BuskerSdpOffer{
    private String userId;
    private SDPOffer offer;

    // 생성자, 게터, 세터 등을 추가

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public SDPOffer getOffer() {
        return offer;
    }

    public void setOffer(SDPOffer offer) {
        this.offer = offer;
    }

}
