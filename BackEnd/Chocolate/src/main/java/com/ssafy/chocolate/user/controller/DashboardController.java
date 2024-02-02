package com.ssafy.chocolate.user.controller;


import com.ssafy.chocolate.common.security.AdminAuthorize;
import com.ssafy.chocolate.common.security.UserAuthorize;
import com.ssafy.chocolate.user.model.Member;
import com.ssafy.chocolate.user.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/api")
public class DashboardController {

    private final MemberRepository userRepository;

    @Autowired
    public DashboardController(MemberRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<?> dashboard(@AuthenticationPrincipal User user) {
        // Spring Security로부터 로그인한 사용자 정보를 가져옵니다.
        String loginId = user.getUsername();

        // MySQL에서 사용자 정보를 조회합니다.
        Optional<Member> userEntity = userRepository.findByEmail(loginId);

        if (userEntity.isEmpty()) {
            // 사용자 정보를 찾지 못한 경우 오류 응답을 반환하거나 처리합니다.
            return ResponseEntity.status(404).body("사용자 정보를 찾을 수 없습니다.");
        }

        // 사용자 정보와 권한을 JSON 형식으로 응답합니다.
        return ResponseEntity.ok().body(
                Map.of(
                        "loginId", loginId,
                        "loginRoles", user.getAuthorities(),
                        "additionalInfo", userEntity // 사용자 엔티티를 추가 정보로 포함할 수 있습니다.
                )
        );
    }

    @GetMapping("/dashboard_test")
    public ResponseEntity<?> dashboard_test() {
        // Spring Security로부터 로그인한 사용자 정보를 가져옵니다.
        String loginId = "user1@example.com";

        // MySQL에서 사용자 정보를 조회합니다.
        Optional<Member> userEntity = userRepository.findByEmail(loginId);

        if (userEntity.isEmpty()) {
            // 사용자 정보를 찾지 못한 경우 오류 응답을 반환하거나 처리합니다.
            return ResponseEntity.status(404).body("사용자 정보를 찾을 수 없습니다.");
        }

        // 사용자 정보와 권한을 JSON 형식으로 응답합니다.
        return ResponseEntity.ok().body(
                Map.of(
                        "loginId", loginId,
                        "additionalInfo", userEntity // 사용자 엔티티를 추가 정보로 포함할 수 있습니다.
                )
        );
    }

    @GetMapping("/setting/admin")
    @AdminAuthorize
    public ResponseEntity<?> adminSetting() {
        return ResponseEntity.ok().body("Admin setting page content...");
    }

    @GetMapping("/setting/user")
    @UserAuthorize
    public ResponseEntity<?> userSetting() {
        return ResponseEntity.ok().body("User setting page content...");
    }

}
