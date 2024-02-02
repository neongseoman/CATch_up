import React, {useEffect} from "react";
import CustomText from "../components/CustomText";
import {PCConfig} from "../WebRTC/RTCConfig";
// import {stompClient} from "../WebRTC/StompClientSington";
import * as StompJS from "@stomp/stompjs";
import * as SockJS from "sockjs-client";

const pc = new RTCPeerConnection(PCConfig);
const userId = "audienceTest"
const buskerId = "testId";
// const remoteVideo = document.getElementById("remoteVideo")
const Watching = () => {

    // Set Peer Connection
    useEffect(() => {
        const constraints = {video: true, audio: false}
        const remoteVideo = document.getElementById("remoteVideo")
        pc.ontrack = (stream) =>{
            console.log(stream)
            // event.streams[0]은 remote peer에서 수신한 스트림입니다.
            // video 엘리먼트의 소스로 remote 스트림을 설정합니다.
            remoteVideo.srcObject = stream.streams[0];
        }


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
            console.log(frame);

            client.publish({
                destination: `/app/audience`,
                // destination:`/app/busker/${buskerName}`,
                body: JSON.stringify({audienceId: userId + " is connect!"})
            })

            pc.createOffer({
                iceRestart: true,
            }).then((offer) => {
                console.log(offer)
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
                        // console.log(r)
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

                console.log("Received SDP Answer \n");
                console.log(offerResponse)
                pc.setRemoteDescription({
                    type: "answer",
                    sdp: sdpAnswer
                }).then(() => {
                    console.log("Remote description set successfully");
                }).catch((error) => {
                    console.error("Error setting remote description:", error);
                });
            });
            // IceCandidate를 받음.
            pc.onicecandidate = (event)=>{ //setLocalDescription call this event.
                console.log(event)
                if (event.candidate){
                    console.log("candidate: " + event.candidate)
                    client.publish({
                        destination: `/app/audience/${userId}/iceCandidate`,
                        body: JSON.stringify({ iceCandidate: event.candidate })
                    });
                }
                if (event && event.target && event.target.iceGatheringState === 'complete') {
                    console.log('done gathering candidates - got iceGatheringState complete');
                }
            }

            client.subscribe(`/audience/${userId}/iceCandidate`,(res)=>{
                const iceResponse = JSON.parse(res.body);
                console.log("peer candidate: " +iceResponse.candidate.candidate)
                console.log("peer candidate: " +iceResponse.candidate.sdpMid)
                if (iceResponse.id==="iceCandidate"){
                    pc.addIceCandidate(iceResponse.candidate)
                        .then(() => console.log("peer candidate: " + iceResponse.candidate.candidate))
                        .catch(error => console.log(error))
                }
            })



            client.subscribe(`/audience/${userId}/receiveError`,(r)=>{
                console.log(r)
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
                시청하기 입니다
            </CustomText>
            <video id="remoteVideo" autoPlay controls></video>

        </>
    )
}

export default Watching;