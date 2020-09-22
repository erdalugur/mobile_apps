import { IAction, IState, actionTypes } from './types'
import { ADD_TO_CART, INCREMENT, DECREMENT, SET_NOTE, HANDLE_EXTRA } from './cart'
export const InitialState: IState = getInitialState({});

export default function (state: IState = InitialState, action: IAction<any>): IState {
    switch (action.type) {
        case actionTypes.FETCH_ALL:
            return { ...state, menu: { ...action.payload } }
        case actionTypes.SET_TOKEN:
            return SET_TOKEN(state, action.payload);
        case actionTypes.ADD_TO_CART:
            return ADD_TO_CART(state, action.payload);
        case actionTypes.INCREMENT:
            return INCREMENT(state, action.payload);
        case actionTypes.DECREMENT:
            return DECREMENT(state, action.payload);
        case actionTypes.REMOVE_CART:
            return { ...state, cart: { items: {}, item: null } };
        case actionTypes.SET_SCREEN:
            console.log(action.payload)
            return { ...state, screen: action.payload }
        case actionTypes.SET_NOTE:
            return SET_NOTE(state, action.payload)
        case actionTypes.HANDLE_EXTRA:
            return HANDLE_EXTRA(state, action.payload)
        default:
            return state
    }
}

function SET_TOKEN(state: IState = InitialState, payload: string) {
    return { ...state, token: payload };
}


export function getInitialState(__data__: any): IState {
    return {
        sliderItems: __data__.SLIDER_ITEMS || [],
        screen: '',
        token: __data__.token || "",
        campaign: {
            item: null,
            items: []
        },
        cart: {
            item: null,
            items: {}
        },
        product: {
            item: null,
            items: []
        },
        category: {
            item: null,
            items: []
        },
        menu: {
            domain: __data__.DOMAIN && JSON.parse(__data__.DOMAIN) || {},
            tree: __data__.JSON && JSON.parse(__data__.JSON) || [],
            status: "fetching"
        }
    }
}