import { AsyncStorage, Alert } from 'react-native'
import { UserModel, CacheResponse, DomainSettingModel } from 'types'
export { messages } from './messages'
export const cacheKeys = {
    user: "user",
    config: 'config'
}

export const cacheService = {
    get: async function <T>(name: string): Promise<T | null> {
        let result = await AsyncStorage.getItem(name);
        return new Promise<T | null>((resolve) => {
            try {
                if (result) {
                    let __result__ = JSON.parse(result) as CacheResponse;
                    if (new Date().getTime() <= __result__.expiryDate) {
                        return resolve(JSON.parse(__result__.value) as T)
                    } else {
                        return resolve(null);
                    }
                }
                else
                    return resolve(null);
            } catch (error) {
                return resolve(null);
            }
        })
    },
    set: async function (name: string, data: any, days?: number) {
        let getTime = function () {
            var date = new Date();
            date.setDate(date.getDate() + (days || 7));
            return date.getTime();
        }
        await AsyncStorage.setItem(name, JSON.stringify({ name: name, value: JSON.stringify(data), expiryDate: getTime() }))
    },
    remove: function (name: string) {
        AsyncStorage.removeItem(name);
    }
}



export const userManager = {
    get: async function () {
        return cacheService.get<UserModel>(cacheKeys.user);
    },
    set: async function (data: UserModel) {
        cacheService.set(cacheKeys.user, data, 7);
    },
    remove: async function () {
        cacheService.remove(cacheKeys.user);
    }
}

export const configurationManager = {
    get: async function () {
        return cacheService.get<DomainSettingModel>(cacheKeys.config)
    },
    set: async function (param: DomainSettingModel) {
        cacheService.set(cacheKeys.config, param);
    },
    remove: function () {
        cacheService.remove(cacheKeys.config);
    }
}

export function messageBox(message: string) {
    return Alert.alert(message);
}