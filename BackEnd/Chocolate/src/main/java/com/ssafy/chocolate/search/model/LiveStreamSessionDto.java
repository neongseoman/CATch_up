package com.ssafy.chocolate.search.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class LiveStreamSessionDto {

    private Long id;

    private Long userNo;

    private LocalDateTime startTime;

    private LocalDateTime endTime;



    private BigDecimal latitude;

    private BigDecimal longitude;

    private String location;

    private String title;

    private String introduction;

    private String category;

    private Integer maxViewer;


    private String nickName;

    private String profileImagePath;


    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getProfileImagePath() {
        return profileImagePath;
    }

    public void setProfileImagePath(String profileImagePath) {
        this.profileImagePath = profileImagePath;
    }

    public LiveStreamSessionDto(Long id, Long userNo, LocalDateTime startTime, LocalDateTime endTime, BigDecimal latitude, BigDecimal longitude, String location, String title, String introduction, String category, Integer maxViewer, String nickName, String profileImagePath) {
        this.id = id;
        this.userNo = userNo;
        this.startTime = startTime;
        this.endTime = endTime;
        this.latitude = latitude;
        this.longitude = longitude;
        this.location = location;
        this.title = title;
        this.introduction = introduction;
        this.category = category;
        this.maxViewer = maxViewer;
        this.nickName = nickName;
        this.profileImagePath = profileImagePath;
    }

    public LiveStreamSessionDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserNo() {
        return userNo;
    }

    public void setUserNo(Long userNo) {
        this.userNo = userNo;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public BigDecimal getLatitude() {
        return latitude;
    }

    public void setLatitude(BigDecimal latitude) {
        this.latitude = latitude;
    }

    public BigDecimal getLongitude() {
        return longitude;
    }

    public void setLongitude(BigDecimal longitude) {
        this.longitude = longitude;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getMaxViewer() {
        return maxViewer;
    }

    public void setMaxViewer(Integer maxViewer) {
        this.maxViewer = maxViewer;
    }
}
