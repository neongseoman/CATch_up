package com.ssafy.chocolate.search.controller;

import com.ssafy.chocolate.search.model.LiveStreamSessionDto;
import com.ssafy.chocolate.search.model.SearchUserDto;
import com.ssafy.chocolate.search.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SearchController {

    @Autowired
    private SearchService searchService;

    @GetMapping("/searchStreaming")
    public Page<LiveStreamSessionDto> searchStreaming(@RequestParam("query") String query,
                                        @RequestParam(defaultValue = "0") int page,
                                        @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);

        Page<LiveStreamSessionDto> searchResult = searchService.searchStreaming(query, pageable);

        return searchResult;
    }


    @GetMapping("/searchUser")
    public Page<SearchUserDto> searchUser(@RequestParam("query") String query,
                                                      @RequestParam(defaultValue = "0") int page,
                                                      @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);

        Page<SearchUserDto> searchResult = searchService.searchUser(query, pageable);

        return searchResult;
    }


}
