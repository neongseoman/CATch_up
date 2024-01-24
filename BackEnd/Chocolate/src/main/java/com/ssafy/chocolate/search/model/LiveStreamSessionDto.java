package com.ssafy.chocolate.search.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "live_stream_sessions")
public class LiveStreamSessionDto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stream_no")
    private Long id;

    @Column(name = "user_no", nullable = false)
    private Long userNo;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;



    @Column(name = "latitude")
    private BigDecimal latitude;

    @Column(name = "longitude")
    private BigDecimal longitude;

    @Column(name = "location")
    private String location;

    @Column(name = "title", length = 255)
    private String title;

    @Column(name = "introduction", length = 255)
    private String introduction;

    @Column(name = "category", length = 255)
    private String category;

    @Column(name = "max_viewer")
    private Integer maxViewer;

    public LiveStreamSessionDto(Long id, Long userNo, LocalDateTime startTime, LocalDateTime endTime, BigDecimal latitude, BigDecimal longitude, String location, String title, String introduction, String category, Integer maxViewer) {
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
