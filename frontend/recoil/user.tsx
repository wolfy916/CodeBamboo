import { atom, selector } from "recoil";

export interface userObject {
  isLoggedIn: boolean;
  email: string;
  image: string;
  introduce: string | null;
  nickname: string;
  provider: string;
  user_id: number;
}

export const userState = atom<userObject>({
  key: "userState", // 선언명과 같지 않아도 됨, 그래도 통일하면 좋을 듯
  default: {
    isLoggedIn: false,
    email: "Panda123@codeBamboo.site",
    image:
      "https://ssl.pstatic.net/static/pwe/address/img_profile.png",
    introduce: "Hello, Bamboos!",
    nickname: "Panda123",
    provider: "kakao",
    user_id: 999,
  },
});

interface loginModal {
  isOpen : boolean;
}

export const loginModalState = atom<loginModal>({
  key: "loginModalState", // 선언명과 같지 않아도 됨, 그래도 통일하면 좋을 듯
  default: {
    isOpen: false,
  },
});

export const toggleLoginModal = selector({
  key: 'toggleLoginModal',
  get: ({ get }) => get(loginModalState),
  set: ({ set }) => {
    set(loginModalState, (prevState) => {
      return { ...prevState, isOpen: !prevState.isOpen };
    });
  },
});