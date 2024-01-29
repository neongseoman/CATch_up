package com.ssafy.chocolate.common.config.userconfig;

import org.springframework.context.annotation.Configuration;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

@Configuration
@EnableRedisHttpSession
public class RedisConfig {
    // 추가적인 Redis 설정 (필요한 경우)
}
