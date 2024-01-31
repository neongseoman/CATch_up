package com.ssafy.chocolate.search.model;

import java.time.LocalDateTime;
import java.util.List;

public class SearchShortsDto {
    private Long streamNo;
    private Long userNo;

    private String nickname;
    private String profileImagePath;
    private Long likes;
    private Long comments;
    private Long views;
    private Long maxViews;
    private String title;
    private String shortsPath;
    private String introduction;
    private LocalDateTime createdTime;
    private LocalDateTime streamedTime;
    private Long streamingTime;
    private List<String> hashtags;

    public SearchShortsDto(Long streamNo, Long userNo, String nickname, String profileImagePath, Long likes, Long comments, Long views, Long maxViews, String title, String shortsPath, String introduction, LocalDateTime createdTime, LocalDateTime streamedTime, Long streamingTime, List<String> hashtags) {
        this.streamNo = streamNo;
        this.userNo = userNo;
        this.nickname = nickname;
        this.profileImagePath = profileImagePath;
        this.likes = likes;
        this.comments = comments;
        this.views = views;
        this.maxViews = maxViews;
        this.title = title;
        this.shortsPath = shortsPath;
        this.introduction = introduction;
        this.createdTime = createdTime;
        this.streamedTime = streamedTime;
        this.streamingTime = streamingTime;
        this.hashtags = hashtags;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getProfileImagePath() {
        return profileImagePath;
    }

    public void setProfileImagePath(String profileImagePath) {
        this.profileImagePath = profileImagePath;
    }

    public SearchShortsDto() {
    }

    public Long getStreamNo() {
        return streamNo;
    }

    public void setStreamNo(Long streamNo) {
        this.streamNo = streamNo;
    }

    public Long getUserNo() {
        return userNo;
    }

    public void setUserNo(Long userNo) {
        this.userNo = userNo;
    }

    public Long getLikes() {
        return likes;
    }

    public void setLikes(Long likes) {
        this.likes = likes;
    }

    public Long getComments() {
        return comments;
    }

    public void setComments(Long comments) {
        this.comments = comments;
    }

    public Long getViews() {
        return views;
    }

    public void setViews(Long views) {
        this.views = views;
    }

    public Long getMaxViews() {
        return maxViews;
    }

    public void setMaxViews(Long maxViews) {
        this.maxViews = maxViews;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getShortsPath() {
        return shortsPath;
    }

    public void setShortsPath(String shortsPath) {
        this.shortsPath = shortsPath;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public LocalDateTime getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime;
    }

    public LocalDateTime getStreamedTime() {
        return streamedTime;
    }

    public void setStreamedTime(LocalDateTime streamedTime) {
        this.streamedTime = streamedTime;
    }

    public Long getStreamingTime() {
        return streamingTime;
    }

    public void setStreamingTime(Long streamingTime) {
        this.streamingTime = streamingTime;
    }

    public List<String> getHashtags() {
        return hashtags;
    }

    public void setHashtags(List<String> hashtags) {
        this.hashtags = hashtags;
    }
}
