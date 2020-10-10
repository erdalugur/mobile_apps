import { Platform } from "react-native";
import { actionTypes, IAction } from "./types";

export interface IUserState {
    token: string | null
    isSignout: boolean
    isWebApp: boolean
    isLoading: boolean
}

const initState: IUserState = {
    token: null,
    isSignout: false,
    isWebApp: false,
    isLoading: true
}

export function userReducer(state: IUserState = initState, action: IAction<IUserState>) {
    switch (action.type) {
        case actionTypes.MAKE_WEB:
            return {
                ...state,
                isSignout: false,
                token: action.payload.token,
                isWebApp: true,
                isLoading: false,
            };
        case actionTypes.SIGN_OUT:
            return {
                ...state,
                isSignout: true,
                token: null,
                isWebApp: Platform.OS === 'web'
            };
        case actionTypes.SIGN_IN:
            return {
                ...state,
                isSignout: false,
                token: action.payload.token,
                isWebApp: Platform.OS === 'web'
            };
        case actionTypes.RESTORE_TOKEN:
            return {
                ...state,
                token: action.payload.token,
                isLoading: false,
                isWebApp: Platform.OS === 'web'
            };
        default:
            return state;
    }
}