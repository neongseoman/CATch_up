package com.ssafy.chocolate.video.service;

import com.ssafy.chocolate.video.model.StreamShortClips;
import com.ssafy.chocolate.video.repository.ShortsJpaRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShortsService {

    @Autowired
    ShortsJpaRepository shortsJpaRepository;
    public void createShortsClip(StreamShortClips streamShortClip) {
        shortsJpaRepository.save(streamShortClip);
    }

    public StreamShortClips getShorts(Long streamNo) {
        return shortsJpaRepository.findByStreamNo(streamNo);
    }

    @Transactional
    public void updateShortsClip(Long streamNo, StreamShortClips updatedStreamShortClip) {
        StreamShortClips existingStreamShortClip = shortsJpaRepository.findByStreamNo(streamNo);

        if (existingStreamShortClip != null) {
            existingStreamShortClip.setTitle(updatedStreamShortClip.getTitle());
            existingStreamShortClip.setIntroduction(updatedStreamShortClip.getIntroduction());

            shortsJpaRepository.save(existingStreamShortClip);
        }
    }


    @Transactional
    public void deleteShortsClip(Long streamNo) {
        shortsJpaRepository.deleteByStreamNo(streamNo);
    }

}
