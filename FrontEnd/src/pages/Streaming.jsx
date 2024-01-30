import React, {useEffect} from "react";
import CustomText from "../components/CustomText";
import {useRecoilState, useRecoilValue} from "recoil";
import {userInfoState} from "../RecoilState/userRecoilState.js"
import {stompConnection} from "../WebRTC/StreamerStomp";

const stompClient = stompConnection("busker")
const Streaming =() =>{

    const [userInfo,setUserInfo] = useRecoilState(userInfoState)
    const userId = userInfo.userId
    const userNickName = userInfo.userNickName
    let count = 0

    // Establish Web Socket

    // Set Peer Connection

    useEffect( () => {
        const constraints = {video:true,audio:false}

         navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) =>{
                const videoElement = document.getElementById("streamingVideo")
                const videoTrack = stream.getVideoTracks();
                videoElement.srcObject = stream;

            }).catch(error=>{
            if (error.name === "OverconstrainedError") {
                console.error(
                    `The resolution ${constraints.video.width.exact}x${constraints.video.height.exact} px is not supported by your device.`,
                );
            } else if (error.name === "NotAllowedError") {
                console.error(
                    "You need to grant this page permission to access your camera and microphone.",
                );
            } else {
                console.error(`getUserMedia error: ${error.name}`, error);
            }
        })
    }, []);

    return(
        <>
            <CustomText typography="h1" bold>
                방송하기 입니다
            </CustomText>
            <video id="streamingVideo" autoPlay controls></video>

        </>
    )
}

export default Streaming;