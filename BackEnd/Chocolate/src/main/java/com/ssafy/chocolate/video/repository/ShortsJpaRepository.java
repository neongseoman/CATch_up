package com.ssafy.chocolate.video.repository;

import com.ssafy.chocolate.video.model.StreamShortClips;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShortsJpaRepository extends JpaRepository<StreamShortClips, Integer> {
    List<StreamShortClips> findByUserNo(Long userNo);
    StreamShortClips findByStreamNo(Long streamNo);
    void deleteByStreamNo(Long streamNo);
}
