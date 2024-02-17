package com.ssafy.chocolate.kurento.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LeaveParamDto {
    String buskerId;
    String userId;

    @Override
    public String toString() {
        return "LeaveParamDto{" +
                "buskerId='" + buskerId + '\'' +
                ", userId='" + userId + '\'' +
                '}';
    }
}
