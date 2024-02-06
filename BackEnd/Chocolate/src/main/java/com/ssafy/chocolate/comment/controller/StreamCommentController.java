package com.ssafy.chocolate.comment.controller;

import com.ssafy.chocolate.comment.model.StreamComment;
import com.ssafy.chocolate.comment.service.StreamCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stream-comments")
public class StreamCommentController {

    @Autowired
    private StreamCommentService service;

    @GetMapping
    public ResponseEntity<List<StreamComment>> getAllComments() {
        return ResponseEntity.ok(service.findAllComments());
    }

    @PostMapping
    public ResponseEntity<StreamComment> createComment(@RequestBody StreamComment comment) {
        return ResponseEntity.ok(service.saveComment(comment));
    }

    @PutMapping("/{id}")
    public ResponseEntity<StreamComment> updateComment(@AuthenticationPrincipal UserDetails user, @PathVariable Long id, @RequestBody StreamComment comment) {
        // 권한 검사 로직
//        if (!service.canEditOrDeleteComment(id, user.getUsername())) {
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
//        }
        return ResponseEntity.ok(service.saveComment(comment));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable Long id) {
        // 권한 검사 로직 필요
        service.deleteComment(id);
        return ResponseEntity.ok().build();
    }
}
