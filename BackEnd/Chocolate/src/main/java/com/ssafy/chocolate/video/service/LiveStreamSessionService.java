package com.ssafy.chocolate.video.service;

import com.ssafy.chocolate.video.model.LiveStreamSession;
import com.ssafy.chocolate.video.repository.LiveStreamSessionJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LiveStreamSessionService {

    private final LiveStreamSessionJpaRepository liveStreamSessionRepository;

    @Autowired
    public LiveStreamSessionService(LiveStreamSessionJpaRepository liveStreamSessionJpaRepository) {
        this.liveStreamSessionRepository = liveStreamSessionJpaRepository;
    }

    @Transactional
    public LiveStreamSession createLiveStreamSession(LiveStreamSession liveStreamSession) {
        return liveStreamSessionRepository.save(liveStreamSession);
    }

}
