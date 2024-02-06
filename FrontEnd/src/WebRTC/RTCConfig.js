export const PCConfig = {
    iceServers:[
        {
            urls:"stun:stun.l.google.com:19302"
        },
        {
            urls:"turn:i10a105.p.ssafy.io:3478",
            username:"username1",
            credential:"password1"
        },
        // {
        //     urls: "turn:i10a105.p.ssafy.io:3478",
        //     username: "test",
        //     credential: "test",
        // },
        // {
        //     urls: "turn:i10a105.p.ssafy.io:3478",
        //     username: "ssafy",
        //     credential: "ssafy",
        // }
    ]
}