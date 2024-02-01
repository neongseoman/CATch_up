package com.ssafy.chocolate.user.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberJoinDto {

    private String email;
    private String password;
    private String nickname;

}
