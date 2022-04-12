import { Cookies } from "react-cookie";
import Time from "../Classes/Time";

const cookies = new Cookies()

/**
 * Sets a coockie with a given id and value. If activated, the cookie resets at the end of the day.
 *
 * @param {string} id - The cookies identifier
 * @param {any} value - The value that must be set in the cookie
 * @param {boolean} endOfDay - If set, the cookie resets at the end of the day.
 *
 */
export function setCookies(id: string, value: any, endOfDay: boolean): void {
    let timeLeft: { hour: number, minutes: number, seconds: number } = new Time().timeleft()
    let secondsLeft: number = timeLeft.hour * 3600 + timeLeft.minutes * 60 + timeLeft.seconds

    let maxAge: number | undefined = endOfDay ? secondsLeft : undefined

    cookies.set(id, value, {
        maxAge: maxAge
    })
}

/**
 *  Returns the data in a cookie
 *
 * @param {string} id - The cookies identifier
 * 
 * 
 * @returns The data if a cookie is set, else undefined
 */
export function getCookies(id: string): any | undefined {
    return cookies.get(id)
}