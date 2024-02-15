import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";

import * as StompJS from "@stomp/stompjs";
// import { Client } from "@stomp/stompjs";
import "./css/ChatApp.css";

const ChatApp = () => {
  const [roomId, setRoomId] = useState("public");
  const [lastClickedItem, setLastClickedItem] = useState(null);
  const [stompClient, setStompClient] = useState(null);
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const chatContainerRef = useRef(null);
  const [showButton, setShowButton] = useState(true);
  const [isNarrowScreen, setIsNarrowScreen] = useState(window.innerWidth < 900);

  useEffect(() => {
    const handleResize = () => {
      setIsNarrowScreen(window.innerWidth < 900);
    };

    // 창 크기가 변경될 때마다 handleResize 함수를 호출
    window.addEventListener('resize', handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleItemClick = (item) => {
    if (lastClickedItem !== null) {
      lastClickedItem.classList.remove("clicked");
    }
    item.classList.add("clicked");
    setLastClickedItem(item);
  };

  const joinChatRoom = () => {
    // disconnect();

    const connectedRoomId = "public";
    console.log("임시방으로 접속. connectedRoomId: " + connectedRoomId);

    setRoomId("public");

    connect();
    setChatMessages([
      { sender: "System", content: "You have joined the room." },
    ]);
    setShowButton(false); // 버튼 숨김
  };

  const connect = () => {
    // if (stompClient) disconnect();

    // const socket = new SockJS("http://127.0.0.1:8080/chat");
    // const client = new Client(); // Create a new 'Client' instance
    const client = new StompJS.Client({
      brokerURL: "wss://i10a105.p.ssafy.io/api/chat",
    });

    // client.webSocketFactory = () => socket;
    client.onConnect = (frame) => {
      console.log("Connected " + roomId);
      console.log(frame);
      console.log(`/topic/${roomId}`);
      client.subscribe(`/topic/${roomId}`, (chatMessage) => {
        console.log("메세지 왔습니다.");
        showMessage(JSON.parse(chatMessage.body));
      });
    };

    client.activate(); // Activate the client
    console.log("스톰프 연결");
    setStompClient(client);
  };

  const disconnect = () => {
    if (stompClient !== null) {
      stompClient.disconnect();
    }
    console.log("Disconnected");
  };

  const sendMessage = () => {
    if (stompClient !== null && stompClient.connected) {
      const chatMessage = JSON.stringify({
        sender: sender,
        content: message,
        topic: "LLLL" + roomId + "LLLL",
      });

      stompClient.publish({
        destination: `/app/api/chat.sendToNewTopic`,
        body: chatMessage,
      });
      setMessage(""); // 메시지 입력란을 비웁니다.
    } else {
      console.log("스톰프 클라이언트 없음 또는 연결되지 않음.");
    }
  };

  const showMessage = (message) => {
    setChatMessages((prevMessages) => [...prevMessages, message]);
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    joinChatRoom();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 서버로부터 사용자 정보를 가져오는 HTTP 요청
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/dashboard`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("서버 응답이 실패했습니다");
        }

        console.log("!!!!!!!!!!!!!!!!!!!!");
        const data = await response.json();
        console.log(data.additionalInfo.nickname);
        setSender(data.additionalInfo.nickname);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (  
    <div
      style={{
        borderLeft: "2px solid #33333C",
        width: "100%",
        backgroundColor: "#000", // 배경을 검정색으로 설정
        height: "100vh", // 전체 페이지 높이를 차지하도록 설정
      }}
    >
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        margin: 0,
        backgroundColor: "#000", // 배경을 검정색으로 설정
        paddingTop: isNarrowScreen ? "200px" : "0px", // 조건부로 paddingTop 적용
      }}
    >
        {/* <div
          style={{
            backgroundColor: "#33333C",
            color: "white",
            height: "40px",
            width: "100%",
            position: "fixed",
            top: 50,
            zIndex: 1,
          }}
        >
          <p
            style={{
              marginTop: "10px",
              color: "#fff",
              width: "25%",
              textAlign: "center",
            }}
          >
            채팅
          </p>
        </div> */}
        <div id="chat-container" style={{ height: "100%", display: "flex" }}>
          <div
            id="chat-main"
            style={{
              backgroundColor: "#000", // 메인 채팅창 배경을 검정색으로 설정
              width: "100%",
              height: "100%",

              padding: "10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <input
              type="text"
              id="sender"
              style={{ width: "97%", pointerEvents: "none", display: "none" }}
              placeholder="Yo"
              value={sender}
              readOnly
            />
            <div
              id="chat"
              ref={chatContainerRef}
              className="chat-scroll"
              style={{
                height: "calc(100% - 40px)",
                overflowY: "auto",
                paddingRight: "10px",
              }}
            >
              {chatMessages.map((chatMessage, index) => (
                <div
                  style={{ width: "100%", float: "left", marginTop: "10px" }}
                  className={`message ${
                    false ? "my-message" : "other-message"
                  }`}
                  key={index}
                >
                  <div style={{ float: "left", alignItems: "center" }}>
                    {false && (
                      <div
                        style={{
                          float: "left",
                          width: "8px",
                          height: "15px",
                          backgroundColor: "#4AB3FF",
                          borderRadius: "3px",
                          marginRight: "5px",
                        }}
                      >
                        {" "}
                      </div>
                    )}
                    <span
                      className="sender"
                      style={{
                        color: false ? "#4AB3FF" : "#F7B84B",
                        float: "left",
                        fontSize: "13px",
                        fontWeight: "100",
                      }}
                    >
                      {chatMessage.sender}:
                    </span>
                  </div>

                  <span
                    className="content"
                    style={{
                      color: "#fff",
                      float: "left",
                      marginLeft: "5px",
                      fontSize: "13px",
                      fontWeight: "100",
                      overflowWrap: "break-word",
                    }}
                  >
                    {chatMessage.content}
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                height: "80px",
                // width: "100%",
                position: "fixed",
                bottom: "20px",
                backgroundColor: "#383842",
                padding: "13px",
                paddingBottom: "0px",
                display: "flex",
                borderRadius: "5px",
                marginTop:"auto"
              }}
            >
              <textarea
                style={{
                  resize: "none",
                  height: "50px",
                  color: "#ffffff",
                  width: "100%",
                  border: "none",
                  outline: "none",
                  fontSize: "16px",
                  // marginRight: "3%",
                  backgroundColor: "#383842",
                }}
                type="text"
                id="message"
                placeholder="채팅하기"
                value={message}
                onChange={handleInputChange}
                onKeyUp={(event) => {
                  if (event.key === "Enter") {
                    sendMessage();
                  }
                }}
              />
              <button
                style={{
                  backgroundColor: "#b7891e",
                  color: "white",
                  border: "none",
                  outline: "none",
                  borderRadius: "5px",
                  width: "60px",
                  height: "30px",
                  cursor: "pointer",
                  marginTop: "12px",
                  marginLeft:"auto"
                }}
                onClick={sendMessage}
              >
                <h4 style={{ fontSize: "14px", margin: "0px", color: "white" }}>
                  전송
                </h4>
              </button>
            </div>

            {showButton && (
              <button
                style={{ marginBottom: "300px", height: "300px" }}
                onClick={joinChatRoom}
              >
                connect
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
