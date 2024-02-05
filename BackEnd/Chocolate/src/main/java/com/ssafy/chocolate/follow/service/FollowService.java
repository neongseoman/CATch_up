package com.ssafy.chocolate.follow.service;

import com.ssafy.chocolate.follow.model.Follow;
import com.ssafy.chocolate.follow.repository.FollowRepository;
import com.ssafy.chocolate.user.model.Member;
import com.ssafy.chocolate.user.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FollowService {

    @Autowired
    private FollowRepository followRepository;

    @Autowired
    private MemberRepository userRepository;

    // 팔로우
    public void follow(Long followerId, Long followingId) {
        Member follower = userRepository.findById(followerId).orElseThrow(()->new RuntimeException("Follower not found"));
        Member following = userRepository.findById(followingId).orElseThrow(()->new RuntimeException("Following not found"));

        Follow follow = new Follow();
        follow.setFollower(follower);
        follow.setFollowing(following);

        followRepository.save(follow);
    }

    // 언팔로우
    public void unfollow(Long followerId, Long followingId) {
        Follow follow = followRepository.findByFollowerIdAndFollowingId(followerId, followingId)
                .orElseThrow(() -> new RuntimeException("Follow not found"));
        followRepository.delete(follow);
    }

    // UserDetails에서 사용자명을 받아 사용자 ID를 찾는 메소드
    public Long findUserIdByUsername(String username) {
        return userRepository.findUserIdByUsername(username);
    }

    // 팔로잉 수
    public Long countFollowings(Long userId) {
        return followRepository.countByFollowerId(userId);
    }

    // 팔로워 수
    public Long countFollowers(Long userId) {
        return followRepository.countByFollowingId(userId);
    }

    // 현재 사용자가 특정 사용자를 팔로우하고 있는지 확인하는 메서드
    public boolean isFollowing(Long followerId, Long followingId) {
        return followRepository.existsByFollowerIdAndFollowingId(followerId, followingId);
    }
}
