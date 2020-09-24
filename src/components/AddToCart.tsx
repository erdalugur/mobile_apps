import React from 'react'
import { Product, CartItem } from 'types';
import { IAction, SingleMultiType, actionTypes } from 'myRedux/types';
import { StyleSheet, ScrollView, TouchableOpacity, ViewStyle } from 'react-native';
import { View, Text, Button, Header, Input, CartButton } from 'components'
import theme from 'theme';
import { messages } from 'utils';
import { Plus, Minus, Plus2, Minus2 } from 'icons';
import { connect } from 'react-redux';
import { AppState } from 'myRedux';

interface Props {
    item: Product
    dispatch: (param: IAction<number | Product>) => void
    cart: {
        [key: string]: CartItem
    }
    style?: ViewStyle
}
function Index(props: Props) {
    let item = props.cart[props.item.ID]
    return (
        <React.Fragment>
            {!item &&
                <TouchableOpacity style={[styles.basket]}
                    onPress={() => {
                        props.dispatch({ type: actionTypes.ADD_TO_CART, payload: props.item })
                    }}>
                    <Text>{messages.ADD_TO_CART}</Text>
                </TouchableOpacity> ||
                <View style={[styles.buttonContainer, props.style]}>
                    <Minus2 size={22} color={theme.colors.text}
                        onPress={() => props.dispatch({ type: actionTypes.DECREMENT, payload: props.item.ID })} />
                    <Text style={{ width: '70%', textAlign: 'center' }}>{item.quantity.toString()}</Text>
                    <Plus2 size={22} color={theme.colors.text}
                        onPress={() => props.dispatch({ type: actionTypes.INCREMENT, payload: props.item.ID })} />
                </View>
            }
        </React.Fragment>
    )
}
const mapState = (state: AppState) => ({
    cart: state.app.cart
})
export const AddToCart = connect(mapState)(Index)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        height: 100,
        backgroundColor: theme.colors.card,
        paddingTop: 40,
        paddingHorizontal: 10,
    },
    headerInputWrapper: {
        backgroundColor: theme.colors.card,
        borderRadius: 5,
        borderColor: theme.colors.border,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        opacity: 0.8,
        width: '85%'
    },
    cartInfo: {
        width: '55%',
        height: '100%',
        paddingLeft: 5,
        justifyContent: 'space-around',
    },
    buttonContainer: {
        borderWidth: 1,
        borderColor: theme.colors.text,
        borderRadius: 10,
        padding: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        opacity: 0.8
    },
    imageContainer: {
        width: '45%',
        height: '100%',
        padding: 5
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        borderRadius: 5
    },
    itemContainer: {
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 100,
        marginBottom: 5
    },
    basket: {
        justifyContent: 'center', alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.text,
        height: 35,
        borderRadius: 10,
        opacity: 0.8
    },
});
