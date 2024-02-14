package com.ssafy.chocolate.user.service;

import com.ssafy.chocolate.user.model.Member;
import com.ssafy.chocolate.user.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository repository;

    @Autowired
    public MemberService(MemberRepository repository) {
        this.repository = repository;
    }

    public Optional<Member> findOne(String email) {
        return repository.findByEmail(email);
    }
    public Optional<Member> getMember(Long id) {
        Optional<Member> optionalMember = repository.findById(id);
        System.out.println(optionalMember.get());

        if (optionalMember.isPresent()) {
            Member m = optionalMember.get();
            m.setPassword(null); // 패스워드는 보내주지 않음
            return Optional.of(m);
        } else {
            return Optional.empty();
        }
    }


    public Optional<Member> getMemberByEmail(String email) {

        Optional<Member> optionalMember = repository.findByEmail(email);
        System.out.println(optionalMember.get());

        if (optionalMember.isPresent()) {
            Member m = optionalMember.get();
            m.setPassword(null); // 패스워드는 보내주지 않음
            return Optional.of(m);
        } else {
            return Optional.empty();
        }

    }
}
