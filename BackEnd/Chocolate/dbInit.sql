DROP DATABASE test_db;
CREATE DATABASE test_db;
USE test_db;

-- 사용자 정보를 저장하는 테이블
CREATE TABLE user_info (
    user_no INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_email VARCHAR(50) NULL,
    user_password CHAR(64) NULL,
    nickname VARCHAR(16) NULL,
    category VARCHAR(16) NULL,
    created_date DATETIME NULL,
    following INT NULL,
    follower INT NULL, 
    streaming_time INT NULL,
    streaming_count INT NULL,
    token VARCHAR(50) NULL,
    profile_image_path VARCHAR(255) NULL,
    introduction VARCHAR(255) NULL,
    roles varchar(50) NULL default "USER"
);

-- 사용자의 선호도를 저장하는 테이블(춤, 음악, 게임)
CREATE TABLE user_preferences (
    user_no INT NOT NULL,
    dance BOOLEAN NULL,
    music BOOLEAN NULL,
    game BOOLEAN NULL
);

-- 실시간 스트리밍 세션 정보를 저장하는 테이블
CREATE TABLE live_stream_sessions (
    stream_no INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_no INT NOT NULL,
    start_time DATETIME NULL,
    end_time DATETIME NULL,
    latitude DECIMAL(9,6) NULL,
    longitude DECIMAL(9,6) NULL,
    location VARCHAR(30) NULL,
    title VARCHAR(255) NULL,
    introduction VARCHAR(255) NULL,
    category VARCHAR(255) NULL,
    max_viewer INT NULL
);




ALTER TABLE user_info ADD INDEX idx_user_no (user_no);

-- 사용자 간의 팔로우 관계를 나타내는 테이블
CREATE TABLE user_follows (
    id BIGINT AUTO_INCREMENT,
    follower_id INT NOT NULL,
    followed_id INT NOT NULL,
    FOREIGN KEY (follower_id) REFERENCES user_info (user_no) ON DELETE CASCADE,
    FOREIGN KEY (followed_id) REFERENCES user_info (user_no) ON DELETE CASCADE,
    CONSTRAINT unique_follow UNIQUE (follower_id, followed_id), -- 한 사용자가 동일한 사용자를 중복해서 팔로우하지 못하도록 제한
    PRIMARY KEY (id)
);

-- ALTER TABLE user_follows ADD CONSTRAINT fk_user_info_to_user_follows FOREIGN KEY (follower_id) REFERENCES user_info (user_no) ON DELETE CASCADE;
-- ALTER TABLE user_follows ADD CONSTRAINT fk_user_info_to_user_follows_2 FOREIGN KEY (followed_id) REFERENCES user_info (user_no) ON DELETE CASCADE;

-- 스트리밍(쇼츠)에 대한 사용자의 댓글을 저장하는 테이블
CREATE TABLE stream_comments (
	comment_no INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    stream_no INT NOT NULL,
    user_no INT NOT NULL,
    comments VARCHAR(255) NULL,
    likes INT NULL, -- 0,1,2,3,4,5의 정수 값만 사용
    created_time DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 스트리밍의 쇼츠영상 저장하는 테이블
CREATE TABLE stream_short_clips (
    stream_no INT NOT NULL,
    user_no INT NOT NULL,
    shorts_path VARCHAR(255) NULL,
    likes INT NULL,
    comments INT NULL,
    title VARCHAR(255) NULL,
    introduction VARCHAR(255) NULL,
    views INT NULL,
    max_views INT NULL,
    created_time DATETIME NULL,
    streamed_time DATETIME NULL,
		streaming_time INT NULL
);



-- 사용자의 예정된 이벤트를 저장하는 테이블
CREATE TABLE user_events (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    user_no INT NOT NULL,
    title VARCHAR(255) NULL,
    location POINT NULL,
    introduction VARCHAR(255) NULL,
    upcoming_date DATETIME NULL
);

-- UserEvents 테이블과 UserInfo 테이블 간의 외래키 설정
ALTER TABLE user_events ADD CONSTRAINT fk_user_info_to_user_events FOREIGN KEY (user_no) REFERENCES user_info (user_no);



-- 스트리밍의 해시태그 정보를 저장하는 테이블
CREATE TABLE stream_hashtags (
    hashtag_no INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    stream_no INT NOT NULL,
    hashtag VARCHAR(255) NULL
);

-- 신고 기록을 저장하는 테이블
CREATE TABLE user_reports (
    report_no INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_no INT NOT NULL,
    report_time DATETIME NULL,
    report_type VARCHAR(255) NULL,
    reporter_no INT NOT NULL
);


-- FULLTEXT 인덱스 설정 (title 열에 ngram 파서 사용)
ALTER TABLE live_stream_sessions ADD FULLTEXT INDEX ft_index_title (title) WITH PARSER ngram;


-- FULLTEXT 인덱스 설정 (nickname열에 ngram 파서 사용)
ALTER TABLE user_info ADD FULLTEXT INDEX ft_index_nickname (nickname) WITH PARSER ngram;


-- FULLTEXT 인덱스 설정 (title열에 ngram 파서 사용)
ALTER TABLE stream_short_clips ADD FULLTEXT INDEX ft_index_short (title) WITH PARSER ngram;



-- UserPreferences 테이블의 기본 키 설정
ALTER TABLE user_preferences ADD CONSTRAINT pk_user_preferences PRIMARY KEY (user_no);



-- UserPreferences 테이블과 UserInfo 테이블 간의 외래키 설정
ALTER TABLE user_preferences ADD CONSTRAINT fk_user_info_to_user_preferences FOREIGN KEY (user_no) REFERENCES user_info (user_no);

-- LiveStreamSessions 테이블과 UserInfo 테이블 간의 외래키 설정
# ALTER TABLE live_stream_sessions ADD CONSTRAINT fk_user_info_to_live_stream_sessions FOREIGN KEY (user_no) REFERENCES user_info (user_no);

-- StreamComments 테이블과 StreamShortClips 테이블 간의 외래키 설정
ALTER TABLE stream_short_clips ADD INDEX idx_stream_no (stream_no);
ALTER TABLE stream_short_clips ADD INDEX idx_user_no (user_no);


#ALTER TABLE stream_comments ADD CONSTRAINT fk_stream_short_clips_to_stream_comments_1 FOREIGN KEY (stream_no) REFERENCES stream_short_clips (stream_no);
#ALTER TABLE stream_comments ADD CONSTRAINT fk_stream_short_clips_to_stream_comments_2 FOREIGN KEY (user_no) REFERENCES user_info (user_no);

-- StreamShortClips 테이블과 LiveStreamSessions 테이블 간의 외래키 설정
# ALTER TABLE stream_short_clips ADD CONSTRAINT fk_live_stream_sessions_to_stream_short_clips_1 FOREIGN KEY (stream_no) REFERENCES live_stream_sessions (stream_no);
# ALTER TABLE stream_short_clips ADD CONSTRAINT fk_live_stream_sessions_to_stream_short_clips_2 FOREIGN KEY (user_no) REFERENCES live_stream_sessions (user_no);


-- StreamHashtags 테이블과 StreamShortClips 테이블 간의 외래키 설정
# ALTER TABLE stream_hashtags ADD CONSTRAINT fk_stream_short_clips_to_stream_hashtags_1 FOREIGN KEY (stream_no) REFERENCES live_stream_sessions (stream_no);

-- UserReports 테이블과 UserInfo 테이블 간의 외래키 설정
ALTER TABLE user_reports ADD CONSTRAINT fk_user_info_to_user_reports FOREIGN KEY (user_no) REFERENCES user_info (user_no);
-- reporter_no 컬럼에 외래 키 제약 조건 추가
ALTER TABLE user_reports ADD CONSTRAINT fk_user_info_to_user_reports_reporter FOREIGN KEY (reporter_no) REFERENCES user_info (user_no);


DELIMITER $$

CREATE TRIGGER after_follow_insert
AFTER INSERT ON user_follows
FOR EACH ROW
BEGIN
    -- 팔로잉 수 증가
    UPDATE user_info SET following = following + 1 WHERE user_no = NEW.follower_id;
    -- 팔로워 수 증가
    UPDATE user_info SET follower = follower + 1 WHERE user_no = NEW.followed_id;
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER after_follow_delete
AFTER DELETE ON user_follows
FOR EACH ROW
BEGIN
    -- 팔로잉 수 감소
    UPDATE user_info SET following = following - 1 WHERE user_no = OLD.follower_id;
    -- 팔로워 수 감소
    UPDATE user_info SET follower = follower - 1 WHERE user_no = OLD.followed_id;
END$$

DELIMITER ;








/*
------------------------------------------------ 임시 데이터 코드
*/

-- 1. user_info

INSERT INTO user_info (user_email, user_password, nickname, category, created_date, following, follower, streaming_time, streaming_count, token, profile_image_path, introduction)
VALUES
('user1@example.com', 'HweoHdEdSdDFEFdsfDFSDf1', 'Tommy1', 'Dance', '2024-01-23 10:00:00', 50, 30, 5000, 100, 'token_HweoHdEdSdDFEFdsfDFSDf1', '/images/user1.jpg', '안녕하세요! 댄스를 좋아하는 Tommy1입니다.'),
('user2@example.com', 'HweoHdEdSdDFEFdsfDFSDf2', 'Tommy2', 'Music', '2024-01-23 11:00:00', 60, 40, 6000, 120, 'token_HweoHdEdSdDFEFdsfDFSDf2', '/images/user2.jpg', '음악을 사랑하는 Tommy2입니다.'),
('user3@example.com', 'HweoHdEdSdDFEFdsfDFSDf3', 'Tommy3', 'Game', '2024-01-23 12:00:00', 70, 50, 7000, 140, 'token_HweoHdEdSdDFEFdsfDFSDf3', '/images/user3.jpg', '게임을 즐기는 Tommy3입니다.'),
('user4@example.com', 'HweoHdEdSdDFEFdsfDFSDf4', 'Tommy4', 'Dance', '2024-01-23 13:00:00', 80, 60, 8000, 160, 'token_HweoHdEdSdDFEFdsfDFSDf4', '/images/user4.jpg', '댄스를 열심히 추는 Tommy4입니다.'),
('user5@example.com', 'HweoHdEdSdDFEFdsfDFSDf5', 'Tommy5', 'Music', '2024-01-23 14:00:00', 90, 70, 9000, 180, 'token_HweoHdEdSdDFEFdsfDFSDf5', '/images/user5.jpg', '음악을 흥겨운 마음으로 듣는 Tommy5입니다.'),
('user6@example.com', 'HweoHdEdSdDFEFdsfDFSDf6', 'Tommy6', 'Game', '2024-01-23 15:00:00', 100, 80, 10000, 200, 'token_HweoHdEdSdDFEFdsfDFSDf6', '/images/user6.jpg', '게임을 즐기는 Tommy6입니다.'),
('user7@example.com', 'HweoHdEdSdDFEFdsfDFSDf7', 'Tommy7', 'Dance', '2024-01-23 16:00:00', 110, 90, 11000, 220, 'token_HweoHdEdSdDFEFdsfDFSDf7', '/images/user7.jpg', '댄스에 열중하는 Tommy7입니다.'),
('user8@example.com', 'HweoHdEdSdDFEFdsfDFSDf8', 'Tommy8', 'Music', '2024-01-23 17:00:00', 120, 100, 12000, 240, 'token_HweoHdEdSdDFEFdsfDFSDf8', '/images/user8.jpg', '음악을 사랑하는 Tommy8입니다.'),
('user9@example.com', 'HweoHdEdSdDFEFdsfDFSDf9', 'Tommy9', 'Game', '2024-01-23 18:00:00', 130, 110, 13000, 260, 'token_HweoHdEdSdDFEFdsfDFSDf9', '/images/user9.jpg', '게임을 플레이하는 Tommy9입니다.'),
('user10@example.com', 'HweoHdEdSdDFEFdsfDFSDf10', 'Tommy10', 'Dance', '2024-01-23 19:00:00', 140, 120, 14000, 280, 'token_HweoHdEdSdDFEFdsfDFSDf10', '/images/user10.jpg', '댄스를 즐기는 Tommy10입니다.'),
('user11@example.com', 'HweoHdEdSdDFEFdsfDFSDf11', 'Tommy11', 'Music', '2024-01-23 20:00:00', 150, 130, 15000, 300, 'token_HweoHdEdSdDFEFdsfDFSDf11', '/images/user11.jpg', '음악을 좋아하는 Tommy11입니다.'),
('user12@example.com', 'HweoHdEdSdDFEFdsfDFSDf12', 'Tommy12', 'Game', '2024-01-23 21:00:00', 160, 140, 16000, 320, 'token_HweoHdEdSdDFEFdsfDFSDf12', '/images/user12.jpg', '게임을 즐기는 Tommy12입니다.'),
('user13@example.com', 'HweoHdEdSdDFEFdsfDFSDf13', 'Tommy13', 'Dance', '2024-01-23 22:00:00', 170, 150, 17000, 340, 'token_HweoHdEdSdDFEFdsfDFSDf13', '/images/user13.jpg', '댄스를 즐기는 Tommy13입니다.'),
('user14@example.com', 'HweoHdEdSdDFEFdsfDFSDf14', 'Tommy14', 'Music', '2024-01-23 23:00:00', 180, 160, 18000, 360, 'token_HweoHdEdSdDFEFdsfDFSDf14', '/images/user14.jpg', '음악을 사랑하는 Tommy14입니다.'),
('user15@example.com', 'HweoHdEdSdDFEFdsfDFSDf15', 'Tommy15', 'Game', '2024-01-24 00:00:00', 190, 170, 19000, 380, 'token_HweoHdEdSdDFEFdsfDFSDf15', '/images/user15.jpg', '게임을 플레이하는 Tommy15입니다.'),
('user16@example.com', 'HweoHdEdSdDFEFdsfDFSDf16', 'Tommy16', 'Dance', '2024-01-24 01:00:00', 200, 180, 20000, 400, 'token_HweoHdEdSdDFEFdsfDFSDf16', '/images/user16.jpg', '댄스를 즐기는 Tommy16입니다.'),
('user17@example.com', 'HweoHdEdSdDFEFdsfDFSDf17', 'Tommy17', 'Music', '2024-01-24 02:00:00', 210, 190, 21000, 420, 'token_HweoHdEdSdDFEFdsfDFSDf17', '/images/user17.jpg', '음악을 좋아하는 Tommy17입니다.'),
('user18@example.com', 'HweoHdEdSdDFEFdsfDFSDf18', 'Tommy18', 'Game', '2024-01-24 03:00:00', 220, 200, 22000, 440, 'token_HweoHdEdSdDFEFdsfDFSDf18', '/images/user18.jpg', '게임을 즐기는 Tommy18입니다.'),
('user19@example.com', 'HweoHdEdSdDFEFdsfDFSDf19', 'Tommy19', 'Dance', '2024-01-24 04:00:00', 230, 210, 23000, 460, 'token_HweoHdEdSdDFEFdsfDFSDf19', '/images/user19.jpg', '댄스를 열심히 추는 Tommy19입니다.'),
('user20@example.com', 'HweoHdEdSdDFEFdsfDFSDf20', 'Tommy20', 'Music', '2024-01-24 05:00:00', 240, 220, 24000, 480, 'token_HweoHdEdSdDFEFdsfDFSDf20', '/images/user20.jpg', '음악을 듣는 Tommy20입니다.');




INSERT INTO user_info (user_email, user_password, nickname, category, created_date, following, follower, streaming_time, streaming_count, token, profile_image_path, introduction) VALUES ('olsonkimberly@gmail.com', '!S9fus98zPTM', '노래하는 제이지', 'Dance', '2023-07-15 17:03:18', 21, 147, 0, 0, 'ca0d60beabd7a0a3167e3d55088ad4f1', '/images/노래하는 제이지.jpg', 'South officer from popular many. Education modern bad others which relationship sound adult.'),
('elizabeth68@hotmail.com', '9fSr3C^7Q$1)', '춤추는 나비', 'Fitness', '2023-04-13 06:45:31', 222, 364, 0, 0, 'd5d1b68250c78c93d9f97d1114593c84', '/images/춤추는 나비.jpg', 'Go amount another. Edge very wind plant rather wall huge. Guess sing alone listen someone but who.'),
('eric27@young-gentry.org', '_bQjk+v^44aa', '게임 마스터', 'Lifestyle', '2023-03-12 06:47:08', 496, 409, 0, 0, 'dabde37f0ee6dfe93f5aa71044ceda3f', '/images/게임 마스터.jpg', 'Sister throw door get student back have. Share national learn stand election.'),
('annawashington@wells-cox.com', 'd(7qY_fAD5&5', '요리하는 민수', 'Dance', '2023-03-10 22:58:18', 97, 177, 0, 0, '5552bfdbbdc4e2466315fb5d626920cf', '/images/요리하는 민수.jpg', 'Vote great once stage property. Blood start also reality.'),
('millerandrew@marsh.com', 'ThL6Rmd80Za$', '세계를 여행하는 채연', 'Fitness', '2023-01-10 00:46:21', 69, 371, 0, 0, '812bdc3e91e09256b62d6b1ffb9555fa', '/images/세계를 여행하는 채연.jpg', 'Member gas alone when civil use animal.'),
('breanna26@hotmail.com', '!cjBel_2S0p0', '운동하는 현우', 'Dance', '2023-02-10 13:19:17', 163, 314, 0, 0, '5f3dc1e0129cf202242808d921945c50', '/images/운동하는 현우.jpg', 'Health month avoid reality decide make. Seven southern season way inside.'),
('lukesmith@welch.org', '8j8%G#Bi^*FO', '기타치는 제이지', 'Dance', '2023-06-20 20:49:26', 68, 432, 0, 0, 'add499481b32166f897992789810c401', '/images/그림 그리는 지아.jpg', '나는야 기타치는 제이지'),
('danielleharris@yahoo.com', 'MIzXNQKh$d3O', '테크 리더', 'Technology', '2023-06-19 18:13:33', 433, 60, 0, 0, 'c839bb1a48e86795d8a977e1c9fa75ab', '/images/테크 리더.jpg', 'Somebody thing role money task. Outside be participant toward mean fall find reduce.'),
('adamwest@tapia-davenport.com', 'EoGSs4Zqgfl$', '통기타장인', 'Education', '2023-10-19 22:34:10', 195, 36, 0, 0, '13c104b4fce9963d7dfb56b332ac4306', '/images/교육하는 수진.jpg', 'Friend wind moment similar pass. Edge cost among program.'),
('stevejarvis@huber.com', '!5D5@$Ig_w#G', '일상 탐험가', 'Cooking', '2023-02-23 03:52:22', 220, 141, 0, 0, '3896b9e60b2d5efb726b963228b97d17', '/images/일상 탐험가.jpg', 'Young there so establish. Street beyond capital notice.'),
('brownconnie@bowman.biz', 'Gh*d8acj_7Yp', '그림 그리는 지아22', 'Dance', '2023-01-22 01:15:49', 414, 323, 0, 0, '3d409ff4f4468a4e1a84cfcb479fa0f4', '/images/그림 그리는 지아22.jpg', 'Firm lose worker forward benefit. Argue clearly beautiful most figure. Seek vote student whatever.'),
('shawnburke@stewart-riley.org', 'V8f%a0Js(VbB', '테크 리더21', 'Music', '2023-02-25 16:01:39', 419, 80, 0, 0, '5532957d6862753689bd50db0ff7b5fa', '/images/테크 리더21.jpg', 'Ground business arrive hotel church standard model. Executive near onto nor.'),
('pottermark@hotmail.com', 'zFB8GeQeBB!I', '노래하는 제이지45', 'Game', '2023-08-18 13:23:20', 15, 118, 0, 0, '7edc06b6e5a2e285350def2f727f6756', '/images/노래하는 제이지45.jpg', 'Paper while throughout. Describe hear something customer open prepare. Without myself while drive.'),
('pthomas@andrade.com', '^$1Pw0pq8SUO', '일상 탐험가15', 'Dance', '2023-08-31 18:02:56', 241, 398, 0, 0, '4edaf4f1360a87b669c6c76c1ca55e55', '/images/일상 탐험가15.jpg', 'Fine address allow movement. Than say southern.'),
('dawn35@hotmail.com', 'U&(mZZ#w!F56', '그림 그리는 지아23', 'Fitness', '2023-02-08 19:51:33', 270, 79, 0, 0, '3bdc196f06bd6230d9862695ba7d795d', '/images/그림 그리는 지아23.jpg', 'Position him affect last way.'),
('kaylagallagher@newman-phillips.net', 'rzE80lwV^JzF', '테크 리더61', 'Game', '2023-12-04 09:00:12', 485, 114, 0, 0, 'e6f03c15464f4764e465a2f4ca75c16b', '/images/테크 리더61.jpg', 'Usually fear value. Coach open season really president tend.'),
('waltermiller@rasmussen.org', 'P16_Oxylx(d)', '춤추는 나비44', 'Education', '2023-11-21 08:34:07', 477, 144, 0, 0, '8ad1af7b42defbf346dc2b3289ca1e71', '/images/춤추는 나비44.jpg', 'Local full whose field. Test opportunity model radio after sense. Follow until age sister up.'),
('stevenelliott@yahoo.com', '77lSKXTM+dKO', '게임 마스터14', 'Travel', '2023-01-13 16:03:03', 426, 146, 0, 0, 'ccf8cb72e24202dfe0e9bdcf07944252', '/images/게임 마스터14.jpg', 'Media activity throughout goal experience system.'),
('contrerascatherine@gmail.com', 'Zn$V$_zo7*4P', '세계를 여행하는 채연4', 'Lifestyle', '2023-02-08 04:09:35', 87, 111, 0, 0, 'fb57d11e413519068c81a9f797d2ffe2', '/images/세계를 여행하는 채연4.jpg', 'Though guess development sing mind. Occur Mr thought maintain cultural history traditional.'),
('dthomas@walsh.com', '_2Eb4u&tC6dp', '교육하는 수진89', 'Travel', '2023-01-07 06:31:00', 216, 132, 0, 0, '1adf4accee8b9e996dcd80013a66d694', '/images/교육하는 수진89.jpg', 'Player hope bag. He detail safe two instead. Debate meeting music sell different back response.'),
('gmoore@yahoo.com', '*G8A@Rn#E)U8', '요리하는 민수84', 'Art', '2023-05-05 14:14:50', 445, 255, 0, 0, 'e5663f36dbe857f41ea08e93071654c9', '/images/요리하는 민수84.jpg', 'Raise machine blue rise free. Hope three shake.'),
('smithrebecca@snyder-burns.org', ')@X$nW%rq@1G', '테크 리더96', 'Fitness', '2023-07-03 18:28:35', 38, 170, 0, 0, '2fe9874870571ab95c394760e0d1733b', '/images/테크 리더96.jpg', 'Language suggest view bag debate teach. Civil ahead happy article toward card.'),
('katherine73@cervantes.com', '1@)8eoNf^Yqa', '그림 그리는 지아2', 'Cooking', '2023-12-18 20:53:50', 496, 463, 0, 0, '750c1b71ec28383555bc03927e3166f2', '/images/그림 그리는 지아2.jpg', 'Perhaps kitchen thus bad beyond. Term interesting easy dog give worry personal sport.'),
('mark87@hotmail.com', ')7spuSgouEUP', '춤추는 나비75', 'Dance', '2023-09-10 22:56:46', 248, 342, 0, 0, '632d70960d9522e7cfbdc2882b84ec85', '/images/춤추는 나비75.jpg', 'Population tend book. Loss through over.'),
('bradfordmichael@price.net', 'O89hho&v*f0H', '일상 탐험가92', 'Travel', '2023-02-25 09:29:05', 156, 130, 0, 0, '7c72568db76663d41f9830472494c2b2', '/images/일상 탐험가92.jpg', 'Determine Republican beat sense choose work. Along consider save fly fly.'),
('clarkechristian@hotmail.com', 'yD$EJw!b&90k', '운동하는 현우79', 'Travel', '2023-06-04 22:59:22', 63, 386, 0, 0, 'ce48a651bfc91e9a7e9561c007843e73', '/images/운동하는 현우79.jpg', 'Including rather student hair attack man. Turn because on worker.'),
('jenniferfloyd@hotmail.com', 'g7b&wRmG$T2V', '그림 그리는 지아59', 'Art', '2023-11-16 10:33:23', 481, 100, 0, 0, '48895c9a40473f81e8354ad5e045fbbf', '/images/그림 그리는 지아59.jpg', 'Without tree task water skin member recently.'),
('michaelguerrero@lee.net', 'a!)Y3VlzvnyI', '교육하는 수진89', 'Education', '2023-03-05 04:26:46', 124, 210, 0, 0, '7b97dfabf9a0af33bd74fc09e24e2a08', '/images/교육하는 수진89.jpg', 'Him alone old. Maybe improve job prove indicate recognize left.'),
('janderson@yahoo.com', 'n*@HO9PkMUQd', '춤추는 나비94', 'Technology', '2023-09-14 14:27:34', 441, 225, 0, 0, '7073e28a865a9e73a0d082e89c416b50', '/images/춤추는 나비94.jpg', 'Black against ever three me moment. Our scene ahead note resource thus. Thought herself gun.'),
('ortegajames@gmail.com', 'h9nf)mhg&_Pj', '세계를 여행하는 채연40', 'Fitness', '2023-05-24 20:26:51', 182, 494, 0, 0, 'd606b11e4eb3e738fc569786c97f1db8', '/images/세계를 여행하는 채연40.jpg', 'Military manager value worry center.
General require five under.'),
('linda29@hotmail.com', 'hX2tJ7g)%04v', '노래하는 제이지73', 'Game', '2023-10-29 06:28:02', 130, 315, 0, 0, '81ca16ba506da8499abc272c31a76a55', '/images/노래하는 제이지73.jpg', 'Me of make woman a six move. Kitchen theory just type purpose service including.'),
('roselucas@beck.com', ')MkJyZiW55H2', '춤추는 나비77', 'Cooking', '2023-03-27 08:51:13', 337, 468, 0, 0, 'bd5fb2bfb9f888fcc1a8d6813686e9ef', '/images/춤추는 나비77.jpg', 'Over direction finish try late month. Nearly deep move affect.'),
('davidcurtis@hotmail.com', 'yb2Gmkds^a90', '노래하는 제이지61', 'Fitness', '2023-09-25 06:37:30', 354, 143, 0, 0, 'ad12efa3cc8133a4cc9d085140684d83', '/images/노래하는 제이지61.jpg', 'Bring economy second age. Shoulder song they employee yard.'),
('ramosronald@johnson-evans.com', 'C&eS_Gqr&32P', '일상 탐험가32', 'Lifestyle', '2023-02-26 05:41:29', 19, 328, 0, 0, 'f628a66875ec410ddd246d7cdfdf9c4d', '/images/일상 탐험가32.jpg', 'Everybody answer indeed much. Five rise music partner.'),
('tylermiller@patterson-hardin.biz', 'A$ILU!p6V0d3', '세계를 여행하는 채연49', 'Lifestyle', '2023-04-19 15:24:04', 82, 116, 0, 0, '1b981f34dc0950aecdb8b87b0e6a89d2', '/images/세계를 여행하는 채연49.jpg', 'Performance key individual employee theory reveal assume. Art box public life.'),
('hancockmark@hotmail.com', 'u4YrapH!*^9B', '게임 마스터93', 'Music', '2023-07-22 13:10:47', 403, 356, 0, 0, 'b996ae762a21c185609184b42493b541', '/images/게임 마스터93.jpg', 'Hear toward them certain second election. Leader base doctor consumer both company street try.'),
('dlee@yahoo.com', '#qVR3S6Kp5)2', '춤추는 나비80', 'Music', '2023-12-04 11:02:53', 432, 201, 0, 0, '7ea7191761c3e23de52592a6d24a763a', '/images/춤추는 나비80.jpg', 'World grow party source fine. Leg never meeting.'),
('aliciabradshaw@gonzalez.com', '&HItx6crY8mx', '그림 그리는 지아77', 'Art', '2023-11-13 08:27:02', 261, 105, 0, 0, '62aa34232c409acdf97ec71fc757091c', '/images/그림 그리는 지아77.jpg', 'Stuff although save kind material determine. Hot material go hospital. Among from future oil.'),
('basslisa@navarro.biz', '$*bIHkTiL(25', '교육하는 수진3', 'Fitness', '2023-05-04 17:17:03', 231, 367, 0, 0, '9b2f14000b990198e19976dd6311be57', '/images/교육하는 수진3.jpg', 'Oil should might however effect. Really report model present more situation worker.'),
('smitherin@hotmail.com', 'F&jIyRV&(5kG', '운동하는 현우53', 'Lifestyle', '2023-05-16 02:04:02', 208, 321, 0, 0, '268b5e0f781de07d35c7268e6a7f1958', '/images/운동하는 현우53.jpg', 'Director home stuff either. Evidence expert feeling second they win.'),
('david04@hotmail.com', 'GH9PbSvo0n!Y', '요리하는 민수98', 'Travel', '2023-02-21 20:32:01', 428, 62, 0, 0, '2e9bfc15f7cefb2726d321a5e417b256', '/images/요리하는 민수98.jpg', 'Take trial option ahead.
Body believe feel those room instead begin. Again bring enjoy strong.'),
('mgarcia@berry.com', '$0k5AShk!yV&', '테크 리더17', 'Technology', '2023-03-09 05:06:41', 250, 363, 0, 0, '775842c2e84030032679e4eef3b28819', '/images/테크 리더17.jpg', 'Miss blood including. Set language catch new fill own claim sea.'),
('quinnlori@mccormick-harvey.net', '!Wv80yWm_hoU', '춤추는 나비31', 'Cooking', '2023-05-06 14:32:10', 173, 220, 0, 0, 'e10c8437166a790f1926b72e921c3bdb', '/images/춤추는 나비31.jpg', 'Stand professor white plan. Expert dog treatment so something baby recognize.'),
('fgray@hotmail.com', 'NC@#m4GrZPdT', '일상 탐험가35', 'Art', '2023-04-11 07:58:51', 38, 449, 0, 0, '9ac1e2d088513cb624165e528617da31', '/images/일상 탐험가35.jpg', 'Stock at health talk. White nation put back everything last.'),
('thompsonbrandon@alexander.org', '(S5tQQQba4UY', '일상 탐험가9', 'Dance', '2023-07-11 08:56:44', 12, 483, 0, 0, '7fce34802acd62d0b50fab9089dd0a90', '/images/일상 탐험가9.jpg', 'Unit keep front child. Across out tend include. Appear just expert pattern anyone ok including.'),
('daniel21@brennan.net', '$vc7OHgr!J5p', '게임 마스터44', 'Technology', '2023-09-28 01:00:08', 452, 282, 0, 0, '52080286dedd2046d92667cf269b0081', '/images/게임 마스터44.jpg', 'True or determine claim wear trouble. Decade safe difference nature them focus risk.'),
('larrybrown@hotmail.com', '&iqIWDqt@^5!', '요리하는 민수31', 'Education', '2023-03-05 05:38:38', 110, 66, 0, 0, 'b5274a1f384da6bf2527117b6a693371', '/images/요리하는 민수31.jpg', 'Strong sure performance threat value success.'),
('kentstacy@gutierrez.com', '@N33xLOtWEB3', '게임 마스터45', 'Technology', '2023-12-15 07:00:43', 489, 455, 0, 0, 'a48e5de2e9575f4513eaa3988c91360d', '/images/게임 마스터45.jpg', 'Value real kid statement cell assume nothing. Population recently special I prepare once.'),
('michael55@gmail.com', 'Fa%rAipv)7GH', '테크 리더65', 'Travel', '2023-03-31 05:58:38', 137, 364, 0, 0, '0d34b7837b738f3f2631c99acd259cb6', '/images/테크 리더65.jpg', 'Visit office discover into cup card keep. Arrive response catch fund garden.'),
('vgreen@landry.com', '_^RiV3sj9F0p', '교육하는 수진25', 'Art', '2023-05-05 21:53:48', 437, 141, 0, 0, 'b4316933cd13fac8e942aff8885106c3', '/images/교육하는 수진25.jpg', 'Put race key speech. Truth green step budget coach.'),
('christydiaz@yahoo.com', 'Guy+RcZrG1LI', '그림 그리는 지아43', 'Education', '2023-11-12 18:55:17', 161, 311, 0, 0, '75247ae283022a7b53b426945cdbe835', '/images/그림 그리는 지아43.jpg', 'Citizen mean ability ground treat. Stand benefit provide cover.'),
('tammy78@hotmail.com', '^7_(nyjyQlxA', '일상 탐험가59', 'Education', '2023-08-19 01:30:45', 223, 192, 0, 0, '69cd569ffb662ff1fb0eaac27896bffa', '/images/일상 탐험가59.jpg', 'After statement if. Us himself wrong Mrs during sort quality manager.'),
('wspencer@edwards.net', 'e)EKbKjAB15r', '그림 그리는 지아58', 'Game', '2023-06-13 22:06:01', 69, 253, 0, 0, '02aac228a23aed3b4524c2f936eef2d2', '/images/그림 그리는 지아58.jpg', 'Participant state human. Human key health.'),
('phillip73@quinn.com', 'T&5)kk*o8KU@', '테크 리더60', 'Art', '2023-05-31 02:34:03', 152, 0, 0, 0, '7cbabad5cfe0373490506439a7201a7b', '/images/테크 리더60.jpg', 'Claim cut quite his. Miss opportunity phone and view major rest.'),
('morrisandrew@yahoo.com', '*7f(TmmHW2eL', '운동하는 현우48', 'Lifestyle', '2023-06-03 04:37:28', 149, 141, 0, 0, '6e4f661c151e962fee7ec126200355dc', '/images/운동하는 현우48.jpg', 'Popular not involve game kitchen traditional. Evidence international police.'),
('victoria65@hines.info', '2@9KC2xlkXGW', '그림 그리는 지아51', 'Game', '2023-12-25 09:42:12', 484, 232, 0, 0, '9bef9352ad20adbea10294a992d94c72', '/images/그림 그리는 지아51.jpg', 'Have kitchen first something above source. He those little billion.'),
('zschultz@graham-castro.info', 'ypAhY3kv!n0Z', '요리하는 민수14', 'Art', '2023-10-04 18:55:08', 341, 203, 0, 0, 'f7d4facbf7d282a1313421455913477d', '/images/요리하는 민수14.jpg', 'Event live work son. Exist price as hand we opportunity outside.'),
('gsmith@gmail.com', '(Bk55U1de&96', '일상 탐험가21', 'Fitness', '2023-08-31 06:52:44', 235, 111, 0, 0, '097abba6d6f407dbc34dabdacf6d4899', '/images/일상 탐험가21.jpg', 'Finally sell group short. Able hot oil expect how million direction.'),
('waltervaldez@gmail.com', 'Jc71&k!yhQO!', '요리하는 민수36', 'Lifestyle', '2023-05-25 03:29:40', 71, 157, 0, 0, 'efc0d67d7a4d4d8a803f105b198c4bea', '/images/요리하는 민수36.jpg', 'Figure run record peace account test less. Unit several cultural thus character.'),
('kanejohn@hotmail.com', '@&X4WqKs9%cI', '노래하는 제이지37', 'Cooking', '2023-01-15 03:33:03', 44, 383, 0, 0, '0b6ac34d5c25c1f19434d87d83139e3b', '/images/노래하는 제이지37.jpg', 'Standard hit firm well red. Present result position pull pick less often.'),
('igreen@yahoo.com', '6srGZEd%+ZkJ', '테크 리더76', 'Fitness', '2023-07-01 23:00:48', 347, 367, 0, 0, 'caca6dc719a472d6649054a6f8eeee6d', '/images/테크 리더76.jpg', 'Upon wish team both language doctor. Degree stuff sign American road fund role.'),
('heather48@yahoo.com', '9_5q9z8*TfCL', '교육하는 수진64', 'Dance', '2023-03-09 21:34:18', 474, 172, 0, 0, 'b382039410a041469f6b4eb8ebf51c15', '/images/교육하는 수진64.jpg', 'Mr break there message politics whose total.'),
('thomasjustin@yahoo.com', 'SE7NZWmp)qby', '테크 리더27', 'Music', '2023-06-07 12:01:43', 263, 381, 0, 0, 'c945acbdb9c77edd2484e93e53e20eff', '/images/테크 리더27.jpg', 'Least west nation south discussion avoid really. Picture grow past skill mean today citizen.'),
('jared30@yahoo.com', '13&08HLziq5p', '노래하는 제이지71', 'Game', '2023-05-12 16:50:58', 236, 242, 0, 0, '19c9a066b6a3bf522f2ce1e767b59a7a', '/images/노래하는 제이지71.jpg', 'Against nearly it. Writer election professional we generation.'),
('amata@wise.net', '2SEOdHZwS$3*', '테크 리더55', 'Technology', '2023-10-20 23:07:58', 480, 368, 0, 0, 'b1c43aaabc7377fc61c8163ee4565aaf', '/images/테크 리더55.jpg', 'Here network cup. Security outside practice us care would.'),
('russellpowell@white.net', '$186k9wQQEVz', '운동하는 현우11', 'Travel', '2023-08-06 12:10:59', 306, 230, 0, 0, '716b869073e2b172f18b831dd6eed6f7', '/images/운동하는 현우11.jpg', 'Team final treat music rest girl project. Family care require particularly.'),
('andersonvalerie@hotmail.com', 'O#!4DuvqiU3(', '게임 마스터15', 'Fitness', '2023-08-13 12:08:43', 93, 194, 0, 0, 'b7504cbf26ea7110f90885810616d3c4', '/images/게임 마스터15.jpg', 'Color process tree involve. Environmental charge offer.'),
('angelajackson@byrd.com', '!T)IRUFG8wTd', '게임 마스터6', 'Technology', '2023-04-24 00:10:13', 397, 68, 0, 0, '16719918b6557d2d2b598ca0818dfece', '/images/게임 마스터6.jpg', 'Mother poor explain scene oil. Inside challenge pressure kind.'),
('smithbrent@hotmail.com', '5$7760!pDANF', '테크 리더12', 'Fitness', '2023-08-03 17:23:22', 100, 414, 0, 0, '8f772382ad37c65257d6b3a9d46b9be0', '/images/테크 리더12.jpg', 'Long several could guess behind your. Girl manage democratic Republican available question.'),
('karicannon@stone.com', 'OTUZc%_ux*9W', '노래하는 제이지97', 'Music', '2023-06-14 23:16:59', 128, 331, 0, 0, 'aa9b4cd77ef8e77b7a8a0d2bf6982a0a', '/images/노래하는 제이지97.jpg', 'Position realize traditional new guess movie.'),
('jeffrey16@gmail.com', 'C6voR!Up%wF6', '세계를 여행하는 채연88', 'Fitness', '2023-01-04 08:08:36', 267, 284, 0, 0, 'ef6ee66f4bbee087ac151f2d333775be', '/images/세계를 여행하는 채연88.jpg', 'Fish political college hour feeling particular. Parent rock manage mean.'),
('lstephenson@lynn.biz', '(bgk&aX9N3AX', '노래하는 제이지57', 'Fitness', '2023-11-07 02:26:23', 193, 123, 0, 0, 'ae69fd6ba4e306e930026844155d0bf9', '/images/노래하는 제이지57.jpg', 'Reflect its group along another. Leader east on parent argue maybe.'),
('qbrown@calderon.com', '+n4A5tA*hsWe', '춤추는 나비45', 'Game', '2023-11-28 23:04:07', 450, 449, 0, 0, '76eb0b4645c4c368a6a55f14de2c3079', '/images/춤추는 나비45.jpg', 'Although data usually stay. Near half discuss. Tree address board feel impact simply air.'),
('rgriffin@hotmail.com', 'o(9SizN+)bAT', '그림 그리는 지아45', 'Art', '2023-02-15 03:55:20', 401, 296, 0, 0, 'fdd7793fab82d7ed4df163837c5b002d', '/images/그림 그리는 지아45.jpg', 'Behavior about smile structure. Least year it.
Amount church want their over deal.'),
('hernandezolivia@jones.com', '#kIwk5jN#0u6', '일상 탐험가74', 'Dance', '2023-10-22 11:39:05', 401, 113, 0, 0, 'a0a40d5c2938dc25e4de10d4d1f10a35', '/images/일상 탐험가74.jpg', 'Century plan time team. Everything great live itself company.'),
('michael56@myers.com', '#!ReD(xf4%^7', '그림 그리는 지아98', 'Education', '2023-05-02 01:46:57', 394, 315, 0, 0, '46ba3d5472ade857efa66b2b88fb6465', '/images/그림 그리는 지아98.jpg', 'Life lot table similar century couple answer. Agent minute go star site.'),
('tinawoods@lewis.com', 'G@c0UWl9e+oo', '테크 리더70', 'Technology', '2023-07-24 03:40:03', 383, 218, 0, 0, '2574abae147ebdbc07d29f7412715d02', '/images/테크 리더70.jpg', 'Civil indicate pay control. Fact other no. Live society several remain difficult plan.'),
('alexandriapatterson@hotmail.com', '3ffkncgJ!MwM', '건대기타장인', 'Fitness', '2023-10-31 12:25:00', 372, 345, 0, 0, '0aec5cf0416478fca8ca80d5168a9419', '/images/그림 그리는 지아15.jpg', '통기타 장인입니다. 안녕하세오 !!'),
('snyderheather@mitchell.info', 'es7cs_VX#jTF', '운동하는 현우42', 'Cooking', '2023-12-22 01:43:46', 79, 218, 0, 0, 'aaaeb86ca684c30b0a029e7a7f0c71f1', '/images/운동하는 현우42.jpg', 'My set fill left college. Commercial cold garden stop why item.'),
('shannonsimmons@parks-harper.com', '$_5qFAljU_9C', '교육하는 수진88', 'Technology', '2023-06-09 19:55:27', 140, 78, 0, 0, '198a0df02632f124020b315327618261', '/images/교육하는 수진88.jpg', 'Role his song our institution. Cup protect stock way apply.'),
('theresa87@gmail.com', 'u5J!dyH9U1aH', '요리하는 민수70', 'Technology', '2023-08-20 04:39:42', 459, 237, 0, 0, 'e78e94c3ae1369960c9cbde19ab21e89', '/images/요리하는 민수70.jpg', 'Physical not thank floor.
Film already case be contain race. Space onto none price law.'),
('qwelch@martin.net', '*1VcsV^6z9Lp', '그림 그리는 지아6', 'Lifestyle', '2023-09-10 00:26:33', 210, 253, 0, 0, 'b02de85de46e80e352ebc99021a9f177', '/images/그림 그리는 지아6.jpg', 'Environmental white employee property set. Pressure whether couple.'),
('curtismckenzie@hotmail.com', '3$GNtJO)%hUn', '춤추는 나비64', 'Music', '2023-10-26 00:47:38', 269, 411, 0, 0, 'd50654104256a2fd70a4b47f0ea9839d', '/images/춤추는 나비64.jpg', 'Have management of stand tax recent agreement. Turn arm near sense month.'),
('mariathompson@gmail.com', 'm1sDUJf0(cID', '교육하는 수진44', 'Fitness', '2023-07-05 14:31:32', 280, 192, 0, 0, '36f43baacd70dece7206b53a36927d83', '/images/교육하는 수진44.jpg', 'Likely field boy billion computer gun all information. System both fine term home that.'),
('tthomas@yahoo.com', '#)9@f$zuu2BI', '테크 리더92', 'Fitness', '2023-04-16 21:26:41', 370, 319, 0, 0, 'bdf22a1f70bacc999878886c2323930a', '/images/테크 리더92.jpg', 'Whether discussion teach author soldier capital buy. Effect newspaper mother rather.'),
('sabrinacollins@lara.com', '0W!*w9Zy2Dk^', '교육하는 수진44', 'Fitness', '2023-08-20 08:16:52', 120, 36, 0, 0, '8decb0a92fe8fd21fcd321a0d8958ebe', '/images/교육하는 수진44.jpg', 'Even doctor set artist over forward. Eight owner mean decision toward walk.'),
('cindy41@yahoo.com', '%S^S7rz96J$V', '일상 탐험가9', 'Education', '2023-01-27 18:55:17', 171, 117, 0, 0, '8c986a923fcc1405a24e442a14d38e48', '/images/일상 탐험가9.jpg', 'Card direction minute hear computer cause. Computer he business fact.'),
('morrisjoe@hotmail.com', '_Nk1+IZgh%S+', '교육하는 수진65', 'Education', '2023-12-23 10:15:18', 298, 347, 0, 0, '89202fb7249f3bc168018fd0313ad0f1', '/images/교육하는 수진65.jpg', 'Nature serious poor onto receive. Argue physical join bag focus. Guess catch case.'),
('kevinhodges@sullivan-ingram.net', '*AdqXkSy3yxi', '테크 리더80', 'Travel', '2023-01-28 20:49:19', 10, 265, 0, 0, 'a32c1a8ac1c691dc1a79eaf9f190339a', '/images/테크 리더80.jpg', 'Network free determine serious continue that condition. List PM author traditional.'),
('timothy29@gmail.com', 'bUN*soZj4o1w', '요리하는 민수89', 'Music', '2023-08-24 12:58:39', 210, 40, 0, 0, '718389efc9016cb85d24311c0b75d029', '/images/요리하는 민수89.jpg', 'Level listen cost pressure movement major. Marriage these address action.'),
('davidgonzalez@hotmail.com', '3JbSZBxh$2na', '교육하는 수진7', 'Technology', '2023-09-07 23:24:22', 256, 169, 6747, 342, '68298a40a5a91b8505f9627abc3780f0', '/images/교육하는 수진7.jpg', 'Truth street evidence three another. Between lot already message.'),
('berryrenee@orozco.com', '8)FhgsZmEN2H', '테크 리더47', 'Travel', '2023-04-28 21:30:39', 260, 379, 287, 373, 'd723c18bb943f02ce0069e253e6ad8fd', '/images/테크 리더47.jpg', 'Allow voice arrive decide. Upon sea film play big develop.'),
('paige23@gmail.com', 'H39E9Nk^Y^zl', '요리하는 민수91', 'Education', '2023-12-19 14:43:47', 58, 447, 5366, 28, '5bce8694d1b296d86261a52991d10df2', '/images/요리하는 민수91.jpg', 'Site drop serve why son. Television outside school build. Card home explain similar.'),
('jennifer54@yahoo.com', '*mBnzeuFE7u3', '노래하는 제이지35', 'Art', '2023-06-23 05:22:20', 440, 372, 9067, 465, '5bb1a0e80e10986fd244dc150a797205', '/images/노래하는 제이지35.jpg', 'Force week soldier none. Itself whom girl room foreign see. Money network avoid list provide.'),
('wangdenise@crosby.com', 'HDT#^ORh7DSo', '운동하는 현우68', 'Game', '2023-12-19 18:14:13', 486, 266, 1889, 419, 'c6da2447590a55a6adb9df54d2d0680f', '/images/운동하는 현우68.jpg', 'Few head try. Company these growth big someone reveal nature. Style live may network.'),
('roger86@valenzuela.com', '$Qig96Tu!14h', '노래하는 제이지', 'Lifestyle', '2023-05-01 11:57:03', 3, 313, 976, 285, '3abfa55749e975b8133ed09b3af56059', '/images/그림 그리는 지아41.jpg', 'Board customer thousand resource through site perhaps. Could world discussion.'),
('colesheila@hotmail.com', '8JTXWxK(*$7y', '춤추는 나비12', 'Art', '2023-02-28 14:51:32', 270, 77, 5455, 38, '45157ba365afe2cff6f14b41b2788c1e', '/images/춤추는 나비12.jpg', 'Song sea however mention coach safe. Method make occur walk. Great thank money need I contain.'),
('wendy47@gmail.com', '(2QuAhAb5ZYs', '운동하는 현우44', 'Dance', '2023-10-09 14:29:46', 364, 393, 2119, 209, 'ca21ada36bb400f93acdcf5f927cbc55', '/images/운동하는 현우44.jpg', 'Particular sit spend reach floor defense. Field note pull perhaps final that expert.'),
('smithlauren@wilson.info', '@8+Nd9_duq8o', '일상 탐험가31', 'Game', '2023-02-02 20:29:28', 69, 208, 7605, 402, '025837ee242aa01672a1a4a4896f6e74', '/images/일상 탐험가31.jpg', 'Project late according sense risk or.'),
('jennifer77@gordon.com', 'f)o3VI2cYqVQ', '춤추는 나비33', 'Travel', '2023-03-09 23:25:36', 323, 479, 790, 172, '6f7a3aeac49c6ecf49217db76fbd827a', '/images/춤추는 나비33.jpg', 'Whether approach Congress newspaper. Everything business we nation. Find radio head drop.');






DELETE FROM user_preferences WHERE USER_NO < 1000;

INSERT INTO user_preferences (user_no, dance, music, game) VALUES 
(1, FALSE, FALSE, FALSE),
(2, TRUE, TRUE, FALSE),
(3, TRUE, TRUE, TRUE),
(4, FALSE, FALSE, TRUE),
(5, FALSE, FALSE, FALSE),
(6, TRUE, FALSE, TRUE),
(7, FALSE, FALSE, TRUE),
(8, TRUE, TRUE, FALSE),
(9, TRUE, TRUE, FALSE),
(10, TRUE, TRUE, FALSE),
(11, TRUE, FALSE, TRUE),
(12, TRUE, TRUE, TRUE),
(13, FALSE, TRUE, TRUE),
(14, FALSE, FALSE, FALSE),
(15, TRUE, TRUE, TRUE),
(16, FALSE, FALSE, FALSE),
(17, TRUE, FALSE, FALSE),
(18, TRUE, FALSE, FALSE),
(19, TRUE, TRUE, FALSE),
(20, TRUE, FALSE, FALSE),
(21, FALSE, FALSE, FALSE),
(22, FALSE, TRUE, FALSE),
(23, FALSE, TRUE, FALSE),
(24, TRUE, TRUE, TRUE),
(25, TRUE, TRUE, FALSE),
(26, FALSE, TRUE, FALSE),
(27, FALSE, TRUE, FALSE),
(28, FALSE, TRUE, FALSE),
(29, FALSE, TRUE, FALSE),
(30, FALSE, FALSE, FALSE),
(31, TRUE, FALSE, TRUE),
(32, TRUE, TRUE, FALSE),
(33, TRUE, TRUE, TRUE),
(34, TRUE, TRUE, FALSE),
(35, TRUE, FALSE, FALSE),
(36, FALSE, TRUE, TRUE),
(37, FALSE, FALSE, TRUE),
(38, TRUE, TRUE, FALSE),
(39, TRUE, TRUE, FALSE),
(40, FALSE, FALSE, TRUE),
(41, TRUE, FALSE, FALSE),
(42, FALSE, TRUE, TRUE),
(43, FALSE, TRUE, TRUE),
(44, TRUE, TRUE, TRUE),
(45, FALSE, FALSE, TRUE),
(46, TRUE, TRUE, TRUE),
(47, FALSE, FALSE, TRUE),
(48, TRUE, FALSE, TRUE),
(49, TRUE, TRUE, FALSE),
(50, TRUE, TRUE, TRUE),
(51, FALSE, TRUE, TRUE),
(52, FALSE, FALSE, TRUE),
(53, FALSE, FALSE, FALSE),
(54, TRUE, FALSE, TRUE),
(55, FALSE, FALSE, TRUE),
(56, FALSE, TRUE, TRUE),
(57, FALSE, FALSE, TRUE),
(58, FALSE, TRUE, TRUE),
(59, TRUE, TRUE, FALSE),
(60, FALSE, FALSE, FALSE),
(61, TRUE, TRUE, FALSE),
(62, FALSE, TRUE, FALSE),
(63, FALSE, TRUE, FALSE),
(64, FALSE, FALSE, TRUE),
(65, TRUE, FALSE, TRUE),
(66, TRUE, TRUE, FALSE),
(67, FALSE, TRUE, TRUE),
(68, FALSE, FALSE, FALSE),
(69, FALSE, TRUE, TRUE),
(70, TRUE, FALSE, TRUE),
(71, FALSE, TRUE, FALSE),
(72, FALSE, TRUE, FALSE),
(73, TRUE, TRUE, TRUE),
(74, TRUE, FALSE, TRUE),
(75, FALSE, TRUE, FALSE),
(76, FALSE, FALSE, TRUE),
(77, TRUE, FALSE, TRUE),
(78, TRUE, FALSE, TRUE),
(79, FALSE, TRUE, FALSE),
(80, TRUE, FALSE, FALSE),
(81, FALSE, TRUE, FALSE),
(82, TRUE, FALSE, TRUE),
(83, TRUE, FALSE, FALSE),
(84, TRUE, FALSE, TRUE),
(85, FALSE, TRUE, TRUE),
(86, FALSE, TRUE, FALSE),
(87, TRUE, TRUE, TRUE),
(88, FALSE, FALSE, TRUE),
(89, FALSE, FALSE, TRUE),
(90, FALSE, FALSE, FALSE),
(91, TRUE, TRUE, TRUE),
(92, TRUE, FALSE, TRUE),
(93, FALSE, FALSE, FALSE),
(94, FALSE, TRUE, TRUE),
(95, FALSE, FALSE, TRUE),
(96, FALSE, FALSE, FALSE),
(97, FALSE, FALSE, TRUE),
(98, TRUE, FALSE, TRUE),
(99, TRUE, FALSE, FALSE),
(100, TRUE, FALSE, FALSE);





INSERT INTO live_stream_sessions (user_no, start_time, end_time, latitude, longitude, location, title, introduction, category, max_viewer) VALUES 
(98, '2024-02-12 03:36:07', '2024-02-12 05:04:07', 37.5665, 126.9780, '서울시청', '노래하는 제이지의 서울시청 라이브방송!!', '서울시청 광장에서 진행하는 실시간 노래 방송입니다.', 'Music', 253),
(100, '2024-02-12 03:43:07', '2024-02-12 05:04:07', 35.1796, 129.0756, '부산 해운대', '세계를 여행하는 채연의 부산 해운대 라이브!!', '부산 해운대에서 진행하는 여행 이야기 라이브 방송.', 'Travel', 307),
(97, '2024-02-12 03:18:07', '2024-02-12 05:04:07', 33.4890, 126.4983, '제주도', '운동하는 현우의 제주도 라이브 워크아웃!!', '제주도의 아름다운 풍경과 함께하는 실시간 운동 방송.', 'Fitness', 259),
(99, '2024-02-12 03:36:07', '2024-02-12 05:04:07', 37.4563, 126.7052, '인천 송도', '요리하는 민수의 인천 송도 요리 쇼!!', '인천 송도의 멋진 뷰와 함께하는 요리 방송.', 'Cooking', 295),
(96, '2024-02-12 03:05:07', '2024-02-12 05:04:07', 37.8748, 127.7342, '춘천 남이섬', '그림 그리는 지아의 춘천 남이섬 라이브 드로잉!!', '춘천 남이섬에서 진행하는 실시간 그림 그리기 방송.', 'Art', 383);






INSERT INTO stream_short_clips (stream_no, user_no, shorts_path, likes, comments, title, introduction, views, max_views, created_time, streamed_time, streaming_time) VALUES 
(1, 98, 'busking3.png', 1289, 25, '건대 앞에서 펼쳐진 기타 거리 공연', '서울의 번화가에서 라이브로 선보이는 기타소리!', 3200, 5000, '2024-02-12', '2024-02-12', 60),
(2, 98, 'busking4.png', 150, 40, '노래하는 제이지의 강남스타일 커버', '강남 한복판에서 펼쳐진 화려한 무대!', 4100, 8000, '2024-02-12', '2024-02-12', 45),
(3, 100, '/shorts/travel_jeju_adventure.mp4', 120, 30, '세계를 여행하는 채연의 제주도 탐험', '제주도의 숨은 비경을 찾아서!', 3000, 6000, '2024-02-12', '2024-02-12', 75),
(4, 100, '/shorts/travel_busan_night.mp4', 180, 50, '부산의 밤바다와 함께하는 채연의 여행', '부산 해운대의 아름다운 밤바다를 배경으로!', 5200, 9000, '2024-02-12', '2024-02-12', 90),
(5, 97, '/shorts/fitness_jeju_hiking.mp4', 130, 35, '제주 올레길에서의 운동하는 현우의 하이킹', '제주의 자연을 만끽하며 건강도 챙기세요!', 2800, 5500, '2024-02-12', '2024-02-12', 85),
(6, 97, '/shorts/fitness_morning_yoga.mp4', 145, 38, '제주 해변에서 운동하는 현우와 함께하는 모닝 요가', '해변의 평화로운 아침과 함께하는 요가 시간!', 4600, 7500, '2024-02-12', '2024-02-12', 70),
(7, 99, '/shorts/cooking_incheon_seafood.mp4', 160, 45, '인천 송도에서 요리하는 민수의 해산물 요리', '신선한 해산물로 만드는 특별한 요리!', 4300, 7000, '2024-02-12', '2024-02-12', 55),
(8, 99, '/shorts/cooking_korean_bbq.mp4', 175, 47, '송도의 밤, 민수와 함께하는 한국식 바비큐', '한국의 맛을 제대로 느낄 수 있는 바비큐 파티!', 3900, 6800, '2024-02-12', '2024-02-12', 65),
(9, 96, '/shorts/art_chuncheon_landscape.mp4', 190, 55, '춘천 남이섬에서 그림 그리는 지아의 풍경화', '남이섬의 아름다운 풍경을 캔버스에 담다!', 4800, 7600, '2024-02-12', '2024-02-12', 95),
(10, 96, '/shorts/art_painting_class.mp4', 205, 60, '지아와 함께하는 온라인 드로잉 클래스', '집에서도 쉽게 따라 할 수 있는 드로잉 수업!', 5100, 8200, '2024-02-12', '2024-02-12', 80),
(11, 98, 'busking5.png', 1129, 65, '서울 국제 음악 페스티벌 하이라이트', '전 세계 음악가들이 모인 서울의 밤을 빛낸 순간들!', 5400, 8400, '2024-02-12', '2024-02-12', 120),
(12, 100, '/shorts/travel_vlog_gyeongju.mp4', 240, 70, '경주 역사 탐방 브이로그', '천년의 역사를 품은 경주에서의 하루를 담다.', 5700, 9000, '2024-02-12', '2024-02-12', 150),
(13, 97, '/shorts/fitness_home_workout.mp4', 260, 75, '집에서 즐기는 효과 만점 홈트레이닝', '간단한 도구로 집에서 할 수 있는 운동 루틴 공개!', 6000, 9500, '2024-02-12', '2024-02-12', 180),
(14, 99, '/shorts/cooking_easy_recipes.mp4', 280, 80, '요리 초보자를 위한 쉬운 레시피', '누구나 쉽게 따라할 수 있는 맛있는 요리 레시피!', 6300, 9800, '2024-02-12', '2024-02-12', 200),
(15, 96, '/shorts/art_digital_painting.mp4', 300, 85, '디지털 드로잉으로 그리는 판타지 세계', '태블릿을 이용해 환상적인 판타지 세계를 창조해보세요!', 6600, 10000, '2024-02-12', '2024-02-12', 220),
(16, 27, 'busking2.jpg', 1324, 3, '안녕하세요 기타치는 제이지입니다.', '건대를 울리는 기타치는 제이지의 기타소리를 들어보세요', 3200, 5000, '2024-02-12', '2024-02-12', 60),
(17, 27, 'busking1.jpg', 1243, 4, '다시 돌아온 기타시간!! 제이지입니다.', '레전드 기타리스트 제이지의 공연을 즐겨보세요.', 3200, 5000, '2024-02-12', '2024-02-12', 60);



-- 댓글

-- 서울 한복판에서 펼쳐진 노래하는 제이지의 거리 공연 댓글
INSERT INTO stream_comments (stream_no, user_no, comments, created_time) VALUES 
(1, 1, '서울 한복판에서 이런 공연을? 대박이다!', '2024-02-12 12:00:00'),
(1, 2, '노래하는 제이지의 목소리에 반했어요. 더 많은 공연 기대할게요!', '2024-02-12 12:10:00'),
(1, 3, '이런 거리 공연 더 자주 있으면 좋겠다. 정말 행복한 시간이었어요!', '2024-02-12 12:20:00'),
(1, 4, '지나가다가 봤는데 정말 멋졌어요! 다음 공연도 꼭 보고 싶네요.', '2024-02-12 12:30:00'),
(1, 5, '감미로운 목소리로 서울 밤을 밝히는군요. 너무 좋았습니다!', '2024-02-12 12:40:00');

-- 노래하는 제이지의 강남스타일 커버 댓글
INSERT INTO stream_comments (stream_no, user_no, comments, created_time) VALUES 
(2, 6, '강남스타일 커버 진짜 신선했어요! 역시 제이지!', '2024-02-12 13:00:00'),
(2, 7, '강남에서 이런 퍼포먼스라니, 놀라워요. 팬 됐습니다!', '2024-02-12 13:15:00'),
(2, 8, '이 커버 너무 재밌어요ㅋㅋ 다음 커버도 기대됩니다!', '2024-02-12 13:30:00'),
(2, 9, '화려한 무대였어요! 제이지의 다음 공연이 벌써 기다려져요.', '2024-02-12 13:45:00'),
(2, 10, '강남스타일을 이렇게 새롭게 표현하다니, 정말 대단해요!', '2024-02-12 14:00:00');

-- 세계를 여행하는 채연의 제주도 탐험 댓글
INSERT INTO stream_comments (stream_no, user_no, comments, created_time) VALUES 
(3, 11, '제주도의 숨은 비경을 이렇게 보다니, 채연님 덕분에 좋은 곳 많이 알아갑니다!', '2024-02-12 14:15:00'),
(3, 12, '제주도 여행 가고 싶게 만드는 영상이네요. 정보 감사해요!', '2024-02-12 14:30:00'),
(3, 13, '채연님의 제주도 탐험기 너무 재미있어요. 더 많은 여행기 기대할게요!', '2024-02-12 14:45:00'),
(3, 14, '제주도의 아름다운 풍경들, 영상으로 보니까 더 가보고 싶어지네요.', '2024-02-12 15:00:00'),
(3, 15, '이렇게 멋진 제주도의 모습을 보여주셔서 감사합니다! 채연님 최고!', '2024-02-12 15:15:00');





-- 부산의 밤바다와 함께하는 채연의 여행 댓글
INSERT INTO stream_comments (stream_no, user_no, comments, created_time) VALUES 
(4, 16, '부산 밤바다 정말 아름다워요. 채연님 덕분에 좋은 경치 감상했네요!', '2024-02-12 15:30:00'),
(4, 17, '해운대 밤바다의 분위기가 느껴지는 영상이네요. 감성 충전됩니다!', '2024-02-12 15:45:00'),
(4, 18, '부산 여행 가고 싶게 만드는 영상입니다. 좋은 정보 감사해요!', '2024-02-12 16:00:00'),
(4, 19, '이런 멋진 영상 덕분에 집에서도 여행 기분을 느낄 수 있어요.', '2024-02-12 16:15:00'),
(4, 20, '밤바다의 매력을 잘 담아낸 영상이네요. 부산 가고 싶어졌어요!', '2024-02-12 16:30:00');

-- 제주 올레길에서의 운동하는 현우의 하이킹 댓글
INSERT INTO stream_comments (stream_no, user_no, comments, created_time) VALUES 
(5, 21, '제주도 올레길 하이킹 너무 멋지네요! 현우님 따라 해보고 싶어요.', '2024-02-12 16:45:00'),
(5, 22, '자연과 함께하는 운동이라니, 정말 건강에 좋을 것 같아요!', '2024-02-12 17:00:00'),
(5, 23, '제주도의 아름다운 경치를 보며 운동한다니, 너무 부럽습니다!', '2024-02-12 17:15:00'),
(5, 24, '올레길 하이킹 정보 감사합니다. 다음 제주도 여행 때 꼭 도전해볼게요!', '2024-02-12 17:30:00'),
(5, 25, '운동하면서 이렇게 멋진 풍경도 감상하다니, 최고의 조합이네요!', '2024-02-12 17:45:00');

-- 제주 해변에서 운동하는 현우와 함께하는 모닝 요가 댓글
INSERT INTO stream_comments (stream_no, user_no, comments, created_time) VALUES 
(6, 26, '해변에서의 모닝 요가, 정말 상쾌하겠어요! 영상 보는 것만으로도 힐링됩니다.', '2024-02-12 18:00:00'),
(6, 27, '아침 일찍부터 에너지 넘치는 현우님 보며 저도 운동 시작했어요!', '2024-02-12 18:15:00'),
(6, 28, '이렇게 아름다운 제주 해변에서 요가를 하다니, 너무 좋아 보여요.', '2024-02-12 18:30:00'),
(6, 29, '요가로 하루를 시작하는 건 정말 최고의 선택 같아요. 영상 잘 봤습니다!', '2024-02-12 18:45:00'),
(6, 30, '모닝 요가로 하루를 시작하는 모습이 너무 아름답네요. 저도 도전해봐야겠어요!', '2024-02-12 19:00:00');



-- 인천 송도에서 요리하는 민수의 해산물 요리 댓글
INSERT INTO stream_comments (stream_no, user_no, comments, created_time) VALUES 
(7, 31, '해산물 요리 보는 것만으로도 입에서 침이 꼴깍 넘어가네요!', '2024-02-12 19:10:00'),
(7, 32, '민수님 요리 솜씨가 정말 대단해요. 집에서 따라 해봐야겠어요!', '2024-02-12 19:20:00'),
(7, 33, '신선한 해산물로 만든 요리라니, 정말 맛있겠어요. 레시피 공유해주세요!', '2024-02-12 19:30:00'),
(7, 34, '인천 송도에서의 해산물 요리... 분위기까지 최고네요!', '2024-02-12 19:40:00'),
(7, 35, '해산물 요리, 정말 군침 돕니다. 민수님 요리 방송 더 기대할게요!', '2024-02-12 19:50:00');

-- 송도의 밤, 민수와 함께하는 한국식 바비큐 댓글
INSERT INTO stream_comments (stream_no, user_no, comments, created_time) VALUES 
(8, 36, '한국식 바비큐의 진수를 보여주시네요. 이런 분위기에서 먹으면 더 맛있겠어요!', '2024-02-12 20:00:00'),
(8, 37, '바비큐 파티 정말 좋아보여요. 민수님 레시피 대박이에요!', '2024-02-12 20:10:00'),
(8, 38, '저도 송도에서 바비큐 해먹고 싶어지네요. 분위기가 너무 좋아요!', '2024-02-12 20:20:00'),
(8, 39, '민수님 덕분에 새로운 바비큐 레시피 알아갑니다. 감사해요!', '2024-02-12 20:30:00'),
(8, 40, '이 영상 보고 바로 바비큐 파티 계획 세웠어요. 좋은 아이디어 감사합니다!', '2024-02-12 20:40:00');

-- 춘천 남이섬에서 그림 그리는 지아의 풍경화 댓글
INSERT INTO stream_comments (stream_no, user_no, comments, created_time) VALUES 
(9, 41, '지아님의 풍경화 너무 아름답네요. 남이섬의 자연이 그대로 느껴져요.', '2024-02-12 20:50:00'),
(9, 42, '이런 멋진 그림을 보게 되어 행복합니다. 지아님 작품 더 보고 싶어요!', '2024-02-12 21:00:00'),
(9, 43, '남이섬의 풍경을 이렇게 멋지게 담은 작품이라니, 감탄이 나옵니다.', '2024-02-12 21:10:00'),
(9, 44, '그림 속에 남이섬의 평온함이 잘 담겨있네요. 더 많은 작품 기대할게요!', '2024-02-12 21:20:00'),
(9, 45, '아름다운 남이섬을 그림으로 만나니 새로운 느낌이네요. 정말 멋진 작품입니다!', '2024-02-12 21:30:00');


-- 지아와 함께하는 온라인 드로잉 클래스 댓글
INSERT INTO stream_comments (stream_no, user_no, comments, created_time) VALUES 
(10, 46, '지아님 덕분에 드로잉에 흥미가 생겼어요! 좋은 수업 감사합니다.', '2024-02-12 21:40:00'),
(10, 47, '이런 온라인 클래스 너무 좋아요. 집에서도 쉽게 배울 수 있어서 좋네요!', '2024-02-12 21:50:00'),
(10, 48, '드로잉 기초부터 차근차근 알려주셔서 많은 도움이 됐어요.', '2024-02-12 22:00:00'),
(10, 49, '온라인으로 이렇게 질 좋은 수업 들을 수 있다니, 너무 행복합니다!', '2024-02-12 22:10:00'),
(10, 50, '집에서도 쉽게 따라 할 수 있어서 너무 좋아요. 다음 수업도 기대됩니다!', '2024-02-12 22:20:00');

-- 서울 국제 음악 페스티벌 하이라이트 댓글
INSERT INTO stream_comments (stream_no, user_no, comments, created_time) VALUES 
(11, 51, '음악 페스티벌 분위기가 느껴져서 좋네요. 직접 가보고 싶어요!', '2024-02-12 22:30:00'),
(11, 52, '전 세계 음악가들의 공연을 한눈에 볼 수 있어서 너무 멋진 경험이었습니다.', '2024-02-12 22:40:00'),
(11, 53, '서울의 밤을 빛내는 음악 페스티벌, 영상으로라도 경험할 수 있어서 좋았어요.', '2024-02-12 22:50:00'),
(11, 54, '이런 하이라이트 영상 너무 좋아요. 다음 페스티벌 때는 꼭 가보고 싶네요!', '2024-02-12 23:00:00'),
(11, 55, '음악으로 하나 되는 순간들을 보니 감동적이에요. 더 많은 영상 기대할게요!', '2024-02-12 23:10:00');

-- 경주 역사 탐방 브이로그 댓글
INSERT INTO stream_comments (stream_no, user_no, comments, created_time) VALUES 
(12, 56, '경주의 역사적인 장소들을 이렇게 볼 수 있어서 좋네요. 정보가 많아서 유익해요!', '2024-02-12 23:20:00'),
(12, 57, '역사 탐방 브이로그 너무 재밌어요. 경주 여행 가고 싶게 만듭니다.', '2024-02-12 23:30:00'),
(12, 58, '천년의 역사를 담은 경주, 영상으로 보니 더 가보고 싶어집니다.', '2024-02-12 23:40:00'),
(12, 59, '경주의 매력을 잘 담은 브이로그였어요. 다음 여행지로 꼭 가보고 싶네요.', '2024-02-12 23:50:00'),
(12, 60, '채연님 덕분에 경주의 숨은 매력을 알게 됐어요. 더 많은 여행기 기대할게요!', '2024-02-13 00:00:00');




-- 집에서 즐기는 효과 만점 홈트레이닝 댓글
INSERT INTO stream_comments (stream_no, user_no, comments, created_time) VALUES 
(13, 61, '이 홈트 비디오 덕분에 매일 아침을 활기차게 시작해요!', '2024-02-12 08:00:00'),
(13, 62, '간단한 도구로도 이렇게 효과적인 운동이 가능하다니! 감사합니다.', '2024-02-12 08:15:00'),
(13, 63, '홈트레이닝으로 집에서도 건강을 챙길 수 있어서 좋네요.', '2024-02-12 08:30:00'),
(13, 64, '현우님 운동 루틴 따라하기 시작했어요. 벌써 몸이 탄탄해지는 기분!', '2024-02-12 08:45:00'),
(13, 65, '이 운동 루틴으로 요즘 더 활기차게 하루를 보내고 있어요. 추천합니다!', '2024-02-12 09:00:00');

-- 요리 초보자를 위한 쉬운 레시피 댓글
INSERT INTO stream_comments (stream_no, user_no, comments, created_time) VALUES 
(14, 66, '요리 초보자인데, 이 레시피 덕분에 자신감이 생겼어요!', '2024-02-12 09:15:00'),
(14, 67, '민수님 레시피는 항상 실패 없이 맛있게 잘 돼요. 감사해요!', '2024-02-12 09:30:00'),
(14, 68, '누구나 쉽게 따라할 수 있어서 너무 좋아요. 다음 레시피도 기대됩니다!', '2024-02-12 09:45:00'),
(14, 69, '이렇게 간단하면서 맛있는 요리를 할 수 있다니, 신세계네요!', '2024-02-12 10:00:00'),
(14, 70, '매번 요리할 때마다 고민이었는데, 이제 이 레시피만 따라하면 되겠어요!', '2024-02-12 10:15:00');

-- 디지털 드로잉으로 그리는 판타지 세계 댓글
INSERT INTO stream_comments (stream_no, user_no, comments, created_time) VALUES 
(15, 71, '디지털 드로잉으로 이런 멋진 작품을 만들 수 있다니, 정말 놀랍습니다!', '2024-02-12 10:30:00'),
(15, 72, '태블릿으로 그림을 그리고 싶었는데, 이 영상 보고 바로 시작했어요!', '2024-02-12 10:45:00'),
(15, 73, '판타지 세계를 창조하는 과정이 정말 마법 같아요. 영감을 많이 받았습니다.', '2024-02-12 11:00:00'),
(15, 74, '지아님 덕분에 디지털 드로잉에 도전해보고 싶어졌어요. 멋진 영상 감사합니다!', '2024-02-12 11:15:00'),
(15, 75, '이런 아름다운 판타지 세계를 그릴 수 있다니, 정말 꿈같아요. 지아님 작품 더 보고 싶어요!', '2024-02-12 11:30:00');



UPDATE `test_db`.`stream_comments` SET `likes` = '2' WHERE (`comment_no` = '1');
UPDATE `test_db`.`stream_comments` SET `likes` = '3' WHERE (`comment_no` = '2');
UPDATE `test_db`.`stream_comments` SET `likes` = '1' WHERE (`comment_no` = '3');
UPDATE `test_db`.`stream_comments` SET `likes` = '4' WHERE (`comment_no` = '4');
UPDATE `test_db`.`stream_comments` SET `likes` = '2' WHERE (`comment_no` = '5');
UPDATE `test_db`.`stream_comments` SET `likes` = '2' WHERE (`comment_no` = '6');
UPDATE `test_db`.`stream_comments` SET `likes` = '2' WHERE (`comment_no` = '7');
UPDATE `test_db`.`stream_comments` SET `likes` = '4' WHERE (`comment_no` = '8');
UPDATE `test_db`.`stream_comments` SET `likes` = '4' WHERE (`comment_no` = '9');
UPDATE `test_db`.`stream_comments` SET `likes` = '3' WHERE (`comment_no` = '10');
UPDATE `test_db`.`stream_comments` SET `likes` = '2' WHERE (`comment_no` = '11');
UPDATE `test_db`.`stream_comments` SET `likes` = '3' WHERE (`comment_no` = '12');
UPDATE `test_db`.`stream_comments` SET `likes` = '3' WHERE (`comment_no` = '13');
UPDATE `test_db`.`stream_comments` SET `likes` = '2' WHERE (`comment_no` = '14');
UPDATE `test_db`.`stream_comments` SET `likes` = '2' WHERE (`comment_no` = '15');
UPDATE `test_db`.`stream_comments` SET `likes` = '4' WHERE (`comment_no` = '16');
UPDATE `test_db`.`stream_comments` SET `likes` = '4' WHERE (`comment_no` = '17');
UPDATE `test_db`.`stream_comments` SET `likes` = '3' WHERE (`comment_no` = '18');
UPDATE `test_db`.`stream_comments` SET `likes` = '4' WHERE (`comment_no` = '19');
UPDATE `test_db`.`stream_comments` SET `likes` = '3' WHERE (`comment_no` = '20');
UPDATE `test_db`.`stream_comments` SET `likes` = '2' WHERE (`comment_no` = '21');
UPDATE `test_db`.`stream_comments` SET `likes` = '3' WHERE (`comment_no` = '22');
UPDATE `test_db`.`stream_comments` SET `likes` = '4' WHERE (`comment_no` = '23');
UPDATE `test_db`.`stream_comments` SET `likes` = '2' WHERE (`comment_no` = '24');
UPDATE `test_db`.`stream_comments` SET `likes` = '2' WHERE (`comment_no` = '25');
UPDATE `test_db`.`stream_comments` SET `likes` = '2' WHERE (`comment_no` = '26');
UPDATE `test_db`.`stream_comments` SET `likes` = '2' WHERE (`comment_no` = '27');
UPDATE `test_db`.`stream_comments` SET `likes` = '4' WHERE (`comment_no` = '28');
UPDATE `test_db`.`stream_comments` SET `likes` = '4' WHERE (`comment_no` = '29');
UPDATE `test_db`.`stream_comments` SET `likes` = '4' WHERE (`comment_no` = '30');
UPDATE `test_db`.`stream_comments` SET `likes` = '3' WHERE (`comment_no` = '31');
UPDATE `test_db`.`stream_comments` SET `likes` = '2' WHERE (`comment_no` = '32');
UPDATE `test_db`.`stream_comments` SET `likes` = '3' WHERE (`comment_no` = '33');
UPDATE `test_db`.`stream_comments` SET `likes` = '4' WHERE (`comment_no` = '34');
UPDATE `test_db`.`stream_comments` SET `likes` = '3' WHERE (`comment_no` = '35');
UPDATE `test_db`.`stream_comments` SET `likes` = '2' WHERE (`comment_no` = '36');
UPDATE `test_db`.`stream_comments` SET `likes` = '2' WHERE (`comment_no` = '37');
UPDATE `test_db`.`stream_comments` SET `likes` = '3' WHERE (`comment_no` = '38');
UPDATE `test_db`.`stream_comments` SET `likes` = '3' WHERE (`comment_no` = '39');
UPDATE `test_db`.`stream_comments` SET `likes` = '2' WHERE (`comment_no` = '40');
UPDATE `test_db`.`stream_comments` SET `likes` = '4' WHERE (`comment_no` = '41');
UPDATE `test_db`.`stream_comments` SET `likes` = '2' WHERE (`comment_no` = '42');
UPDATE `test_db`.`stream_comments` SET `likes` = '4' WHERE (`comment_no` = '43');
UPDATE `test_db`.`stream_comments` SET `likes` = '3' WHERE (`comment_no` = '44');
UPDATE `test_db`.`stream_comments` SET `likes` = '2' WHERE (`comment_no` = '45');
UPDATE `test_db`.`stream_comments` SET `likes` = '4' WHERE (`comment_no` = '46');
UPDATE `test_db`.`stream_comments` SET `likes` = '2' WHERE (`comment_no` = '47');
UPDATE `test_db`.`stream_comments` SET `likes` = '4' WHERE (`comment_no` = '48');
UPDATE `test_db`.`stream_comments` SET `likes` = '3' WHERE (`comment_no` = '49');
UPDATE `test_db`.`stream_comments` SET `likes` = '2' WHERE (`comment_no` = '50');
UPDATE `test_db`.`stream_comments` SET `likes` = '4' WHERE (`comment_no` = '51');
UPDATE `test_db`.`stream_comments` SET `likes` = '3' WHERE (`comment_no` = '52');
UPDATE `test_db`.`stream_comments` SET `likes` = '2' WHERE (`comment_no` = '53');
UPDATE `test_db`.`stream_comments` SET `likes` = '2' WHERE (`comment_no` = '54');
UPDATE `test_db`.`stream_comments` SET `likes` = '3' WHERE (`comment_no` = '55');
UPDATE `test_db`.`stream_comments` SET `likes` = '4' WHERE (`comment_no` = '56');
UPDATE `test_db`.`stream_comments` SET `likes` = '4' WHERE (`comment_no` = '57');
UPDATE `test_db`.`stream_comments` SET `likes` = '2' WHERE (`comment_no` = '58');
UPDATE `test_db`.`stream_comments` SET `likes` = '3' WHERE (`comment_no` = '59');
UPDATE `test_db`.`stream_comments` SET `likes` = '4' WHERE (`comment_no` = '60');
UPDATE `test_db`.`stream_comments` SET `likes` = '2' WHERE (`comment_no` = '61');
UPDATE `test_db`.`stream_comments` SET `likes` = '3' WHERE (`comment_no` = '62');
UPDATE `test_db`.`stream_comments` SET `likes` = '4' WHERE (`comment_no` = '63');
UPDATE `test_db`.`stream_comments` SET `likes` = '2' WHERE (`comment_no` = '64');
UPDATE `test_db`.`stream_comments` SET `likes` = '2' WHERE (`comment_no` = '65');
UPDATE `test_db`.`stream_comments` SET `likes` = '3' WHERE (`comment_no` = '66');
UPDATE `test_db`.`stream_comments` SET `likes` = '4' WHERE (`comment_no` = '67');
UPDATE `test_db`.`stream_comments` SET `likes` = '4' WHERE (`comment_no` = '68');
UPDATE `test_db`.`stream_comments` SET `likes` = '3' WHERE (`comment_no` = '69');
UPDATE `test_db`.`stream_comments` SET `likes` = '2' WHERE (`comment_no` = '70');
UPDATE `test_db`.`stream_comments` SET `likes` = '3' WHERE (`comment_no` = '71');
UPDATE `test_db`.`stream_comments` SET `likes` = '2' WHERE (`comment_no` = '72');
UPDATE `test_db`.`stream_comments` SET `likes` = '3' WHERE (`comment_no` = '73');
UPDATE `test_db`.`stream_comments` SET `likes` = '2' WHERE (`comment_no` = '74');
UPDATE `test_db`.`stream_comments` SET `likes` = '3' WHERE (`comment_no` = '75');




-- 6. stream_hashtags 테이블에 20개의 랜덤 해시태그 예시 데이터 추가
INSERT INTO stream_hashtags (stream_no, hashtag)
VALUES
(1, '#홍대'), -- 1번 스트리밍의 해시태그 홍대
(1, '#비비'),
(1, '#김경호'),
(2, '#발라드'),
(2, '#버스킹'),
(2, '#홍대'),
(3, '#비비'),
(3, '#김경호'),
(4, '#발라드'),
(5, '#버스킹'),
(5, '#홍대'),
(6, '#비비'),
(6, '#김경호'),
(6, '#발라드'),
(6, '#버스킹'),
(7, '#홍대'),
(7, '#비비'),
(7, '#김경호'),
(8, '#홍대'),
(9, '#발라드');



-- 8. user_follows 테이블에 20개의 예시 레코드 추가
INSERT INTO user_follows (follower_id, followed_id)
VALUES
(3, 7),
(5, 3),
(7, 17),
(2, 5),
(3, 17),
(5, 7),
(7, 3),
(17, 2),
(2, 7),
(3, 5),
(5, 17),
(7, 2),
(17, 3),
(2, 3),
(3, 2),
(5, 5),
(7, 7),
(17, 17),
(2, 17),
(17, 7);



-- 9. user_reports 테이블에 예시 데이터 추가
INSERT INTO user_reports (user_no, report_time, report_type, reporter_no)
VALUES
(3, '2024-02-10 14:30:00', '사용자 부적절 행동', 5),
(7, '2024-02-11 10:45:00', '스팸 신고', 10),
(17, '2024-02-12 16:20:00', '불법 활동 신고', 3),
(2, '2024-02-13 08:15:00', '사용자 부적절 행동', 6),
(3, '2024-02-14 12:30:00', '스팸 신고', 9),
(5, '2024-02-15 17:55:00', '불법 활동 신고', 7),
(7, '2024-02-16 09:40:00', '사용자 부적절 행동', 8),
(17, '2024-02-17 15:10:00', '스팸 신고', 11),
(2, '2024-02-18 11:25:00', '불법 활동 신고', 12),
(3, '2024-02-19 13:45:00', '사용자 부적절 행동', 14),
(5, '2024-02-20 19:20:00', '스팸 신고', 16),
(7, '2024-02-21 14:50:00', '불법 활동 신고', 18),
(17, '2024-02-22 18:05:00', '사용자 부적절 행동', 19),
(2, '2024-02-23 10:30:00', '스팸 신고', 20),
(3, '2024-02-24 12:00:00', '불법 활동 신고', 4),
(5, '2024-02-25 15:35:00', '사용자 부적절 행동', 15),
(7, '2024-02-26 08:50:00', '스팸 신고', 13),
(17, '2024-02-27 11:15:00', '불법 활동 신고', 1),
(2, '2024-02-28 16:30:00', '사용자 부적절 행동', 2),
(3, '2024-02-29 14:25:00', '스팸 신고', 17),
(5, '2024-03-01 09:10:00', '불법 활동 신고', 4);















