import React, {useEffect, useRef, useState} from "react";
import CustomText from "../components/common/CustomText";
import {PCConfig} from "../WebRTC/RTCConfig";
import * as StompJS from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import { getKoreaTime} from "../Apis/common";
import {useRecoilState} from "recoil";
import {userInfoState} from "../RecoilState/userRecoilState";
import axios from "axios";

// const audienceId = "audienceID"
let makingOffer = true
const Watching = ({buskerEmail}) => {
    const pcRef = useRef(new RTCPeerConnection(PCConfig));
    const clientRef = useRef(
        new StompJS.Client({
            brokerURL: `${process.env.REACT_APP_API_WEBSOCKET_BASE_URL}`,
        })
    );
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const buskerId= buskerEmail;
    const pc = pcRef.current;
    const client = clientRef.current;
    const userId = userInfo.userId

    useEffect(() => {
        const remoteVideo = document.getElementById("remoteVideo")

        pc.onicecandidate = (event) => { //setLocalDescription이 불러옴.
            if (event.candidate) {
                // console.log("Client Send Ice Candidate : [ " + event.candidate.candidate + " ] ")
                client.publish({
                    destination: `/app/api/audience/${userId}/iceCandidate`,
                    body: JSON.stringify({
                        buskerId,
                        audienceId: userId,
                        iceCandidate: event.candidate
                    })
                });
            }
            if (event && event.target && event.target.iceGatheringState === 'complete') {
                console.log('done gathering candidates - got iceGatheringState complete');
            }
        }
        pc.oniceconnectionstatechange = (event) => {
            const currentKoreaTime = getKoreaTime();
            console.log(currentKoreaTime+' - ICE 연결 상태:', pc.iceConnectionState);
            if (pc.iceConnectionState === 'new'){
                console.log(currentKoreaTime +' 피어 연결을 시작 합니다. ')
            }
            console.log(currentKoreaTime +' ICE 연결 상태:', pc.iceConnectionState);
            if (pc.iceConnectionState === 'connected') {
                console.log(currentKoreaTime +' 피어 간 연결이 성공적으로 수립되었습니다.');
            }
            else if (pc.iceConnectionState === 'disconnected' || pc.iceConnectionState === 'failed') {
                console.log(currentKoreaTime +' 피어 간 연결이 끊어졌거나 실패했습니다.');
            }
        };
        pc.onconnectionstatechange = (event) => { // 데이터 연결 상태 확인

            const currentKoreaTime = getKoreaTime();
            console.log(currentKoreaTime+' - 데이터 연결 상태:', pc.connectionState);
            if (pc.connectionState === 'connected') {
                console.log(currentKoreaTime +' 데이터 연결이 확립되었습니다.');
            } else if (pc.connectionState === 'disconnected') {
                console.log(currentKoreaTime +' 데이터 연결이 끊어졌습니다.');
            } else if(pc.connectionState === "failed"){
                console.log(currentKoreaTime +' 데이터 연결을 실패했습니다.');
            }
        };
        pc.ontrack = (event) =>{
            remoteVideo.srcObject = event.streams[0]
        }
        pc.onsignalingstatechange = (event) => {
            const currentKoreaTime = getKoreaTime();
            console.log(currentKoreaTime + " signaling 상태가 바뀝니다.")
            console.log(pc.signalingState)
        }
        pc.onnegotiationneeded = (event) => {
            const currentKoreaTime = getKoreaTime();
            console.log(currentKoreaTime+ " onnegotiationneeded")
        }


        if (typeof WebSocket !== 'function') {
            client.webSocketFactory = function () {
                console.log("Stomp error sockjs is running");
                return new SockJS('https://i10a105.p.ssafy.io/api/signal');
            };
        }

        client.onConnect = (frame) => {
            console.log(frame); // stomp status
            console.log(makingOffer)
            if (makingOffer) {
                pc.createOffer({
                    offerToReceiveAudio:true,
                    offerToReceiveVideo:true
                })
                    .then((offer) => {
                        console.log("sdp offer created") // sdp status
                        pc.setLocalDescription(offer)
                            .then((r) => {
                                client.publish({
                                    destination: `/app/api/audience/${userId}/offer`,
                                    body: JSON.stringify({
                                        buskerId,
                                        audienceId: userId,
                                        offer,
                                    })
                                })
                                new RTCPeerConnectionIceEvent("onicecandidate")
                            })
                    })
                    .catch((error) => {
                        console.log(error)
                    })

                makingOffer = false
            }

            // sdpOffer를 보내고 Answer를 받음
            client.subscribe(`/audience/${userId}/sdpAnswer`, (res) => {
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

            client.subscribe(`/audience/${userId}/iceCandidate`, (res) => {

                const currentKoreaTime = getKoreaTime();
                const iceResponse = JSON.parse(res.body);
                if (iceResponse.id === "iceCandidate" && pc.connectionState !== "connected") {
                    console.log(currentKoreaTime + " server send ice \n" + iceResponse.candidate.candidate)
                    const icecandidate = new RTCIceCandidate(iceResponse.candidate)
                    pc.addIceCandidate(icecandidate)
                        .then()
                } else if (iceResponse.id === "iceCandidate" && pc.connectionState === "connected"){
                    pc.restartIce()
                }
            })
        }
        client.onStompError = (frame) => {
            console.log('Broker reported error: ' + frame.headers['message']);
            console.log('Additional details: ' + frame.body);
        };

        client.activate();

        return () => {
            // Cleanup function to be executed on component unmount
            const response = axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/audience/${userId}/leaveBusking`, {
                body: JSON.stringify({
                    buskerId,
                    userId
                })
            })
                .then(r => {
                    console.log(r)
                })
            console.log("Closing WebSocket connection and Peer Connection");
            client.deactivate().then(r => console.log(r)); // Close the WebSocket connection
            pc.close(); // Close the Peer Connection
        };


    }, []);

    return (
        <>
            <video id="remoteVideo" autoPlay controls></video>
        </>
    )
}


export default Watching;