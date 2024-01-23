package com.ssafy.chocolate.userservice.controller;

import com.ssafy.chocolate.userservice.dto.MemberJoinDto;
import com.ssafy.chocolate.userservice.service.RegisterMemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthorizationController {

    private final RegisterMemberService registerMemberService;

    public AuthorizationController(RegisterMemberService registerMemberService) {
        this.registerMemberService = registerMemberService;
    }


    @PostMapping("/join")
    public ResponseEntity<String> join(@RequestBody MemberJoinDto dto) {
        try {
            registerMemberService.join(dto.getUserid(), dto.getPw());
            return ResponseEntity.ok("join success");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
