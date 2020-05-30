import { IResponse, IProc, ILogin } from './types'
import config from 'config';
import { messages, userManager, configurationManager } from 'utils';
import { FetchAllModel, SetCartRequest } from 'types';
import { getInitialState } from 'myRedux/rootReducer';

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


export const dataManager = {
    loadAll: async function () {
        console.log("dataManager")
        let { data, statusCode, error } = await QueryableIO<IProc>({
            model: 'MPOS_GET_ALL',
            action: 'public',
            parameters: []
        });
        return new Promise<FetchAllModel>((resolve, reject) => {
            if (statusCode === 200 && data && data.length > 0) {
                let __data__ = data[0];
                const { menu } = getInitialState(__data__);
                return resolve({ domain: menu.domain, tree: menu.tree, status: "success" })
            } else if (error) {
                return reject(error);
            }
        })
    },
    setCart: async function (param: SetCartRequest) {
        const user = await userManager.get();
        const config = await configurationManager.get();
        if (user) {
            try {
                return await QueryableIO<IProc>({
                    model: 'MPOS_SET_CART',
                    action: 'public',
                    parameters: [
                        { key: 'TABLEID', value: param.TABLEID },
                        { key: 'STOREID', value: user.STOREID },
                        { key: 'USERID', value: config?.DEFAULT_CLIENT_ID || user.ID },
                        { key: 'JSON', value: JSON.stringify(param.JSON) }
                    ]
                })
            } catch (error) {
                return await errorPromise(error);
            }

        } else {
            return await errorPromise(messages.PLEASE_LOGIN_FIRST)
        }
    },
    login: async function (username: string, password: string, store: string) {
        return await QueryableIO<ILogin>({
            action: 'login',
            keyField: {
                key: 'USERNAME', value: username
            },
            valueField: {
                key: 'PASSWORD', value: password
            },
            model: 'USERS',
            fields: ['ID'],
            filters: [{ key: 'STOREID', value: store, operator: '=' }],
        })
    },
    loadWaiting: async function () {
        let user = await userManager.get();
        if (user != null) {
            return await QueryableIO<IProc>({
                model: 'MPOS_GET_WAITING',
                action: 'public',
                parameters: [{ key: 'STOREID', value: user.STOREID }]
            })
        } else {
            return await errorPromise(messages.PLEASE_LOGIN_FIRST)
        }
    },
    loadTables: async function () {
        let user = await userManager.get();
        if (user) {
            return await QueryableIO<IProc>({
                model: 'MPOS_GET_TABLES',
                action: 'public',
                parameters: [{ key: 'STOREID', value: user.STOREID }]
            })
        } else {
            return await errorPromise(messages.PLEASE_LOGIN_FIRST);
        }
    },
    loadAddion: async function (table: string) {
        let user = await userManager.get();
        if (user) {
            return await QueryableIO<IProc>({
                action: 'public',
                model: 'MPOS_GET_TRANSACTIONS',
                parameters: [{ key: 'TABLEID', value: table }, { key: 'STOREID', value: user.STOREID }]
            })
        } else {
            return await errorPromise(messages.PLEASE_LOGIN_FIRST)
        }
    }
}

async function errorPromise(message: string) {
    return new Promise<IResponse>((resolve, reject) => {
        return resolve({ data: [], statusCode: 400, error: message, })
    })
}