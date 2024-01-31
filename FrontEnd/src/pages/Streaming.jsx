import React, {useEffect, useState} from "react";
import CustomText from "../components/CustomText";
import {PCConfig} from "../WebRTC/RTCConfig";
import {stompClient} from "../WebRTC/StompClientSington";
import * as StompJS from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import login from "./Login";



const pc = new RTCPeerConnection(PCConfig);
const userId = "testId"
const Streaming =  () => {
    const client = stompClient;
    // Establish Web Socket
    // Set Peer Connection
    useEffect(() => {
        const constraints = {video: true, audio: false}

        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                const videoElement = document.getElementById("streamingVideo")
                videoElement.srcObject = stream;
                //
                stream.getVideoTracks()
                    .map((stream) =>
                    {
                //         console.log(stream.getSettings())}
                pc.addTrack(stream)}
                )

            }).catch(error => {
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
        // PeerConnection Let's Go
        if (client.connected){ // 이걸 비동기로 만들어야해.
            const subscription = client.subscribe(
                '/busker', (res) => {
                    console.log('신호 수신:', res);
                    const parsedBody = JSON.parse(res.body);
                    console.log('파싱된 메시지:', parsedBody);
                });
            const sdpAnswer = client.subscribe(
                `/busker/${userId}/sdpAnswer`, (res) => {
                    // console.log('신호 수신:', res);
                    const sdpAnswer = JSON.parse(res.body);
                    console.log('sdpAnswer:', sdpAnswer);
                    pc.setRemoteDescription(sdpAnswer)
                        .then( r=> console.log("set remote : " + r));
                });

            const sdpReceive = client.subscribe(
                `/busker/${userId}/answer`,(res)=>{
                    // console.log(res)
                    console.log("connect answer: ",JSON.parse(res.body))
                }
            )

            client.publish({
                destination:`/app/busker`,
                // destination:`/app/busker/${buskerName}`,
                body:JSON.stringify({buskerName:userId+" is connect!"})
            })

            const sdpOffer =
                pc.createOffer({
                    iceRestart: true,
                }).then((offer) => {
                    console.log(offer)
                    pc.setLocalDescription(offer)
                        .then(()=>{
                            client.publish({
                                destination: `/app/busker/${userId}/offer`,
                                body: JSON.stringify({
                                    userId,
                                    offer,
                                })
                            })
                        })
                })
                .catch((error) => {
                    console.log(error)
                })

        }

    }, []);

    return (
        <>
            <CustomText typography="h1" bold>
                방송하기 입니다
            </CustomText>
            <video id="streamingVideo" autoPlay controls></video>

        </>
    )
}

export default Streaming;
