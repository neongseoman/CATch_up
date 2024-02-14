package com.ssafy.chocolate.search.service;

import com.ssafy.chocolate.search.model.LiveStreamSessionDto;
import com.ssafy.chocolate.search.model.SearchShortsDto;
import com.ssafy.chocolate.search.model.SearchUserDto;
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


    public Page<SearchUserDto> searchUser(String query, Pageable pageable) {

        Page<SearchUserDto> searchResultPage = liveStreamSessionRepository.searchUser(query, pageable);

        return searchResultPage;
    }

    public Page<SearchShortsDto> searchShorts(String query, Pageable pageable) {

        Page<SearchShortsDto> searchResultPage = liveStreamSessionRepository.searchShorts(query, pageable);

        return searchResultPage;
    }


    public List<SearchShortsDto> getShortsByLikes() {

        List<SearchShortsDto> searchResultPage = liveStreamSessionRepository.getShortsByLikes();

        return searchResultPage;


    }
}
