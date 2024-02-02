package com.ssafy.chocolate.upload.repository;

import com.ssafy.chocolate.upload.model.ImageDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UploadRepository extends JpaRepository<ImageDto, Long> {
}
