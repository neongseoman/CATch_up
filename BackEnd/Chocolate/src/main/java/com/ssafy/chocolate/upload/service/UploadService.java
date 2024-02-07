package com.ssafy.chocolate.upload.service;

import com.ssafy.chocolate.upload.model.UserInfoDto;
import com.ssafy.chocolate.upload.repository.UserInfoRepository;
import com.ssafy.chocolate.user.model.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Optional;
import java.util.UUID;

@Service
public class UploadService {
    @Autowired
    private UserInfoRepository userInfoRepository;

    // @Value("${upload.path}") // application.properties에서 경로 설정
    // private String uploadPath = "upload";
    private String uploadImagePath = "upload/profile";
    private String uploadShortsPath = "upload/shorts";



    public String uploadImage(MultipartFile file, int userNo) throws IOException {
        System.out.println("업로드 진입");

        String filename = userNo + "." + file.getContentType().toString().split("/")[1];
        System.out.println("파일명: " + filename);
        Path targetLocation = Path.of(uploadImagePath, filename);

        try{
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
        }catch (Exception e) {
            e.printStackTrace();
        }

        Optional<Member> userInfo = userInfoRepository.findById(Long.valueOf(userNo));
        if (userInfo != null) {
            userInfo.get().setProfileImagePath("/" + uploadImagePath + "/" + filename);
            userInfoRepository.save(userInfo.get());
        }else {
            System.out.println("유저 못찾음");
        }

        return "/" + uploadImagePath + "/" + filename;
    }


    public String uploadShorts(MultipartFile videoFile, int userNo) throws IOException {
        System.out.println("동영상 업로드 진입");

        String filename = UUID.randomUUID().toString() + videoFile.getOriginalFilename();

        filename = filename.replaceAll("[^a-zA-Z0-9.-]", "_");

        System.out.println("파일명: " + filename);

        Path targetLocation = Path.of(uploadShortsPath, filename);

        try {
            Files.copy(videoFile.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
        } catch (Exception e) {
            e.printStackTrace();
        }

//        Optional<Member> userInfo = userInfoRepository.findById(Long.valueOf(userNo));
//        if (userInfo.isPresent()) {
//            userInfo.get().setVideoPath("/" + uploadPath + "/" + filename);
//            userInfoRepository.save(userInfo.get());
//        } else {
//            System.out.println("유저 못찾음");
//        }

        return "/" + uploadShortsPath + "/" + filename;
    }

}
