import { AsyncStorage, Alert, Platform, processColor } from 'react-native'
import { UserModel, CacheResponse, DomainSettingModel, PlaceModel } from 'types'
import { dataManager } from 'api'
export { messages } from './messages'
import * as Network from 'expo-network';

export const cacheKeys = {
    user: "user",
    config: 'config',
    store: 'store'
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
    remove: async function (name: string) {
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
        return AsyncStorage.removeItem(cacheKeys.user);
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
    },
    getPlace: async function () {
        return cacheService.get<PlaceModel>(cacheKeys.store)
    },
    setPlace: async function (param: PlaceModel) {
        return cacheService.set(cacheKeys.store, param);
    },
    removePlace: async function () {
        return cacheService.remove(cacheKeys.store);
    }
}

export function messageBox(message: string) {
    if (Platform.OS === 'web') {
        alert(message)
    }
    return Alert.alert(message);
}

export const applicationManager = {
    user: userManager,
    data: dataManager,
    domain: () => __DEV__ ? 'http://localhost:19006' : window.location.origin,
    cache: cacheService,
    clientIP: async () => Network.getIpAddressAsync(),
    config: configurationManager
}