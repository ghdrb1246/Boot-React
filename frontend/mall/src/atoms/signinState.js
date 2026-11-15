import { atom } from "jotai";
import { getCookie } from "../util/cookieUtil";

export const initState = {
    email: '',
    nickname: '',
    social: false,
    accessToken: '',
    refreshToken: ''
}

const loadMemberCookie = () => {
    const memberInfo = getCookie("member")

    if (memberInfo && memberInfo.nickname) {
        memberInfo.nickname = decodeURIComponent(memberInfo.nickname)
    }

    return memberInfo
}

const signinState = atom(loadMemberCookie() || initState)

export default signinState