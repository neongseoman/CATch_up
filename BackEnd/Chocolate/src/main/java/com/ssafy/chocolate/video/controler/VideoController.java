package com.ssafy.chocolate.video.controler;

import com.ssafy.chocolate.video.model.LiveStreamSession;
import com.ssafy.chocolate.video.repository.LiveStreamSessionJpaRepository;
import com.ssafy.chocolate.video.service.LiveStreamSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins="http://localhost:3000,https://i10a105.p.ssafy.io")
@RestController
@RequestMapping("/api")
public class VideoController {

    private final LiveStreamSessionJpaRepository liveStreamSessionRepository;
    private final LiveStreamSessionService liveStreamSessionService;

    @Autowired
    public VideoController(LiveStreamSessionService liveStreamSessionService,
                           LiveStreamSessionJpaRepository liveStreamSessionRepository) {
        this.liveStreamSessionRepository = liveStreamSessionRepository;
        this.liveStreamSessionService = liveStreamSessionService;
    }

    @GetMapping("streamingHistory")
    public List<LiveStreamSession> getStreamingHistoryByUserNo(@RequestParam("userNo") int userNo) {
        return liveStreamSessionRepository.findByUserNo(userNo);
    }


    @PostMapping("/create")
    public LiveStreamSession createLiveStreamSession(@RequestBody LiveStreamSession liveStreamSession) {
        // 클라이언트로부터 받은 LiveStreamSession 데이터를 사용하여 데이터베이스에 삽입
        return liveStreamSessionService.createLiveStreamSession(liveStreamSession);
    }
}
