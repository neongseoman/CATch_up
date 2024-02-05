package com.ssafy.chocolate.user.repository;


import com.ssafy.chocolate.user.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmail(String email);

    @Query("SELECT u.id FROM Member u WHERE u.email = :username")
    Long findUserIdByUsername(String username);
}
