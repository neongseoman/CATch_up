import React, {useEffect, useRef, useState} from "react";
import CustomText from "../components/CustomText";
import {PCConfig} from "../WebRTC/RTCConfig";
import * as StompJS from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import {koreaTime} from "../WebRTC/PCEvent";

// const audienceId = "audienceID"
const buskerId = "buskerID"
let makingOffer = false
const Watching = () => {
    const pcRef = useRef(new RTCPeerConnection(PCConfig));
    const clientRef = useRef(
        new StompJS.Client({
            brokerURL: "ws://127.0.0.1:8080/signal",
        })
    );

    const pc = pcRef.current;
    const client = clientRef.current;
    const audienceId = localStorage.getItem("user");
    useEffect(() => {
        const remoteVideo = document.getElementById("remoteVideo")

        pc.onicecandidate = (event) => { //setLocalDescription이 불러옴.
            if (event.candidate) {
                console.log("Client Send Ice Candidate : [ " + event.candidate.candidate + " ] ")
                client.publish({
                    destination: `/app/audience/${audienceId}/iceCandidate`,
                    body: JSON.stringify({
                        buskerId,
                        audienceId,
                        iceCandidate: event.candidate
                    })
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
        pc.ontrack = (event) =>{
            remoteVideo.srcObject = event.streams[0]
        }
        pc.onsignalingstatechange = (event) =>{
        }

        if (typeof WebSocket !== 'function') {
            client.webSocketFactory = function () {
                console.log("Stomp error sockjs is running");
                return new SockJS('http://127.0.0.1:8080/signal');
            };
        }

        client.onConnect = (frame) => {
            console.log(frame); // stomp status

            makingOffer = true
            pc.createOffer({
                offerToReceiveAudio:true,
                offerToReceiveVideo:true
            })
                .then((offer) => {
                    console.log("sdp offer created") // sdp status
                    pc.setLocalDescription(offer)
                        .then((r) => {
                            client.publish({
                                destination: `/app/audience/${audienceId}/offer`,
                                body: JSON.stringify({
                                    buskerId,
                                    audienceId,
                                    offer,
                                })
                            })
                            new RTCPeerConnectionIceEvent("onicecandidate")
                            makingOffer = false
                        })
                })
                .catch((error) => {
                    console.log(error)
                })

            // sdpOffer를 보내고 Answer를 받음
            client.subscribe(`/audience/${audienceId}/sdpAnswer`, (res) => {
                const offerResponse = JSON.parse(res.body);
                const answerId = offerResponse.id;
                const response = offerResponse.response;
                const sdpAnswer = offerResponse.sdpAnswer;

                // console.log("Received SDP Answer \n");
                console.log("Received SDP Answer \n"+offerResponse.id)
                pc.setRemoteDescription({
                    type: "answer",
                    sdp: sdpAnswer
                }).then(() => {
                    console.log("Remote description set successfully");
                }).catch((error) => {
                    console.error("Error setting remote description:", error);
                });
            })

            client.subscribe(`/audience/${audienceId}/iceCandidate`, (res) => {
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
                시청하기입니다
                드디어 만들어보는 시청자 화면....흑흑 너모 기쁜거시에요
            </CustomText>
            <video id="remoteVideo" autoPlay controls></video>
        </>
    )
}


export default Watching;