package com.ssafy.chocolate.kurento.dto;

public class SDPOffer {
    private String type;
    private String sdp;

    // 생성자, 게터, 세터 등을 추가

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getSdp() {
        return sdp;
    }

    public void setSdp(String sdp) {
        this.sdp = sdp;
    }


    @Override
    public String toString() {
        return "SDPOffer{" +
                "type='" + type + '\'' +
                ", sdp='" + sdp + '\'' +
                '}';
    }
}
