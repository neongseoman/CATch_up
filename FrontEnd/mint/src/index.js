
const video = document.querySelector("video");
const constraints = {video: true, audio:true}
const userNickName = "moonjar";
const email = "moonjar@gmail.com"


window.onload = () => {
    document.getElementById("camera_on_button").addEventListener("click", cameraOn)
}
function cameraOn() {
    navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            const videoTrack = stream.getVideoTracks();
            const audioTrack = stream.getAudioTracks();
            console.log("Your stream is gotten.", constraints)

            stream.onremovetrack = () => {
                console.log("your stream is done");
            }

            video.srcObject = stream;
        }).catch((error) => {
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
    });
}


const regist = ()=> {

}

