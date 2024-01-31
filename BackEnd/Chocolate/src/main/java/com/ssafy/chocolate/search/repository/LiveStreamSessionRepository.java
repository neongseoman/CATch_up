package com.ssafy.chocolate.search.repository;

import com.ssafy.chocolate.search.model.LiveStreamSessionDto;
import com.ssafy.chocolate.search.model.SearchShortsDto;
import com.ssafy.chocolate.search.model.SearchUserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.sql.Blob;
import java.util.List;

import org.springframework.jdbc.core.RowMapper;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.io.WKBReader;

@Repository
public class LiveStreamSessionRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Page<LiveStreamSessionDto> searchStreaming(String query, Pageable pageable) {

        int pageSize = pageable.getPageSize();
        int offset = (int)pageable.getOffset();

        String sql = "SELECT lss.*, ui.profile_image_path, ui.nickname " +
                "FROM live_stream_sessions lss " +
                "JOIN user_info ui ON lss.user_no = ui.user_no " +
                "WHERE MATCH(lss.title) AGAINST (? IN NATURAL LANGUAGE MODE) " +
                "LIMIT ? OFFSET ?";

        int totalResults = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM live_stream_sessions " +
                        "WHERE MATCH(title) AGAINST (? IN NATURAL LANGUAGE MODE)",
                new Object[]{query},
                Integer.class
        );

        List<LiveStreamSessionDto> searchResults = jdbcTemplate.query(
                sql,
                new Object[]{query, pageSize, offset},
                (resultSet, rowNum) -> {
                    LiveStreamSessionDto session = new LiveStreamSessionDto();
                    session.setId(resultSet.getLong("stream_no"));
                    session.setUserNo(resultSet.getLong("user_no"));
                    session.setStartTime(resultSet.getTimestamp("start_time").toLocalDateTime());
                    session.setEndTime(resultSet.getTimestamp("end_time").toLocalDateTime());


                    session.setLatitude(resultSet.getBigDecimal("latitude"));
                    session.setLongitude(resultSet.getBigDecimal("longitude"));
                    session.setLocation(resultSet.getString("location"));

                    session.setTitle(resultSet.getString("title"));
                    session.setIntroduction(resultSet.getString("introduction"));
                    session.setCategory(resultSet.getString("category"));
                    session.setMaxViewer(resultSet.getInt("max_viewer"));

                    session.setProfileImagePath(resultSet.getString("ui.profile_image_path"));
                    session.setNickName(resultSet.getString("ui.nickname"));


                    return session;
                }
        );

        Page<LiveStreamSessionDto> searchResultPage = new PageImpl<>(
                searchResults, pageable, totalResults);

        return searchResultPage;
    }



    public Page<SearchUserDto> searchUser(String query, Pageable pageable) {

        int pageSize = pageable.getPageSize();
        int offset = (int)pageable.getOffset();

        String sql = "SELECT * " +
                "FROM user_info " +
                "WHERE MATCH(nickname) AGAINST (? IN NATURAL LANGUAGE MODE) " +
                "LIMIT ? OFFSET ?";

        int totalResults = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM user_info " +
                        "WHERE MATCH(nickname) AGAINST (? IN NATURAL LANGUAGE MODE)",
                new Object[]{query},
                Integer.class
        );

        List<SearchUserDto> searchResults = jdbcTemplate.query(
                sql,
                new Object[]{query, pageSize, offset},
                (resultSet, rowNum) -> {
                    SearchUserDto user = new SearchUserDto();
                    user.setNickName(resultSet.getString("nickname"));
                    user.setProfileImagePath(resultSet.getString("profile_image_path"));
                    user.setIntroduction(resultSet.getString("introduction"));


                    user.setStreamingTime(resultSet.getLong("streaming_time"));
                    user.setStreamingCount(resultSet.getLong("streaming_count"));
                    user.setUserNo(resultSet.getLong("user_no"));
                    user.setFollower(resultSet.getLong("follower"));
                    user.setFollowing(resultSet.getLong("following"));
                    return user;
                }
        );

        Page<SearchUserDto> searchResultPage = new PageImpl<>(
                searchResults, pageable, totalResults);

        return searchResultPage;
    }
    public Page<SearchShortsDto> searchShorts(String query, Pageable pageable) {

        int pageSize = pageable.getPageSize();
        int offset = (int)pageable.getOffset();

        String sql = "SELECT * " +
                "FROM stream_short_clips " +
                "WHERE MATCH(title) AGAINST (? IN NATURAL LANGUAGE MODE) " +
                "LIMIT ? OFFSET ?";

        int totalResults = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM stream_short_clips " +
                        "WHERE MATCH(title) AGAINST (? IN NATURAL LANGUAGE MODE)",
                new Object[]{query},
                Integer.class
        );

        List<SearchShortsDto> searchResults = jdbcTemplate.query(
                sql,
                new Object[]{query, pageSize, offset},
                (resultSet, rowNum) -> {
                    SearchShortsDto shorts = new SearchShortsDto();

                    shorts.setStreamNo(resultSet.getLong("stream_no"));
                    shorts.setUserNo(resultSet.getLong("user_no"));
                    shorts.setLikes(resultSet.getLong("likes"));
                    shorts.setComments(resultSet.getLong("comments"));
                    shorts.setViews(resultSet.getLong("views"));
                    shorts.setMaxViews(resultSet.getLong("max_views"));
                    shorts.setTitle(resultSet.getString("title"));
                    shorts.setShortsPath(resultSet.getString("shorts_path"));
                    shorts.setIntroduction(resultSet.getString("introduction"));
                    shorts.setCreatedTime(resultSet.getTimestamp("created_time").toLocalDateTime());
                    shorts.setStreamedTime(resultSet.getTimestamp("streamed_time").toLocalDateTime());
                    shorts.setStreamingTime(resultSet.getLong("streaming_time"));

                    return shorts;
                }
        );

        Page<SearchShortsDto> searchResultPage = new PageImpl<>(
                searchResults, pageable, totalResults);

        return searchResultPage;
    }



}
