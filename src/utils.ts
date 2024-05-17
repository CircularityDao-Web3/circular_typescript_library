import {createHash} from "crypto";
import {CircularApiResponse} from "./types";

export function sha256(input: string): string {
    return createHash('sha256').update(input).digest('hex');
}

export function stringToHex(input: string): string {
    return Buffer.from(input).toString('hex');
}

function padNumber(num: number) {
    return num < 10 ? '0' + num : num;
}

export function timestampForCircular() {
    let date = new Date();
    let year = date.getFullYear();
    let month = padNumber(date.getMonth() + 1);  // Months are 0-based in JavaScript
    let day = padNumber(date.getDate());
    let hours = padNumber(date.getHours());
    let minutes = padNumber(date.getMinutes());
    let seconds = padNumber(date.getSeconds());
    return `${year}:${month}:${day}-${hours}:${minutes}:${seconds}`;
}

function isJsonString(str: string) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export async function handleErrorMessagesOnCircularResponse<T>(response: Response): Promise<T> {
    // @ts-ignore
    const responseString = await response.text()
    return new Promise(async (resolve, reject) => {
        if (isJsonString(responseString)) {
            const checkForError = (await response.json()) as CircularApiResponse<string>
            if (checkForError.Result == 200) {
                // @ts-ignore
                resolve((await  response.json()) as CircularApiResponse<T>)
            } else {
                console.error(checkForError.Response)
                reject(checkForError.Response);
            }
        } else {
            console.error(responseString)
            reject(responseString)
        }
    })
}
