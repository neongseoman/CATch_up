package com.ssafy.chocolate.user.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "user_info")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_no")
    private Integer id;

    @Column(name = "user_email", unique = true, length = 50)
    private String email;

    @Column(name = "user_password", length = 64)
    private String password;

    @Column(length = 16)
    private String nickname;

    @Column(length = 16)
    private String category;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    private Integer following;
    private Integer follower;

    @Column(name = "streaming_time")
    private Integer streamingTime;

    @Column(name = "streaming_count")
    private Integer streamingCount;

    private String token;

    @Column(name = "profile_image_path", length = 255)
    private String profileImagePath;

    @Column(length = 255)
    private String introduction;

    private String roles;

    public Member(Integer id, String email, String password, String nickname, String category, LocalDateTime createdDate, Integer following, Integer follower, Integer streamingTime, Integer streamingCount, String token, String profileImagePath, String introduction, String roles) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.category = category;
        this.createdDate = createdDate;
        this.following = following;
        this.follower = follower;
        this.streamingTime = streamingTime;
        this.streamingCount = streamingCount;
        this.token = token;
        this.profileImagePath = profileImagePath;
        this.introduction = introduction;
        this.roles=roles;
    }

    protected Member() {}

    public static Member createUser(String email, String password, PasswordEncoder passwordEncoder) {
        return new Member(null, email, passwordEncoder.encode(password), null, null,
                LocalDateTime.now(), 0, 0, 0, 0, null, null, null,"USER");
    }

}
