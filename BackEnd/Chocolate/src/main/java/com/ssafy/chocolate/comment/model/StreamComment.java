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
    private Integer commentNo;

    @Column(nullable = false)
    private Integer streamNo;

    @Column(nullable = false)
    private Long userNo;

    @Column(length = 255)
    private String comments;

    private Integer likes;

    private LocalDateTime createdTime;
}