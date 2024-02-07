package com.ssafy.chocolate.comment.repository;

import com.ssafy.chocolate.comment.model.StreamComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface StreamCommentRepository extends JpaRepository<StreamComment, Integer> {
    List<StreamComment> findByStreamNo(Integer streamNo);
    boolean existsByStreamNoAndUserNo(Integer streamNo, Long userNo);

    @Transactional
    @Modifying
    @Query("DELETE FROM StreamComment c WHERE c.streamNo = :streamNo AND c.userNo = :userNo")
    void deleteByCommentNoAndUserNo(Integer streamNo, Long userNo);
}