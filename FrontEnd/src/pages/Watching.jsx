import React, {useEffect, useState} from "react";
import CustomText from "../components/CustomText";
import {PCConfig} from "../WebRTC/RTCConfig";
import * as StompJS from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import login from "./Login";
import * as events from "events";

const pc = new RTCPeerConnection(PCConfig);
const userId = "audienceID"
const buskerId = "buskerID"

const Streaming = () => {

    // Set Peer Connection
    useEffect(() => {
        pc.onicecandidate = (event) => { //setLocalDescription이 불러옴.
            // console.log(event)
            if (event.candidate) {
                console.log("candidate: " + event.candidate)
                client.publish({
                    destination: `/app/audience/${userId}/iceCandidate`,
                    body: JSON.stringify({
                        buskerId,
                        audienceId:userId,
                        iceCandidate: event.candidate})
                });
            }
            if (event && event.target && event.target.iceGatheringState === 'complete') {
                console.log('done gathering candidates - got iceGatheringState complete');
            }
        }
        pc.oniceconnectionstatechange = function(event) {
            console.log('ICE 연결 상태:', pc.iceConnectionState);

            if (pc.iceConnectionState === 'connected') {
                console.log('피어 간 연결이 성공적으로 수립되었습니다.');
            } else if (pc.iceConnectionState === 'disconnected'){
                console.log('피어 간 연결이  끊어졌습니다.')
            } else if(pc.iceConnectionState === 'failed') {
                console.log('피어 간 연결이  실패.');
            }
        };
        pc.onconnectionstatechange = function(event) { // 데이터 연결 상태 확인

            console.log('데이터 연결 상태:', pc.connectionState);

            if (pc.connectionState === 'connected') {
                console.log('데이터 연결이 확립되었습니다.');
            } else if (pc.connectionState === 'disconnected') {
                console.log('데이터 연결이 끊어졌습니다.');
            }
        };
        pc.ontrack = (event) => {
            const remoteVideo = document.getElementById("remoteVideo")
            // console.log('gotRemoteStream', event.track, event.streams[0]);

            // reset srcObject to work around minor bugs in Chrome and Edge.
            remoteVideo.srcObject = null;

            remoteVideo.srcObject = event.streams[1];
        }
        pc.onnegotiationneeded = (event) => {}
        pc.onsignalingstatechange = (event) => {

        }

        //Stomp socket connection
        const client = new StompJS.Client({
            brokerURL: "ws://127.0.0.1:8080/signal"
        });

        if (typeof WebSocket !== 'function') {
            client.webSocketFactory = function () {
                console.log("Stomp error sockjs is running");
                return new SockJS('http://127.0.0.1:8080/signal');
            };
        }

        client.onConnect = (frame) => {
            console.log(frame); // stomp status
            //connection check
            client.publish({
                destination: `/app/audience`,
                body: JSON.stringify({AudienceID: userId + " is connect!"})
            })

            pc.createOffer({
                iceRestart:false,
                offerToReceiveAudio:true,
                offerToReceiveVideo:true
            })
                .then((offer) => {
                    console.log("sdp offer created") // sdp status
                    pc.setLocalDescription(offer)
                        .then((r) => {
                            client.publish({
                                destination: `/app/audience/${userId}/offer`,
                                body: JSON.stringify({
                                    buskerId,
                                    audienceId:userId,
                                    offer,
                                })
                            })
                        })
                })
                .catch((error) => {
                    console.log(error)
                })

            // sdpOffer를 보내고 Answer를 받음
            client.subscribe(`/audience/${userId}/sdpAnswer`, (res) => {
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
            //
            client.subscribe(`audience/${userId}`,(res)=>{
                console.log(JSON.parse(res.body))
            })
            // IceCandidate 받음.
            client.subscribe(`/audience/${userId}/iceCandidate`, (res) => {
                const iceResponse = JSON.parse(res.body);
                if (iceResponse.id === "iceCandidate") {
                    console.log("server send ice")
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


export default Streaming;