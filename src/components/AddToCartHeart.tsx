import React from 'react'
import { Product, CartItem } from 'types';
import { IAction, SingleMultiType, actionTypes } from 'myRedux/types';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { View, Text, Button, Header, Input, CartButton } from 'components'
import theme from 'theme';
import { messages } from 'utils';
import { Plus, Minus, Heart, HeartFull } from 'icons';
import { connect } from 'react-redux';
import { AppState } from 'myRedux';

interface Props {
    item: Product | null
    dispatch: (param: IAction<number | Product>) => void
    cart: SingleMultiType<any, {
        [key: string]: CartItem;
    }>
}
function Index(props: Props) {
    let item = props.cart.items[props.item && props.item.ID || -1]
    let color = item ? 'red' : theme.colors.white

    let addTocart = () => {
        if (props.item) {
            if (!item) {
                props.dispatch({ type: actionTypes.ADD_TO_CART, payload: props.item })
            } else {
                props.dispatch({ type: actionTypes.DECREMENT, payload: props.item.ID })
            }
        }
    }
    return (
        <TouchableOpacity onPress={() => addTocart()}>
            {item ? <HeartFull color={color} size={25} /> : <Heart color={color} size={25} />}
        </TouchableOpacity>
    )
}
const mapState = (state: AppState) => ({
    cart: state.app.cart
})
export const AddToCartHeart = connect(mapState)(Index)

