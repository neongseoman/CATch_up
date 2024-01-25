package com.ssafy.chocolate.search.repository;

import com.ssafy.chocolate.search.model.LiveStreamSessionDto;
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

        String sql = "SELECT * FROM live_stream_sessions " +
                "WHERE MATCH(title) AGAINST (? IN NATURAL LANGUAGE MODE) " +
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

                    return session;
                }
        );

        Page<LiveStreamSessionDto> searchResultPage = new PageImpl<>(
                searchResults, pageable, totalResults);

        return searchResultPage;
    }

}
