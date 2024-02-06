package com.ssafy.chocolate.video.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StreamShortClips {

    @Id
    private Long streamNo;
    private Integer userNo;
    private String shortsPath;
    private Integer likes;
    private Integer comments;
    private String title;
    private String introduction;
    private Integer views;
    private Integer maxViews;
    private Date createdTime;
    private Date streamedTime;
    private Integer streamingTime;
}
