import { atom } from 'recoil';

export const authenticatedState = atom({
    key: "authenticated",
    default : false
});