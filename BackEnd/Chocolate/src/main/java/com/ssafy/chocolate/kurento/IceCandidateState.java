package com.ssafy.chocolate.kurento;


import org.springframework.stereotype.Component;

@Component
public enum IceCandidateState {
    DISCONNECTED, //: No activity scheduled
    GATHERING, //: Gathering local candidates
    CONNECTING, //: Establishing connectivity
    CONNECTED, //: At least one working candidate pair
    READY, //: ICE concluded, candidate pair selection is now final
    FAILED;
     //: Connectivity checks have been completed, but media connection was not established



    @Override
    public String toString() {
        return super.toString();
    }
}
