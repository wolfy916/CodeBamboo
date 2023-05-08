import { atom } from "recoil";

export const  isMainState = atom<boolean>({
  key: "isMainState",
  default: true,
});