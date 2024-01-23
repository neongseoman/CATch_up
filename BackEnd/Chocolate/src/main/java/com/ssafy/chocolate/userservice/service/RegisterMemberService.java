package com.ssafy.chocolate.userservice.service;

import com.ssafy.chocolate.userservice.domain.Member;
import com.ssafy.chocolate.userservice.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegisterMemberService {
    private final PasswordEncoder passwordEncoder;
    private final MemberRepository repository;

    @Autowired
    public RegisterMemberService(PasswordEncoder passwordEncoder, MemberRepository repository) {
        this.passwordEncoder = passwordEncoder;
        this.repository = repository;
    }

    public void join(String userid, String pw) {
        Member member = Member.createUser(userid, pw, passwordEncoder);
        validateDuplicateMember(member);
        repository.save(member);

    }

    private void validateDuplicateMember(Member member) {
        repository.findByUserid(member.getUserid())
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 존재하는 회원입니다.");
                });
    }
}
