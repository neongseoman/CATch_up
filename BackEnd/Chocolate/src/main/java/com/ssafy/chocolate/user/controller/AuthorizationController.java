package com.ssafy.chocolate.user.controller;

import com.ssafy.chocolate.common.security.AdminAuthorize;
import com.ssafy.chocolate.common.security.UserAuthorize;
import com.ssafy.chocolate.user.model.LoginDto;
import com.ssafy.chocolate.user.model.MemberJoinDto;
import com.ssafy.chocolate.user.service.RegisterMemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api/user")
public class AuthorizationController {

    private final RegisterMemberService registerMemberService;

    public AuthorizationController(RegisterMemberService registerMemberService) {
        this.registerMemberService = registerMemberService;
    }


    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody MemberJoinDto dto) {
        Map<String, String> response = new HashMap<>();
        try {
            registerMemberService.join(dto.getUserid(), dto.getPw());
            response.put("message", "join success");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "duplicated id");
            return ResponseEntity.ok(response);
//            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
//    @GetMapping("/dashboard")
//    public ResponseEntity<?> dashboard(@AuthenticationPrincipal User user) {
//        // 사용자 정보와 권한을 JSON 형식으로 반환
//        return ResponseEntity.ok().body(
//                Map.of(
//                        "loginId", user.getUsername(),
//                        "loginRoles", user.getAuthorities()
//                )
//        );
//    }
//

