package com.ssafy.chocolate.kurento.controller;

import com.ssafy.chocolate.kurento.dto.StreamingInfoDto;

import com.ssafy.chocolate.kurento.service.Busking;
import com.ssafy.chocolate.kurento.service.IceMessageSendService;
import com.ssafy.chocolate.user.repository.MemberRepository;
import com.ssafy.chocolate.video.model.LiveStreamSession;
import com.ssafy.chocolate.video.repository.LiveStreamSessionJpaRepository;
import com.ssafy.chocolate.video.service.LiveStreamSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api")
public class LiveStreamSessionController {

    @Autowired
    private LiveStreamSessionService service;
    @Autowired
    private LiveStreamSessionJpaRepository liveStreamSessionJpaRepository;
    @Autowired
    private MemberRepository userRepository;

    @PostMapping("/create-busking")
    public ResponseEntity<?> saveLiveStreamInfo(@AuthenticationPrincipal User userDetail, @RequestBody StreamingInfoDto dto) {
        String email = userDetail.getUsername();

        LiveStreamSession session = new LiveStreamSession();
        session.setUserNo(userRepository.findUserIdByUsername(email));

        if (dto.getGeoLocation() != null) {
            session.setLatitude(dto.getGeoLocation().getLatitude());
            session.setLongitude(dto.getGeoLocation().getLongitude());

        } else {
            session.setLatitude(0.0);
            session.setLongitude(0.0);
        }

        session.setCategory(dto.getBuskingHashtag());
        session.setIntroduction(dto.getBuskingInfo());
        session.setStartTime(LocalDateTime.now());
        session.setTitle(dto.getBuskingTitle());

        LiveStreamSession savedSession = service.createLiveStreamSession(session);
        return ResponseEntity.ok(savedSession);
    }

    @GetMapping("/user/{userNo}/active")
    public ResponseEntity<List<LiveStreamSession>> getActiveSessionsByUserNo(@PathVariable Long userNo) {
        List<LiveStreamSession> sessions = liveStreamSessionJpaRepository.findByUserNoAndEndTimeIsNull(userNo);
        return ResponseEntity.ok(sessions);
    }

}
