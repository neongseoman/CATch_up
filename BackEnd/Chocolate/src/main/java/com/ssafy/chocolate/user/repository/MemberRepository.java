package com.ssafy.chocolate.user.repository;


import com.ssafy.chocolate.user.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByUserid(String userId);
}
