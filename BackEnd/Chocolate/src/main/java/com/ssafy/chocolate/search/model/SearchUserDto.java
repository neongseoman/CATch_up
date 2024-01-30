package com.ssafy.chocolate.search.model;

public class SearchUserDto {
    String profileImagePath;
    String nickName;
    String introduction;

    public SearchUserDto(String profileImagePath, String nickName, String introduction) {
        this.profileImagePath = profileImagePath;
        this.nickName = nickName;
        this.introduction = introduction;
    }

    public SearchUserDto() {
    }

    public String getProfileImagePath() {
        return profileImagePath;
    }

    public void setProfileImagePath(String profileImagePath) {
        this.profileImagePath = profileImagePath;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }
}
