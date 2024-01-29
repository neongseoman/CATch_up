import React, {useEffect} from "react";
import CustomText from "../components/CustomText";

const Streaming =() =>{
    useEffect(() => {
        const constraints = {video:true,audio:true}

        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) =>{
                const videoElement = document.getElementById("streamingVideo")
                const videoTrack = stream.getVideoTracks();
                console.log("video track is gotten")
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