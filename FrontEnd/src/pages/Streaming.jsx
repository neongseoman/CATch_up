import React, {useEffect, useRef, useState} from "react";
import CustomText from "../components/CustomText";
import {PCConfig} from "../WebRTC/RTCConfig";
import * as StompJS from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import {koreaTime} from "../WebRTC/PCEvent";
import {useRecoilState} from "recoil";
import {userInfoState} from "../RecoilState/userRecoilState";
import {useNavigate} from "react-router-dom";

// const userId = "buskerID"
let makingOffer = false


const Streaming = ({ isStreaming }) => {
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const pcRef = useRef(new RTCPeerConnection(PCConfig));
    const clientRef = useRef(
        new StompJS.Client({
            brokerURL: `${process.env.REACT_APP_API_WEBSOCKET_BASE_URL}`,
        })
    );
    const pc = pcRef.current;
    const client = clientRef.current;
    const userId = userInfo.userId
    const navigate = useNavigate();

    // Set Peer Connection
    useEffect(() => {
        if (isStreaming === false){
            pc.getSenders().forEach(sender => pc.removeTrack(sender))
            client.deactivate()
            pc.close()

            client.publish({
                destination: `app/busker/${userId}/stopBusking`
            })
            navigate("/")
        }
        const videoElement = document.getElementById("streamingVideo")
        pc.onicecandidate = (event) => { //setLocalDescription이 불러옴.
            if (event.candidate) {
                // console.log("Client Send Ice Candidate : [ " + event.candidate.candidate + " ] ")
                // candidateList.push({iceCandidate: event.candidate})
                client.publish({
                    destination: `/app/api/busker/${userId}/iceCandidate`,
                    body: JSON.stringify({iceCandidate: event.candidate})
                });
            }
            if ( event.target.iceGatheringState === 'complete') {
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
                                destination: `/app/api/busker/${userId}/offer`,
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
                console.log("buskerId : "+ userId)
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
                return new SockJS(`${process.env.REACT_APP_API_BASE_URL}/api`);
            };
        }

        client.onConnect = (frame) => {
            console.log(frame);
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

        return () => {
            // Cleanup function to be executed on component unmount
            console.log("Closing WebSocket connection and Peer Connection");
            client.deactivate(); // Close the WebSocket connection
            pc.close(); // Close the Peer Connection
        };

    }, [isStreaming]);
    return (
        <>
            <video id="streamingVideo" style={{width: '100%'}} autoPlay controls></video>
        </>
    )
}

export default Streaming;
