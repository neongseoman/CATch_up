package com.ssafy.chocolate.follow.repository;

import com.ssafy.chocolate.follow.model.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    Long countByFollowerId(Long followerId);
    Long countByFollowingId(Long followingId);
    Optional<Follow> findByFollowerIdAndFollowingId(Long followerId, Long followingId);

    // 현재 사용자가 특정 사용자를 팔로우하고 있는지 확인
    boolean existsByFollowerIdAndFollowingId(Long followerId, Long followingId);

}
