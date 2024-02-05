package com.ssafy.chocolate.video.controler;

import com.ssafy.chocolate.video.model.LiveStreamSession;
import com.ssafy.chocolate.video.repository.LiveStreamSessionJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins="http://localhost:3000,https://i10a105.p.ssafy.io")
@RestController
@RequestMapping("/api")
public class VideoController {

    private final LiveStreamSessionJpaRepository liveStreamSessionRepository;

    @Autowired
    public VideoController(LiveStreamSessionJpaRepository liveStreamSessionRepository) {
        this.liveStreamSessionRepository = liveStreamSessionRepository;
    }

    @GetMapping("streamingHistory")
    public List<LiveStreamSession> getStreamingHistoryByUserNo(@RequestParam("userNo") int userNo) {
        return liveStreamSessionRepository.findByUserNo(userNo);
    }
}
