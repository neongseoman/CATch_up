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
}
