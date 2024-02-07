const ontrack =() =>{

}
const onicecandidate =() =>{}
const onconnectionstatechange =() =>{}
const oniceconnectionstatechange =() =>{}
const onnegotiationneeded =() =>{}
const onsignalingstatechange =() =>{}

const  handleRemoteStreamAdded = (event) =>{
    console.log("remote stream added");
}
const currentTimestamp = Date.now();
export const koreaTime = new Date(currentTimestamp).toLocaleString('en-US', {
    timeZone: 'Asia/Seoul'
});
