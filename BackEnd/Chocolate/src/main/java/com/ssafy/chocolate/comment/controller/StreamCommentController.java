package com.ssafy.chocolate.comment.controller;

import com.ssafy.chocolate.comment.model.StreamComment;
import com.ssafy.chocolate.comment.service.StreamCommentService;
import com.ssafy.chocolate.follow.service.FollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/stream-comments")
public class StreamCommentController {

    @Autowired
    private StreamCommentService streamCommentService;
    @Autowired
    private FollowService followService;

    @GetMapping("/{streamNo}")
    public List<StreamComment> getCommentsByStreamNo(@PathVariable Integer streamNo) {
        return streamCommentService.getCommentsByStreamNo(streamNo);
    }

    @PostMapping
    public StreamComment createOrUpdateComment(@AuthenticationPrincipal User user, @RequestBody StreamComment comment) {
        String username = user.getUsername();
        Long userNo = followService.findUserIdByUsername(username);
        comment.setUserNo(userNo);

        return streamCommentService.createOrUpdateComment(comment)
                .orElseThrow(() -> new IllegalStateException("Comment already exists or cannot be created"));
    }

    @DeleteMapping("/{streamNo}")
    public void deleteComment(@AuthenticationPrincipal User user, @PathVariable Integer streamNo, @RequestParam Long userNo) {
        String username = user.getUsername();
        Long userId = followService.findUserIdByUsername(username);
        if(Objects.equals(userId, userNo)){
            streamCommentService.deleteComment(streamNo, userId);
        }
    }
}