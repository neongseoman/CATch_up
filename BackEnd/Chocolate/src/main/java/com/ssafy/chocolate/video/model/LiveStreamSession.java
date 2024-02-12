package com.ssafy.chocolate.video.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "live_stream_sessions")
public class LiveStreamSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stream_no")
    private Integer streamNo;

    @Column(name = "user_no")
    private Long userNo;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "location")
    private String location;

    @Column(name = "title")
    private String title;

    @Column(name = "introduction")
    private String introduction;

    @Column(name = "category")
    private String category;

    @Column(name = "max_viewer")
    private Integer maxViewer;


}
