package com.ssafy.chocolate.upload.model;

import jakarta.persistence.*;

@Entity
public class UserInfoDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_no")
    private Long userNo;

    @Column(name = "profile_image_path")
    private String profileImagePath;

    public UserInfoDto() {
    }

    public UserInfoDto(Long user_no, String profile_image_path) {
        this.userNo = user_no;
        this.profileImagePath = profile_image_path;
    }

    public Long getUserNo() {
        return userNo;
    }

    public void setUserNo(Long userNo) {
        this.userNo = userNo;
    }

    public String getProfileImagePath() {
        return profileImagePath;
    }

    public void setProfileImagePath(String profileImagePath) {
        this.profileImagePath = profileImagePath;
    }
}