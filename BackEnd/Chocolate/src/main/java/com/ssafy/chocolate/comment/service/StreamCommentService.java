package com.ssafy.chocolate.comment.service;

import com.ssafy.chocolate.comment.model.StreamComment;
import com.ssafy.chocolate.comment.repository.StreamCommentRepository;
import com.ssafy.chocolate.user.model.Member;
import com.ssafy.chocolate.user.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class StreamCommentService {

    @Autowired
    private StreamCommentRepository streamCommentRepository;

    @Autowired
    private MemberRepository memberRepository;

    public List<StreamComment> getCommentsByStreamNo(Integer streamNo) {
        List<StreamComment> comments = streamCommentRepository.findByStreamNo(streamNo);
        List<StreamComment> outputData = new ArrayList<>();
        for(StreamComment s : comments) {
            Member member = memberRepository.findById(s.getUserNo()).get();
            s.setNickname(member.getNickname());
            outputData.add(s);

        }

        return outputData;
    }

    public Optional<StreamComment> createOrUpdateComment(StreamComment comment) {
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