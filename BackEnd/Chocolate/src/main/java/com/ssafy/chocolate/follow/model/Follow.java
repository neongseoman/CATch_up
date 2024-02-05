package com.ssafy.chocolate.follow.model;

import com.ssafy.chocolate.user.model.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user_follows")
public class Follow {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "follower_id")
    private Member follower; // 팔로우하는 사용자

    @ManyToOne
    @JoinColumn(name = "followed_id")
    private Member following; // 팔로우 당하는 사용자

    // 생성자, Getter, Setter
}
