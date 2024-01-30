import { atom } from "recoil";

export const userInfoState = atom({
    key:"userInfo",
    default : {
        userId : "userID",
        userNickName :"moonjar1234"
    }
})