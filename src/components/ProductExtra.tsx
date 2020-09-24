import React from 'react'
import { Product, CartItem, IExtra } from 'types';
import { IAction, SingleMultiType, actionTypes } from 'myRedux/types';
import { StyleSheet, ScrollView, TouchableOpacity, ViewStyle } from 'react-native';
import { View, Text, Button, Header, Input, CartButton } from 'components'
import theme from 'theme';
import { messages } from 'utils';
import { Plus, Minus, Plus2, Minus2 } from 'icons';
import { connect } from 'react-redux';
import { AppState } from 'myRedux';

interface Props {
    productKey: string
    extra: IExtra
    dispatch: (param: IAction<number | Product>) => void
    cart: {
        [key: string]: CartItem
    }
    style?: ViewStyle
    handleExtra?: (extra: IExtra) => void
}
function Index(props: Props) {
    let item = props.cart[props.productKey]
    let getExtra = () => {
        if (item) {
            return { ...item.EXTRAS[parseInt(props.extra.ID.toString())] }
        } else {
            return { ...props.extra }
        }
    }
    let e = getExtra();

    let handleExtra = (extra: IExtra) => {
        if (extra.QUANTITY < 0) return;

        if (props.handleExtra) {
            props.handleExtra(extra)
            return
        }
        let item = props.cart[props.productKey]
        item.EXTRAS = { ...item.EXTRAS, [extra.ID]: { ...extra } }
        props.dispatch({ type: actionTypes.HANDLE_EXTRA, payload: { ...item } })
    }

    let getPrice = () => {
        let price = e.TOTAL_PRICE > 0 ? e.TOTAL_PRICE : e.PRICE
        return price > 0 ? `${price.toFixed(2)} ₺` : 'İkram'
    }

    return (
        <View style={{
            paddingHorizontal: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 35
        }}>
            <Text style={{ width: '55%' }}>{e.NAME}</Text>
            <Text style={{ width: '25%' }}>{`→ ${getPrice()}`}</Text>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 5, backgroundColor: theme.colors.border,
                width: '20%',
                maxWidth: 100
            }}>
                <TouchableOpacity style={[styles.extraButton]} onPress={() => {
                    if (e.QUANTITY > 0) {
                        e.QUANTITY -= 1
                        e.TOTAL_PRICE = e.QUANTITY * e.PRICE
                        handleExtra(e)
                    }
                }}>
                    <Minus2 size={25} color={theme.colors.white} />
                </TouchableOpacity>
                <Text style={{ width: 20, textAlign: 'center' }}>{(e.QUANTITY || 0).toString()}</Text>
                <TouchableOpacity style={[styles.extraButton]} onPress={() => {
                    e.QUANTITY += 1
                    e.TOTAL_PRICE = e.QUANTITY * e.PRICE
                    handleExtra(e)
                }}>
                    <Plus2 size={20} color={theme.colors.white} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
const mapState = (state: AppState) => ({
    cart: state.app.cart
})
export const ProductExtra = connect(mapState)(Index)


const styles = StyleSheet.create({
    cartInfo: {
        width: '45%',
        height: '100%',
        paddingLeft: 5,
        justifyContent: 'space-around'
    },
    buttonContainer: {
        width: '10%',
        height: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
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
        height: 120,
        marginBottom: 5,
    },
    bottomButtonContainer: {
        backgroundColor: theme.colors.card,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bottomButton: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
        backgroundColor: theme.colors.card,
        flexDirection: 'row',
        width: '50%'
    },
    bottomTotalPrice: {
        backgroundColor: theme.colors.border,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        paddingHorizontal: 10,
        //textAlign: 'center'
    },
    extraTitle: { backgroundColor: theme.colors.border, paddingHorizontal: 5 },
    extraContainer: { marginBottom: 10, borderWidth: 1, borderColor: theme.colors.border },
    extraButton: {
        width: 25,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
