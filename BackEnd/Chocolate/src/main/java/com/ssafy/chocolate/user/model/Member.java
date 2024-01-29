package com.ssafy.chocolate.user.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.crypto.password.PasswordEncoder;

@Entity
@Getter
@Setter
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String userid;

    private String pw;

    private String roles;

    private String following;
    private String follower;
    private String airtime;


    public Member(Long id, String userid, String pw, String roles, String following, String follower, String airtime) {
        this.id = id;
        this.userid = userid;
        this.pw = pw;
        this.roles = roles;
        this.following = following;
        this.follower = follower;
        this.airtime = airtime;
    }

    protected Member() {}

    public static Member createUser(String userId, String pw, PasswordEncoder passwordEncoder) {
        return new Member(null, userId, passwordEncoder.encode(pw), "USER","0","0","0");
    }

}
