import { AsyncStorage, Alert, Platform, Dimensions } from 'react-native'
import { UserModel, CacheResponse, DomainSettingModel, PlaceModel } from 'types'
import { dataManager } from 'api'
export { messages } from './messages'
import * as Network from 'expo-network';
import moment from 'moment'
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
    },
    isAuthenticated: async function () {
        let result = await userManager.get();
        return result !== null
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

export function confirmBox(message: string, callback: (result: boolean) => void) {
    if (Platform.OS === 'web') {
        let result = confirm(message)
        callback(result)
    } else {
        Alert.alert(
            '',
            message,
            [
                {
                    text: 'Vazgeç',
                    onPress: () => callback(false),
                    style: 'cancel'
                },
                { text: 'Tamam', onPress: () => callback(true) }
            ],
            { cancelable: true }
        );
    }
}

export const applicationManager = {
    user: userManager,
    data: dataManager,
    domain: () => __DEV__ ? 'demo.yenibimenu.com' : window.location.host,
    cache: cacheService,
    clientIP: async () => Network.getIpAddressAsync(),
    config: configurationManager,
    formatDate: (date: string, format: string = 'DD-MM-YYYY') => {
        return moment(date).format(format)
        //return date
    }
}

interface IphoneSize { height: number, width: number }
export const sizeManager = {
    isIphoneX: function () {
        const dim = Dimensions.get('window');
        return (
            // This has to be iOS
            Platform.OS === 'ios' &&

            // Check either, iPhone X or XR
            (sizeManager.isIPhoneXSize(dim) || sizeManager.isIPhoneXrSize(dim))
        );
    },
    isIPhoneXSize: function (size: IphoneSize) {
        return size.height == 812 || size.width == 812;
    },
    isIPhoneXrSize: function (size: IphoneSize) {
        return size.height == 896 || size.width == 896;
    }
}

export const validationManager = {
    checkPhone: function (phone: string) {
        let result = validationManager.makePhone(phone).match(/\d/g)
        return result != null && result.length === 11
    },
    makePhone: function (phone: string) {
        try {
            return phone.replace('(', '').replace(')', '').replace('-', '').replace(' ', '');
        } catch (error) {
            return "0"
        }
    },
    checkDay: function (value: string) {
        let _ = parseInt(value)
        return _ < 32
    },
    checkMonth: function (value: string) {
        let _ = parseInt(value)
        return _ < 13
    },
    checkDate: function (value: string) {
        let dates = value.split('-');
        return value.length == 10 &&
            validationManager.checkDay(dates[0]) &&
            validationManager.checkMonth(dates[1]) &&
            validationManager.checkYear(value)
    },
    checkYear: function (fullDate: string) {
        if (fullDate.length !== 10) return false
        let now = new Date().getFullYear()
        let _ = fullDate.split('-')[2]
        return parseInt(_) < now
    }
}