import React from 'react';
import { StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, SafeAreaView, Platform, Linking } from 'react-native';
import { CartItem, NavigationProps, IExtra } from 'types';
import { View, Text, ProductExtra } from 'components'
import { connect } from 'react-redux';
import { AppState } from 'myRedux';
import theme from 'theme';
import { SingleMultiType, IAction, actionTypes } from 'myRedux/types';
import { Plus, Minus, QRCode, Table, EmojiNeutral, Phone, Pencil, Plus2, Minus2 } from 'icons';
import { screens } from 'navigation';
import { messageBox, messages, applicationManager } from 'utils';
import { dataManager } from 'api';

type screenOptions = 'Home' | 'Search' | 'Cashier' | 'Kitchen'

interface Props extends NavigationProps<any, any> {
    cart: { [key: string]: CartItem }
    dispatch: (param: IAction<number | any>) => void
    routeScreen: screenOptions
}

const { height } = Dimensions.get('window')

interface State {
    table: string
    enableActions: boolean
    packageOrder: boolean
    enableQR: boolean
    displayList: number[]
}
class Index extends React.PureComponent<Props, State> {

    state: State = {
        table: '',
        enableActions: false,
        packageOrder: false,
        enableQR: true,
        displayList: []
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
        let items = this.props.cart, price = 0;
        Object.keys(items).forEach(key => {
            price = price + items[key].totalPrice
        })
        return `${price.toFixed(2)} ₺`
    }
    handleExtra = (key: string, extra: IExtra) => {
        if (extra.QUANTITY < 0) return;
        let item = this.props.cart[key]
        item.EXTRAS = { ...item.EXTRAS, [extra.ID]: { ...extra } }
        this.props.dispatch({ type: actionTypes.HANDLE_EXTRA, payload: { ...item } })
    }

    renderExtras = (key: string) => {
        let item = this.props.cart[key]
        if (item.EXTRAS) {
            let items = Object.keys(item.EXTRAS).map(x => item.EXTRAS[x]) || []
            return (
                <View style={[styles.extraContainer]}>
                    <Text style={[styles.extraTitle]}>Esktralar</Text>
                    {items.map((e, i) => (
                        <ProductExtra
                            extra={e}
                            productKey={key}
                            handleExtra={ee => this.handleExtra(key, ee)}
                            key={i}
                        />
                    ))}
                </View>
            )
        } else {
            null
        }
    }

    renderNote = (key: string) => {
        let item = this.props.cart[key]
        return (
            <View style={[styles.extraContainer]}>
                <Text style={[styles.extraTitle]}>Notlar</Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <Text style={{ paddingHorizontal: 5 }}>{item.NOTES}</Text>
                    <TouchableOpacity style={{}} onPress={() => this.props.navigation.navigate(screens.noteScreen, {
                        onNoteChange: (note: string) => {
                            this.props.dispatch({ type: actionTypes.SET_NOTE, payload: { key: key, note: note } })
                        },
                        note: item.NOTES
                    })}>
                        <Pencil color={theme.colors.white} size={20} />
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    RenderItems = () => {
        let { cart } = this.props
        console.log(cart)
        return Object.keys(cart).map(x => (
            <View key={cart[x].ID} style={{ borderBottomColor: theme.colors.border, borderBottomWidth: 1 }}>
                <View style={[styles.itemContainer]}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            this.props.navigation.navigate(screens.product, { item: cart[x] })
                        }}
                        style={[styles.imageContainer]}>
                        <Image source={{ uri: cart[x].PREVIEW }} style={[styles.image]} />
                    </TouchableOpacity>
                    <View style={[styles.cartInfo]}>
                        <Text style={{ textTransform: 'capitalize', fontSize: 20 }}>{cart[x].NAME}</Text>
                        <Text>{`Fiyat → ${cart[x].PRICE.toFixed(2).toString()} ₺`}</Text>
                        {/* {this.renderExtras(x)} */}
                        <Text>{`Toplam Fiyat → ${cart[x].totalPrice.toFixed(2).toString()} ₺`}</Text>
                        <TouchableOpacity onPress={() => {
                            this.setState((state: State) => {
                                let index = state.displayList.indexOf(cart[x].ID)
                                if (index > -1)
                                    state.displayList.splice(index, 1)
                                else
                                    state.displayList.push(cart[x].ID)

                                return {
                                    displayList: [...state.displayList]
                                }
                            })
                        }}>
                            <Text>{`Diğer Bilgileri ${this.state.displayList.indexOf(cart[x].ID) > -1 ? 'Gizle' : 'Göster'}`}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.buttonContainer]}>
                        <Plus color={theme.colors.text}
                            onPress={() => this.props.dispatch({ type: actionTypes.INCREMENT, payload: cart[x].ID })} />
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{cart[x].quantity.toString()}</Text>
                        </View>
                        <Minus color={theme.colors.text}
                            onPress={() => this.props.dispatch({ type: actionTypes.DECREMENT, payload: cart[x].ID })} />
                    </View>
                </View>
                {this.state.displayList.indexOf(cart[x].ID) > -1 && (
                    <View style={{ padding: 10 }}>
                        {this.renderExtras(x)}
                        {this.renderNote(x)}
                    </View>
                )}
            </View>
        ));
    }

    checkCartItems = () => Object.keys(this.props.cart).length > 0

    complete = async () => {
        if (this.state.table === '') {
            messageBox('Lütfen bir masa seçin')
            return;
        }
        let items = this.props.cart
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
                <View style={{
                    maxHeight: height - 110
                }}>
                    <ScrollView>
                        {this.RenderItems()}
                    </ScrollView>
                </View>
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
