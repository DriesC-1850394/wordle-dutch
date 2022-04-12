import { Cookies } from "react-cookie";
import Time from "../Classes/Time";

const cookies = new Cookies()

export function setCookies(id: string, value: any, endOfDay: boolean) {
    let timeLeft: { hour: number, minutes: number, seconds: number } = new Time().timeleft()
    let secondsLeft: number = timeLeft.hour * 3600 + timeLeft.minutes * 60 + timeLeft.seconds

    let maxAge: number | undefined = endOfDay ? secondsLeft : undefined

    cookies.set(id, value, {
        maxAge: maxAge
    })
}


export function getCookies(id: string): any | undefined {
    return cookies.get(id)
}