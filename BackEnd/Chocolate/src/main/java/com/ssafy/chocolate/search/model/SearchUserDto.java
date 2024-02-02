package com.ssafy.chocolate.search.model;

public class SearchUserDto {
    private Long userNo;
    private Long following;
    private Long follower;
    private Long streamingTime;
    private Long streamingCount;
    private String profileImagePath;
    private String nickname;
    private String introduction;

    public SearchUserDto(Long userNo, Long following, Long follower, Long streamingTime, Long streamingCount, String profileImagePath, String nickName, String introduction) {
        this.userNo = userNo;
        this.following = following;
        this.follower = follower;
        this.streamingTime = streamingTime;
        this.streamingCount = streamingCount;
        this.profileImagePath = profileImagePath;
        this.nickname = nickName;
        this.introduction = introduction;
    }

    public Long getUserNo() {
        return userNo;
    }

    public void setUserNo(Long userNo) {
        this.userNo = userNo;
    }

    public Long getFollowing() {
        return following;
    }

    public void setFollowing(Long following) {
        this.following = following;
    }

    public Long getFollower() {
        return follower;
    }

    public void setFollower(Long follower) {
        this.follower = follower;
    }

    public Long getStreamingTime() {
        return streamingTime;
    }

    public void setStreamingTime(Long streamingTime) {
        this.streamingTime = streamingTime;
    }

    public Long getStreamingCount() {
        return streamingCount;
    }

    public void setStreamingCount(Long streamingCount) {
        this.streamingCount = streamingCount;
    }

    public SearchUserDto() {
    }

    public String getProfileImagePath() {
        return profileImagePath;
    }

    public void setProfileImagePath(String profileImagePath) {
        this.profileImagePath = profileImagePath;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }
}
