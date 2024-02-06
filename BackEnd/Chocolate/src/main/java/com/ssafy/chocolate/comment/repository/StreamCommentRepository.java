package com.ssafy.chocolate.comment.repository;

import com.ssafy.chocolate.comment.model.StreamComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StreamCommentRepository extends JpaRepository<StreamComment, Long> {
}
