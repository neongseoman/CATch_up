package com.ssafy.chocolate.video.repository;

import com.ssafy.chocolate.video.model.LiveStreamSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LiveStreamSessionJpaRepository extends JpaRepository<LiveStreamSession, Integer> {
    List<LiveStreamSession> findByUserNo(int userNo);
    List<LiveStreamSession> findByUserNoAndEndTimeIsNull(Long userNo);
}
