import { IAction, IState, actionTypes } from './types'
import { ADD_TO_CART, INCREMENT, DECREMENT, SET_NOTE, HANDLE_EXTRA } from './cart'
import { ProductTreeModel } from 'types';
import { Platform } from 'react-native';
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
            return { ...state, cart: {} };
        case actionTypes.SET_SCREEN:
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

function flattenExtras(data: any) {
    let response = {} as any
    data.forEach((e: any) => {
        e.QUANTITY = 0;
        e.TOTAL_PRICE = 0;
        e.CHECKED = false;
        response[e.ID] = e
    })
    return response
}
function flattenProducts(data: any) {
    let items = (data.JSON && JSON.parse(data.JSON) || []) as any[]
    items = items.map(x => {
        x.PRODUCTS.map((p: any) => {
            p.EXTRAS = flattenExtras(p.EXTRAS)
            return p
        });
        return x;
    })
    return items;
}

export function getInitialState(__data__: any): IState {
    return {
        sliderItems: __data__.SLIDER_ITEMS || [],
        screen: '',
        token: null,
        campaign: {
            item: null,
            items: []
        },
        cart: {},
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
            tree: flattenProducts(__data__),
            status: "fetching"
        }
    }
}

