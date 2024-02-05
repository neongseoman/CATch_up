package com.ssafy.chocolate.user.model;


import com.ssafy.chocolate.follow.model.Follow;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
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

    @OneToMany(mappedBy = "following")
    private Set<Follow> followers = new HashSet<>();

    @OneToMany(mappedBy = "follower")
    private Set<Follow> followings = new HashSet<>();

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

    public static Member createUser(String email, String password, PasswordEncoder passwordEncoder, String nickname) {
        return new Member(null, email, passwordEncoder.encode(password), nickname, null,
                LocalDateTime.now(), null, null, 0, 0, null, null, null,"USER");
    }

}
