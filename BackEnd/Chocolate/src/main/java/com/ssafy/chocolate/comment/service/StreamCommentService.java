package com.ssafy.chocolate.comment.service;

import com.ssafy.chocolate.comment.model.StreamComment;
import com.ssafy.chocolate.comment.repository.StreamCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class StreamCommentService {

    @Autowired
    private StreamCommentRepository streamCommentRepository;

    public List<StreamComment> getCommentsByStreamNo(Integer streamNo) {
        return streamCommentRepository.findByStreamNo(streamNo);
    }

    public Optional<StreamComment> createOrUpdateComment(StreamComment comment) {
        comment.setCreatedTime(LocalDateTime.now());
        if (!streamCommentRepository.existsByStreamNoAndUserNo(comment.getStreamNo(), comment.getUserNo())) {
            return Optional.of(streamCommentRepository.save(comment));
        } else {
            return Optional.empty();
        }
    }

    public void deleteComment(Integer commentNo, Long userNo) {
        System.out.println("commentNo: "+ commentNo+"userNo: "+userNo);
        streamCommentRepository.deleteByCommentNoAndUserNo(commentNo, userNo);
    }
}