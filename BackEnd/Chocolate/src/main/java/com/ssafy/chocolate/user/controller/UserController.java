package com.ssafy.chocolate.user.controller;

import com.ssafy.chocolate.user.model.Member;
import com.ssafy.chocolate.user.repository.MemberRepository;
import com.ssafy.chocolate.user.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins="http://localhost:3000,https://i10a105.p.ssafy.io")
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    MemberRepository memberRepository;
    @Autowired
    MemberService memberService;

    @GetMapping("/profile")
    Optional<Member> getMember(@RequestParam Long id) {
        return memberService.getMember(id);
    }
}
