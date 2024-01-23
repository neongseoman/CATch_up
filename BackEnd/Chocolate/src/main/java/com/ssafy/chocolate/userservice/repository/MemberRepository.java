package com.ssafy.chocolate.userservice.repository;


import com.ssafy.chocolate.userservice.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByUserid(String userId);
}
