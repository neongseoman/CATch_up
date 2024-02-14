import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();
// 초기 상태 값을 별도의 변수에 저장
export const userInfoInitialState = {
    lat: 37.5012,
    lng: 127.0396,
    isLoggedIn: false,
    userId: null,  // 이메일
    idNo: null,  // 회원 번호
    nickname: 'Guest',  // 닉네임
  };

export const userInfoState = atom({
    key: 'userInfo',
    default: userInfoInitialState,
    effects_UNSTABLE: [persistAtom],
});

export const searchTermState = atom({
    key: 'searchTermState',
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const buskerGeolocation = atom({
    key: "buskerGeoloation",
    default: null,
});
