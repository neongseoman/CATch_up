

package com.ssafy.chocolate.kurento;

import lombok.Getter;
import lombok.Setter;

import java.util.concurrent.ConcurrentHashMap;

@Getter
@Setter
public class UserMap<String,UserSession>{
    private ConcurrentHashMap<String, UserSession> audienceMap = new ConcurrentHashMap<>();

    public UserMap(String sessionId, UserSession userSession) {
        this.audienceMap.put(sessionId,userSession);
    }
}
