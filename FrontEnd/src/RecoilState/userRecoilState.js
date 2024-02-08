import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();
// 초기 상태 값을 별도의 변수에 저장
export const userInfoInitialState = {
    isLoggedIn: false,
    userId: null,
    idNo: null,
    nickname: null,
  };

export const userInfoState = atom({
    key:"userInfo",
    default : userInfoInitialState,
    effects_UNSTABLE: [persistAtom],
});

export const searchTermState = atom({
    key: 'searchTermState',
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const buskerGeolocation = atom({
    key: "buskerGeoloation",
    default:null,
})