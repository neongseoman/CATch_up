package com.ssafy.chocolate.video.model;

import com.ssafy.chocolate.user.model.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ShortClipWithUser {
    private StreamShortClips streamShortClips;
    private Member member;


}
