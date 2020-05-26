import { AsyncStorage } from 'react-native'
import { IResponse, ISelect, IMultiCreate, ICreate, IDelete, IUpdate, IScript, ILogin, IFilter, IJoin, IProc, IRegister } from './types'
import config from 'config';
import { userManager } from 'utils';

async function toJSON(e: any) {
    try {
        if (e.status == 200) {
            const result = await e.json();
            return result;
        }
        else if (e.status == 400 || e.status === 406) {
            const result = await e.json();
            const { error } = result;
            return {
                statusCode: e.status,
                data: null,
                statusText: handleError(e.status, typeof (error) === "object" ? error.originalError && error.originalError.info && error.originalError.info.message : (error || ""))
            };
        }
        else {
            return { statusCode: e.status, data: null, statusText: handleError(e.statusCode, e.statusText) };
        }
    } catch (error) {
        throw error;
    }
}

export async function runQuery(params: any, customUrl?: string): Promise<IResponse> {
    try {

        const endpoint = customUrl || config.endpoint;
        const user = await userManager.get();
        const options: RequestInit = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                "authorization": `Bearer ${user != null ? user.token : ""}`
            },
            mode: "cors",
            method: "POST",
            body: JSON.stringify(params)
        };
        const result = await fetch(endpoint, options);
        // console.log(result)
        return await toJSON(result);

    } catch (error) {
        throw error
    }
}


export const statusMessages: { [key: string]: string } = {
    "400": "Bad_Request",
    "404": "Not_Found",
    "403": "Unauthorized",
    "406": "Already_Exists",
    "500": "Internal_Server_Error",
    "200": "Success",
    "EPARAM": "Validatiton_Error"
}

export function handleError(statusCode: string, orginalError: any) {
    let message = statusMessages[statusCode];

    return message ? { message, orginalError } : null;
}

export async function QueryableIO<T>(param: T): Promise<IResponse> {
    return await runQuery(param);
}