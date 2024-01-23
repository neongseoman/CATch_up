package com.ssafy.chocolate.userservice.dto;

public class MemberJoinDto {

    private String userid;
    private String pw;

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getPw() {
        return pw;
    }

    public void setPw(String pw) {
        this.pw = pw;
    }
}
