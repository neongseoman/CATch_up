import React, {useEffect, useState} from "react";
import CustomText from "../components/CustomText";
import {PCConfig} from "../WebRTC/RTCConfig";
// import {stompClient} from "../WebRTC/StompClientSington";
import * as StompJS from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import login from "./Login";


const pc = new RTCPeerConnection(PCConfig);
const userId = "testId"

// 대체 왜 이게 2번이나 마운트되는거야?
const Streaming =  () => {

    // Set Peer Connection
    useEffect(() => {
        const constraints = {video: true, audio: false}

        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                const videoElement = document.getElementById("streamingVideo")
                videoElement.srcObject = stream;
                //
                stream.getVideoTracks()
                    .map((stream) => {
                        pc.addTrack(stream)
                    })

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

        //Stomp socket connection

        const client = new StompJS.Client({
            brokerURL: "ws://127.0.0.1:8081/signal"
        });

        if (typeof WebSocket !== 'function') {
            client.webSocketFactory = function () {
                console.log("Stomp error sockjs is running");
                return new SockJS('http://127.0.0.1:8081/signal');
            };
        }

        client.onConnect = (frame) => {
            console.log(frame);

            client.publish({
                destination:`/app/busker`,
                // destination:`/app/busker/${buskerName}`,
                body:JSON.stringify({buskerName:userId+" is connect!"})
            })

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

            client.subscribe(
                `/busker/${userId}/sdpAnswer`, (res) => {
                    // console.log('신호 수신:', res);
                    const offerResponse = JSON.parse(res.body);
                    const answerId = offerResponse.id;
                    const response = offerResponse.response
                    const sdpAnswer = offerResponse.sdpAnswer
                    console.log(sdpAnswer)
                        pc.setRemoteDescription({
                            type: "answer",
                            sdp: sdpAnswer
                        })
                            .then(r => console.log("set remote : " + r))
                            .catch(e => console.log(e))
                });
        };

        client.onStompError = (frame) => {
            console.log('Broker reported error: ' + frame.headers['message']);
            console.log('Additional details: ' + frame.body);
        };

        client.activate();


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