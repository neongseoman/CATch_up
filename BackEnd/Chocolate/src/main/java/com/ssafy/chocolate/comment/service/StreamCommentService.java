package com.ssafy.chocolate.comment.service;

import com.ssafy.chocolate.comment.model.StreamComment;
import com.ssafy.chocolate.comment.repository.StreamCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StreamCommentService {

    @Autowired
    private StreamCommentRepository repository;

    public List<StreamComment> findAllComments() {
        return repository.findAll();
    }

    public Optional<StreamComment> findCommentById(Long id) {
        return repository.findById(id);
    }

    public StreamComment saveComment(StreamComment comment) {
        return repository.save(comment);
    }

    public void deleteComment(Long id) {
        repository.deleteById(id);
    }

    public boolean canEditOrDeleteComment(Long commentId, Long userId) {
        return repository.findById(commentId)
                .map(comment -> comment.getUserNo().equals(userId)) // 댓글의 userNo와 요청한 사용자 ID 비교
                .orElse(false); // 댓글이 존재하지 않는 경우, 권한 없음
    }

}
