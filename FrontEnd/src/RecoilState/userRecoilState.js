import { atom } from "recoil";

// 초기 상태 값을 별도의 변수에 저장
export const userInfoInitialState = {
    isLoggedIn: false,
    userId: null,
    idNo: null,
  };

export const userInfoState = atom({
    key:"userInfo",
    default : userInfoInitialState,
});

export const searchTermState = atom({
    key: 'searchTermState',
    default: null,
});