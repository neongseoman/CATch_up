package com.ssafy.chocolate.video.controler;

import com.ssafy.chocolate.user.controller.UserController;
import com.ssafy.chocolate.user.model.Member;
import com.ssafy.chocolate.video.model.ShortClipWithUser;
import com.ssafy.chocolate.video.model.StreamShortClips;
import com.ssafy.chocolate.video.repository.ShortsJpaRepository;
import com.ssafy.chocolate.video.service.ShortsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins="http://localhost:3000,https://i10a105.p.ssafy.io")
@RestController
@RequestMapping("/api")
public class ShortsController {


    private final ShortsJpaRepository shortsJpaRepository;
    ShortsService shortsService;

    private final UserController userController;

    @Autowired
    public ShortsController(ShortsJpaRepository shortsJpaRepository,
                            UserController userController,
                            ShortsService shortsService) {
        this.shortsJpaRepository = shortsJpaRepository;
        this.userController = userController;
        this.shortsService = shortsService;
    }


    @PostMapping("/shorts")
    public void createShorts(@RequestBody StreamShortClips streamShortClip) {
        shortsService.createShortsClip(streamShortClip);
    }

    @GetMapping("/shorts/{streamNo}")
    public ResponseEntity<ShortClipWithUser> getShorts(@PathVariable Long streamNo) {
        StreamShortClips streamShortClips = shortsService.getShorts(streamNo);
        if (streamShortClips != null) {

            Member member = userController.getMember(Long.valueOf(streamShortClips.getUserNo())).get();
            return ResponseEntity.ok(new ShortClipWithUser(streamShortClips, member));

        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/shorts/{streamNo}")
    public void deleteShorts(@PathVariable Long streamNo) {
        shortsService.deleteShortsClip(streamNo);
    }

    @PutMapping("/shorts/{streamNo}")
    public ResponseEntity<String> updateShortsClip(
            @PathVariable Long streamNo,
            @RequestBody StreamShortClips updatedStreamShortClip) {

        shortsService.updateShortsClip(streamNo, updatedStreamShortClip);
        return ResponseEntity.ok("업데이트 성공");
    }
}
