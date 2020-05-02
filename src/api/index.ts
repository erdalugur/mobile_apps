import { AsyncStorage } from 'react-native'
import { IResponse, ISelect, IMultiCreate, ICreate, IDelete, IUpdate, IScript, ILogin, IFilter, IJoin, IProc, IRegister } from './types'
import constans from 'expo-constants'
import config from 'config';
interface IConfiguration {
    endpoint: string,
    beforeScript: Function | null,
    credentialsExpiry: number
}
let configuration: IConfiguration = {
    endpoint: "",
    beforeScript: null,
    credentialsExpiry: 7
}


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
        const c = await getCredentials();
        const options: RequestInit = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                "authorization": `Bearer ${typeof (c) === "object" ? c.value : ""}`
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

export function configure({ endpoint, beforeScript, credentialsExpiry = 7 }: IConfiguration) {
    configuration.endpoint = endpoint;
    configuration.beforeScript = beforeScript;
    configuration.credentialsExpiry = credentialsExpiry
}

export async function runSelect({ model, fields, filters, limit, joins, sortby, groupby }: ISelect) {
    return await runQuery({
        action: "select",
        model,
        fields,
        filters,
        limit,
        sortby,
        groupby,
        joins
    })
}



export const status: { [key: string]: number } = {
    success: 200,
    error: 400,
    not_found: 404,
    access_denied: 403
}

export async function runUpdate({ model, row, filters }: IUpdate) {
    return await runQuery({
        action: "update",
        model: model,
        row: row,
        filters: filters
    })
}


export async function runProc(
    {
        model,
        parameters = []
    }: IProc
) {
    return await runQuery({
        action: "procedure",
        model: model,
        parameters: parameters
    })
}

export async function runPublicProc({ model, parameters = [] }: IProc) {
    return await runQuery({
        action: "public",
        model: model,
        parameters: parameters
    })
}

export async function runDelete({ model, filters }: IDelete) {
    return await runQuery({
        action: "delete",
        model: model,
        filters: filters
    })
}

export async function runLogin(
    {
        model,
        keyField,
        valueField,
        fields,
        joins,
        filters,
        relaxMode = true
    }: ILogin
) {
    return await runQuery({
        action: "login",
        model,
        keyField,
        valueField,
        fields,
        joins,
        filters
    }).then(x => {
        if (relaxMode && x.token) { setCredentials(x.token) };
        return x
    })
}
export async function runRegister(params: IRegister) {
    return await runQuery({
        action: "register",
        ...params
    }).then(x => {
        if (params.relaxMode && x.token) { setCredentials(x.token); }
        return x;
    });
}

export async function runMultipleCreate({ model, keys, rows }: IMultiCreate) {
    return await runQuery({
        action: "multipleCreate",
        model,
        keys,
        rows
    })
}

export async function runScript(param: IScript) {
    return await runQuery({
        action: "script",
        ...param
    })
}




export async function getCredentials(): Promise<{ name: string, value: string, expiryDate: number }> {
    let token: string = "token";
    const data = await AsyncStorage.getItem(token);
    return new Promise((resolve, reject) => {
        if (data) {
            try {
                let result = JSON.parse(data);
                if (new Date().getTime() <= result.expiryDate) {
                    return resolve(result)
                } else {
                    return reject({
                        value: "",
                        expiryDate: 0,
                        name: token
                    })
                }
            } catch (error) {
                return reject({
                    value: "",
                    expiryDate: 0,
                    name: token
                })
            }
        } else {
            return reject({
                value: "",
                expiryDate: 0,
                name: token
            })
        }
    })
}


export function setCredentials(data: string, days?: number) {
    var getTime = function () {
        var date = new Date();
        date.setDate(date.getDate() + (days || configuration.credentialsExpiry || 7));
        return date.getTime();
    }
    AsyncStorage.setItem("token", JSON.stringify({ name: "token", value: data, expiryDate: getTime() }))
}


export function clearCredentials() {
    AsyncStorage.removeItem("token");
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