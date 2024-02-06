import React, {useEffect, useRef, useState} from "react";
import CustomText from "../components/CustomText";
import {PCConfig} from "../WebRTC/RTCConfig";
import * as StompJS from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import {koreaTime} from "../WebRTC/PCEvent";

const userId = "buskerID"
let makingOffer = false

// 대체 왜 이게 2번이나 마운트되는거야?
const Streaming = () => {
    const pcRef = useRef(new RTCPeerConnection(PCConfig));
    const clientRef = useRef(
        new StompJS.Client({
            brokerURL: "ws://127.0.0.1:8080/signal",
        })
    );

    const pc = pcRef.current;
    const client = clientRef.current;

    // Set Peer Connection
    useEffect(() => {
        const videoElement = document.getElementById("streamingVideo")
        pc.onicecandidate = (event) => { //setLocalDescription이 불러옴.
            if (event.candidate) {
                console.log("Client Send Ice Candidate : [ " + event.candidate.candidate + " ] ")
                client.publish({
                    destination: `/app/busker/${userId}/iceCandidate`,
                    body: JSON.stringify({iceCandidate: event.candidate})
                });
            }
            if (event && event.target && event.target.iceGatheringState === 'complete') {
                console.log('done gathering candidates - got iceGatheringState complete');
            }
        }
        pc.oniceconnectionstatechange = (event) => {
            if (pc.iceConnectionState === 'new'){
                console.log(koreaTime +' 피어 연결을 시작 합니다. ')
            }
            console.log(koreaTime +' ICE 연결 상태:', pc.iceConnectionState);
            if (pc.iceConnectionState === 'connected') {
                console.log(pc.getStats().then(r=> console.log(koreaTime+" "+r)))
                console.log(koreaTime +' 피어 간 연결이 성공적으로 수립되었습니다.');
            } else if (pc.iceConnectionState === 'disconnected'){

                console.log(koreaTime +' 피어 간 연결이  끊어졌습니다.')
            } else if(pc.iceConnectionState === 'failed') {
                pc.restartIce()
                console.log(koreaTime +' 피어 간 연결이  실패.');
            }
        };
        pc.onconnectionstatechange = (event) => { // 데이터 연결 상태 확인
            console.log('데이터 연결 상태:', pc.connectionState);
            if (pc.connectionState === 'connected') {
                console.log(koreaTime +' 데이터 연결이 확립되었습니다.');
            } else if (pc.connectionState === 'disconnected') {
                console.log(koreaTime +' 데이터 연결이 끊어졌습니다.');
            }
        };
        pc.onnegotiationneeded = (event) => {
            console.log(koreaTime+ " Negotiation을 진행합니다.")
            makingOffer = true
            pc.createOffer({
            })
                .then((offer) => {
                    console.log("sdp offer created") // sdp status
                    pc.setLocalDescription(offer)
                        .then((r) => {
                            client.publish({
                                destination: `/app/busker/${userId}/offer`,
                                body: JSON.stringify({
                                    userId,
                                    offer,
                                })
                            })
                            makingOffer = false
                        })
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        const constraints = {video: true, audio: false}

         navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                for (const track of stream.getTracks()){
                    pc.addTrack(track,stream)
                }
                videoElement.srcObject = stream
            }).catch(error => {
                if (error.name === "OverconstrainedError") {
                    console.error(
                        `The resolution ${constraints.video.width.exact}x${constraints.video.height.exact} px is not supported by your device.`,
                    );
                } else if (error.name === "NotAllowedError") {
                    console.error("You need to grant this page permission to access your camera and microphone.",);
                } else {
                    console.error(`getUserMedia error: ${error.name}`, error);
                }
        })

        if (typeof WebSocket !== 'function') {
            client.webSocketFactory = function () {
                console.log("Stomp error sockjs is running");
                return new SockJS('http://127.0.0.1:8080/signal');
            };
        }

        client.onConnect = (frame) => {
            console.log(frame);
            //connection check
            // client.publish({
            //     destination: `/app/busker`,
            //     body: JSON.stringify({buskerName: userId + " is connect!"})
            // })

            // sdpOffer를 보내고 Answer를 받음
            client.subscribe(`/busker/${userId}/sdpAnswer`, (res) => {
                const offerResponse = JSON.parse(res.body);
                const answerId = offerResponse.id;
                const response = offerResponse.response;
                const sdpAnswer = offerResponse.sdpAnswer;

                // console.log("Received SDP Answer \n");
                console.log("Received SDP Answer \n"+offerResponse)
                pc.setRemoteDescription({
                    type: "answer",
                    sdp: sdpAnswer
                }).then(() => {
                    console.log("Remote description set successfully");
                }).catch((error) => {
                    console.error("Error setting remote description:", error);
                });
            });

            // IceCandidate 받음.
            client.subscribe(`/busker/${userId}/iceCandidate`, (res) => {
                const iceResponse = JSON.parse(res.body);
                if (iceResponse.id === "iceCandidate") {
                    console.log(koreaTime + " server send ice \n" + iceResponse.candidate.candidate)
                    const icecandidate = new RTCIceCandidate(iceResponse.candidate)
                    pc.addIceCandidate(icecandidate)
                        .then()
                }
            })
        }
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