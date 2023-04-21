import { atom } from 'recoil';

export const refreshState = atom( {
    key: "refreshState",
    default: false
})

export const authenticatedState = atom({
    key: "authenticated",
    default : false
});