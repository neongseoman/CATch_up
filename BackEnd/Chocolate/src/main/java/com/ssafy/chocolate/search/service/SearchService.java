package com.ssafy.chocolate.search.service;

import com.ssafy.chocolate.search.model.LiveStreamSessionDto;
import com.ssafy.chocolate.search.repository.LiveStreamSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SearchService {
    @Autowired
    LiveStreamSessionRepository liveStreamSessionRepository;

    public Page<LiveStreamSessionDto> searchStreaming(String query, Pageable pageable) {

        Page<LiveStreamSessionDto> searchResultPage = liveStreamSessionRepository.searchStreaming(query, pageable);

        return searchResultPage;
    }

    private List<String> generateSearchResults(String query, int start, int end) {
        List<String> results = new ArrayList<>();
        for (int i = start; i < end; i++) {
            results.add(query + " 검색 결과 " + (i + 1));
        }
        return results;
    }
}
