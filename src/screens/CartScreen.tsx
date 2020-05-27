import React from 'react';
import { StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { CartItem, NavigationProps } from 'types';
import { View, Text } from 'components'
import { connect } from 'react-redux';
import { AppState } from 'myRedux';
import { ScrollView } from 'react-native-gesture-handler';
import theme from 'theme';
import { SingleMultiType, IAction, actionTypes } from 'myRedux/types';
import { Plus, Minus } from 'icons';
import { screens } from 'navigation';
import { messageBox, messages } from 'utils';
import { dataManager } from 'api';


interface Props extends NavigationProps<any, any> {
    cart: SingleMultiType<any, {
        [key: string]: CartItem;
    }>
    dispatch: (param: IAction<number | any>) => void
}
class Index extends React.PureComponent<Props, any> {

    totalPrice = (): string => {
        let { items } = this.props.cart, price = 0;
        Object.keys(items).forEach(key => {
            price = price + items[key].totalPrice
        })
        return `${price.toFixed(2)} ₺`
    }

    RenderItems = () => {
        let { cart } = this.props
        return Object.keys(cart.items).map(x => (
            <View
                style={[styles.itemContainer]}
                key={cart.items[x].ID}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        this.props.navigation.navigate(screens.product, { item: cart.items[x] })
                    }}
                    style={[styles.imageContainer]}>
                    <Image source={{ uri: cart.items[x].PREVIEW }} style={[styles.image]} />
                </TouchableOpacity>
                <View style={[styles.cartInfo]}>
                    <Text style={{ textTransform: 'capitalize', fontSize: 20 }}>{cart.items[x].NAME}</Text>
                    <Text>{`Fiyat → ${cart.items[x].PRICE.toFixed(2).toString()} ₺`}</Text>
                    <Text>{`Adet → ${cart.items[x].quantity.toString()}`}</Text>
                    <Text>{`Toplam Fiyat → ${cart.items[x].totalPrice.toFixed(2).toString()} ₺`}</Text>
                </View>
                <View style={[styles.buttonContainer]}>
                    <Plus color={theme.colors.text}
                        onPress={() => this.props.dispatch({ type: actionTypes.INCREMENT, payload: cart.items[x].ID })} />
                    <Minus color={theme.colors.text}
                        onPress={() => this.props.dispatch({ type: actionTypes.DECREMENT, payload: cart.items[x].ID })} />
                </View>
            </View>
        ));
    }

    complete = async () => {
        let { items } = this.props.cart
        if (Object.keys(items).length === 0) {
            messageBox(messages.EMPTY_CART_MESSAGE)
        } else {
            let { statusCode, data, error } = await dataManager.setCart({
                TABLEID: '1',
                JSON: Object.keys(items).map(x => {
                    return {
                        PRODUCTID: items[x].ID.toString(),
                        QUANTITY: items[x].quantity.toString()
                    }
                })
            });
            if (statusCode === 200) {
                messageBox(messages.SEND_CART_SUCCESS);
                this.props.dispatch({ type: actionTypes.REMOVE_CART, payload: {} })
            } else if (error) {
                messageBox(error)
            }
        }
    }

    render() {
        return (
            <View full>
                <ScrollView style={{ marginBottom: 70 }}>
                    {this.RenderItems()}
                </ScrollView>
                <View style={[styles.bottomButtonContainer]}>
                    <View style={[styles.bottomButton]}>
                        <Text style={{ marginLeft: 5, fontSize: 10 }}>Toplam Fiyat</Text>
                        <Text style={{ fontSize: 20 }}>
                            {this.totalPrice()}
                        </Text>
                    </View>
                    <View style={{ width: 1, backgroundColor: theme.colors.border, height: 70 }}></View>
                    <TouchableOpacity
                        onPress={this.complete}
                        style={[styles.bottomButton]}>
                        <Text style={{ textAlign: 'center', fontSize: 10 }}>Sipariş</Text>
                        <Text style={{ fontSize: 20 }}>
                            Gönder
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const mapState = (state: AppState) => ({
    cart: state.app.cart
})

export default connect(mapState)(Index)


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
        marginBottom: 5
    },
    bottomButtonContainer: {
        backgroundColor: theme.colors.card,
        position: 'absolute',
        bottom: 0,
        height: 70,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    bottomButton: {
        backgroundColor: theme.colors.card,
        height: 70,
        alignContent: 'center',
        justifyContent: 'center',
    },
});
