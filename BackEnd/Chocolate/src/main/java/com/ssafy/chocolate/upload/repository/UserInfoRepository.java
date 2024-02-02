package com.ssafy.chocolate.upload.repository;

import com.ssafy.chocolate.upload.model.UserInfoDto;
import com.ssafy.chocolate.user.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserInfoRepository extends JpaRepository<Member, Long> {
}