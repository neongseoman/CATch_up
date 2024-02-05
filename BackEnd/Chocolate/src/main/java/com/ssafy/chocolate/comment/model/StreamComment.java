package com.ssafy.chocolate.comment.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "stream_comments")
public class StreamComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentNo;

    private Long streamNo;
    private Long userNo;
    private String comments;
    private Integer likes;

    @Column(name = "created_time")
    private LocalDateTime createdTime;
}
