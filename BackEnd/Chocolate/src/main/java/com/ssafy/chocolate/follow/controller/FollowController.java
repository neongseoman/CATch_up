package com.ssafy.chocolate.follow.controller;

import com.ssafy.chocolate.follow.service.FollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class FollowController {

    @Autowired
    private FollowService followService;

    /**
     * 로그인한 사용자가 다른 사용자를 팔로우합니다.
     *
     * @param principal 로그인한 사용자의 정보
     * @param followingUsername 팔로우할 사용자의 email
     * @return ResponseEntity 상태 코드를 반환합니다. 성공적으로 처리되면 HTTP 200 OK를 반환합니다.
     */
    @PostMapping("/follow/{followingUsername}")
    public ResponseEntity<?> follow(@AuthenticationPrincipal UserDetails principal, @PathVariable String followingUsername) {
        String username = principal.getUsername();
        Long followerId = followService.findUserIdByUsername(username);
        Long followingId = followService.findUserIdByUsername(followingUsername);
        System.out.println("-------------------------------");
        System.out.println(username + " "+ followingUsername);
        System.out.println(followerId + " " + followingId);
        System.out.println("-------------------------------");
        followService.follow(followerId, followingId);
        return ResponseEntity.ok().build();
    }

    /**
     * 로그인한 사용자가 다른 사용자의 팔로우를 해제합니다.
     *
     * @param principal 로그인한 사용자의 정보
     * @param followingUsername 팔로우를 해제할 사용자의 ID
     * @return ResponseEntity 상태 코드를 반환합니다. 성공적으로 처리되면 HTTP 200 OK를 반환합니다.
     */
    @DeleteMapping("/unfollow/{followingUsername}")
    public ResponseEntity<?> unfollow(@AuthenticationPrincipal UserDetails principal, @PathVariable String followingUsername) {
        String username = principal.getUsername();
        Long followerId = followService.findUserIdByUsername(username);
        Long followingId = followService.findUserIdByUsername(followingUsername);
        followService.unfollow(followerId, followingId);
        return ResponseEntity.ok().build();
    }


    // 로그인한 사용자의 ID를 UserDetails에서 추출하는 메소드 (구현 필요)
    private Long getUserIdFromPrincipal(UserDetails principal) {
        // UserDetails에서 사용자 ID 추출 로직 구현
        // 예시로, principal.getUsername()을 사용자 ID로 가정합니다.
        // 실제 사용자 ID 추출 방식은 애플리케이션의 사용자 인증 방식에 따라 다를 수 있습니다.
        String username = principal.getUsername();
        Long id = followService.findUserIdByUsername(username);

        return Long.parseLong(principal.getUsername());
    }

    // 팔로잉 및 팔로워 수 조회 기능은 변경 없음
    @GetMapping("/{username}/followings/count")
    public ResponseEntity<Long> countFollowings(@PathVariable String username) {
        Long followerId = followService.findUserIdByUsername(username);
        return ResponseEntity.ok(followService.countFollowings(followerId));
    }

    @GetMapping("/{username}/followers/count")
    public ResponseEntity<Long> countFollowers(@PathVariable String username) {
        Long followerId = followService.findUserIdByUsername(username);
        return ResponseEntity.ok(followService.countFollowers(followerId));
    }
}
