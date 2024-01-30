import React, {useEffect} from "react";
import CustomText from "../components/CustomText";
import {useRecoilState, useRecoilValue} from "recoil";
import {userInfoState} from "../RecoilState/userRecoilState.js"
import {stompConnection} from "../WebRTC/StreamerStomp";

// Establish Web Socket
// 함수 내에 있으면 객체가 여러개 생김....
const stompClient = await stompConnection("audience")
const pc = new RTCPeerConnection();
const Watching = () =>{

    const [userInfo,setUserInfo] = useRecoilState(userInfoState)
    const userId = userInfo.userId
    const userNickName = userInfo.userNickName
    let count = 0

    // Set Peer Connection

    // RTC로 받아온 영상 뿌려주기
    // useEffect( () => {
    //     const constraints = {video:true,audio:false}
    //
    //     // 여기서 RTC로 받아온 영상을 뿌려줘야함.
    //     navigator.mediaDevices.getUserMedia(constraints)
    //         .then((stream) =>{
    //             const videoElement = document.getElementById("streamingVideo")
    //             const videoTrack = stream.getVideoTracks();
    //             videoElement.srcObject = stream;
    //
    //         }).catch(error=>{
    //         if (error.name === "OverconstrainedError") {
    //             console.error(
    //                 `The resolution ${constraints.video.width.exact}x${constraints.video.height.exact} px is not supported by your device.`,
    //             );
    //         } else if (error.name === "NotAllowedError") {
    //             console.error(
    //                 "You need to grant this page permission to access your camera and microphone.",
    //             );
    //         } else {
    //             console.error(`getUserMedia error: ${error.name}`, error);
    //         }
    //     })
    // }, []);

    return(
        <>
            <CustomText typography="h1" bold>
                시청하기 입니다
            </CustomText>
            <video id="streamingVideo" autoPlay controls></video>

        </>
    )
}

export default Watching;