package com.ssafy.chocolate.upload.controller;

import com.ssafy.chocolate.upload.service.UploadService;
import com.ssafy.chocolate.user.model.Member;
import com.ssafy.chocolate.user.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/api/upload")
public class UploadController {
    @Autowired
    private UploadService imageService;
    private final MemberRepository userRepository;

    @Autowired
    public UploadController(MemberRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/image")
    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile image, @AuthenticationPrincipal User user) {
        try {

            String email = user.getUsername();
            Optional<Member> userEntity = userRepository.findByEmail(email);
            String imageUrl = imageService.uploadImage(image, userEntity.get().getId());
            return ResponseEntity.ok(imageUrl);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("이미지 업로드 중 오류 발생");
        }
    }

    @PostMapping("/shorts")
    public ResponseEntity<String> uploadShorts(@RequestParam("shorts") MultipartFile shorts, @AuthenticationPrincipal User user) {
        try {

            String email = user.getUsername();
            Optional<Member> userEntity = userRepository.findByEmail(email);
            String imageUrl = imageService.uploadShorts(shorts, userEntity.get().getId());
            return ResponseEntity.ok(imageUrl);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("이미지 업로드 중 오류 발생");
        }
    }
}
