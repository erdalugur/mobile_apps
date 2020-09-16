import React from 'react';
import { StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, SafeAreaView, Platform, Linking } from 'react-native';
import { CartItem, NavigationProps } from 'types';
import { View, Text } from 'components'
import { connect } from 'react-redux';
import { AppState } from 'myRedux';
import theme from 'theme';
import { SingleMultiType, IAction, actionTypes } from 'myRedux/types';
import { Plus, Minus, QRCode, Table, EmojiNeutral, Phone } from 'icons';
import { screens } from 'navigation';
import { messageBox, messages, applicationManager } from 'utils';
import { dataManager } from 'api';

type screenOptions = 'Home' | 'Search' | 'Cashier' | 'Kitchen'

interface Props extends NavigationProps<any, any> {
    cart: SingleMultiType<any, {
        [key: string]: CartItem;
    }>
    dispatch: (param: IAction<number | any>) => void
    routeScreen: screenOptions
}

const { height } = Dimensions.get('screen')

interface State {
    table: string
    enableActions: boolean
    packageOrder: boolean
    enableQR: boolean
}
class Index extends React.PureComponent<Props, State> {

    state: State = {
        table: '',
        enableActions: false,
        packageOrder: false,
        enableQR: true
    }

    componentDidMount = async () => {
        this.bootStrapAsync();
    }

    bootStrapAsync = async () => {
        if (Platform.OS === 'web') {
            let place = await applicationManager.config.getPlace();
            let clientIP = await applicationManager.clientIP();
            this.setState({
                enableActions: place !== null && place.LOCAL_IP === clientIP,
                packageOrder: place !== null && place.PACKAGE_ORDER,
                enableQR: place !== null && place.USE_GUEST_COMPLETE
            })
        } else {
            this.setState({ enableActions: true })
        }
    }

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

    checkCartItems = () => Object.keys(this.props.cart.items).length > 0

    complete = async () => {
        if (this.state.table === '') {
            messageBox('Lütfen bir masa seçin')
            return;
        }
        let { items } = this.props.cart
        if (!this.checkCartItems()) {
            messageBox(messages.EMPTY_CART_MESSAGE)
        } else {
            let { statusCode, data, error } = await dataManager.setCart({
                TABLEID: this.state.table,
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

    renderCart = () => {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ marginBottom: 70, height: height - 140 }}>
                    {this.RenderItems()}
                </ScrollView>
                <View style={[styles.bottomButtonContainer]}>
                    <View style={[styles.bottomTotalPrice]}>
                        <Text style={{ marginLeft: 5, fontSize: 10 }}>Toplam Fiyat</Text>
                        <Text style={{ fontSize: 20 }}>
                            {this.totalPrice()}
                        </Text>
                    </View>
                    {this.renderActions()}
                </View>
            </View>
        )
    }

    renderEmpty = () => {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                opacity: 0.8,
            }}>
                <EmojiNeutral color={theme.colors.white} size={60} />
                <Text style={{ marginTop: 20 }}>{messages.EMPTY_CART_MESSAGE}</Text>
            </View>
        )
    }

    callPhone = async () => {
        let place = await applicationManager.config.getPlace();
        if (place) {
            const url = `tel://${place.PHONE}`
            Linking.openURL(url)
        }
    }

    renderActions = () => {
        return (
            <View style={[styles.bottomButton]}>
                {this.state.enableActions ? (<>
                    {this.state.enableQR &&
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate(screens.cartQR, { fromScreen: 'cart' })
                        }}>
                            <QRCode color={theme.colors.white} />
                        </TouchableOpacity>
                    }
                    {this.props.routeScreen !== 'Home' && Platform.OS !== 'web' &&
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate(screens.tables, { fromScreen: 'cart' })
                        }}>
                            <Table color={theme.colors.white} />
                        </TouchableOpacity>
                    }
                </>) : this.state.packageOrder ? (
                    <TouchableOpacity onPress={() => this.callPhone()}>
                        <Phone color={theme.colors.white} />
                    </TouchableOpacity>
                ) : null
                }
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {this.checkCartItems() ? this.renderCart() : this.renderEmpty()}
            </SafeAreaView>
        );
    }
}

const mapState = (state: AppState) => ({
    cart: state.app.cart,
    routeScreen: state.app.screen as screenOptions
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
        marginBottom: 5,
    },
    bottomButtonContainer: {
        backgroundColor: theme.colors.card,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bottomButton: {
        height: 70,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
        backgroundColor: theme.colors.card,
        flexDirection: 'row',
        width: '50%'
    },
    bottomTotalPrice: {
        backgroundColor: theme.colors.border,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        paddingHorizontal: 10,
        //textAlign: 'center'
    },
});
