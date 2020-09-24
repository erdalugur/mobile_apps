import React from 'react';
import { StyleSheet, Image, Dimensions, ImageBackground, ActivityIndicator, Modal } from 'react-native';
import { View, Text, Html, CartButton, AddToCartHeart, AddToCart } from 'components'
import { NavigationProps, Product, ProductTreeModel, CartItem, IExtra } from 'types';
import theme from 'theme';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { IAction, actionTypes } from 'myRedux/types';
import { connect } from 'react-redux';
import { messageBox, messages, sizeManager } from 'utils'
import { Back, CartIcon, Plus, Heart, Fire, Time, Pencil, Check, UnCheck, Play, Plus2, Minus2 } from 'icons';
import { screens } from 'navigation';
import { dataManager } from 'api';
import { AppState } from 'myRedux';

interface Props extends NavigationProps<{
    item: Product
}, any> {
    dispatch: (param: IAction<any>) => void
    items: ProductTreeModel[]
    cart: { [key: string]: CartItem }
}
const { height } = Dimensions.get('window')
interface State {
    recommended: Array<Product>
    item: Product | null
    loading: boolean
    extras: Array<IExtra>
    modal: boolean
}

class Index extends React.PureComponent<Props, any> {
    state: State = {
        recommended: [],
        item: null,
        loading: false,
        extras: [],
        modal: false
    }
    componentDidMount = () => {
        this.bootstrapAsync();

    }

    bootstrapAsync = async () => {
        let item = this.props.route.params.item
        await this.loadDetailAsync(item);
    }

    loadDetailAsync = async (item: Product) => {
        this.setState({ loading: true });
        const result = await dataManager.loadProductDetail(item.ID);
        let items = this.props.items
        if (result.statusCode === 200 && result.data) {
            let __data__ = result.data[0]
            let _recommended_ = JSON.parse(__data__.RECOMMENDED) as { RECOMMENDEDID: number }[]
            let extras = (JSON.parse(__data__.EXTRAS) as IExtra[] || []).map(x => {
                x.CHECKED = false;
                x.QUANTITY = 0;
                x.TOTAL_PRICE = x.QUANTITY * x.PRICE
                return x
            })
            let recommended: Array<Product> = []
            if (_recommended_.length > 0) {
                items.forEach(x => {
                    _recommended_.forEach(r => {
                        let item = x.PRODUCTS.find(p => p.ID === r.RECOMMENDEDID)
                        if (item)
                            recommended.push(item)
                    })
                })
            }
            if (item) {
                item.EXTRAS = extras
                item.VIDEO_URL = __data__.VIDEO_URL
            }
            this.setState({ recommended: recommended, extras: extras, loading: false, item: item })
        } else {
            this.setState({ loading: false, item });
        }
    }

    renderHeader = () => {
        const style = sizeManager.isIphoneX() ? { paddingTop: 50 } : {}
        return (
            <View style={[styles.header, style]}>
                <View style={[styles.headerButton]}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Back color={theme.colors.white} size={40} />
                    </TouchableOpacity>
                </View>
                <View style={[styles.headerButton]}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate(screens.cart)}>
                        <CartIcon color={theme.colors.white} size={25} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    renderRecommended = (x: Product) => {
        return (
            <TouchableOpacity onPress={() => {
                this.loadDetailAsync(x)
            }} key={x.ID}>
                <ImageBackground
                    source={{ uri: x.PREVIEW }}
                    style={[styles.recommendedItemImageContainer]}>
                    <View style={[styles.recommendedItemTextContainer]}>
                        <Text style={{
                            fontWeight: 'bold',
                            backgroundColor: '#00000066',
                            width: '100%',
                            height: 25,
                            textAlign: 'center',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }} color={'#fff'}>{x.NAME}</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
    }

    getExtraIndex = (_x_: IExtra) => {
        return this.state.item == null ? -1 : this.state.item.EXTRAS.findIndex(x => x.ID == _x_.ID)
    }

    handleExtra = (x: IExtra, operation: 'plus' | 'minus') => {
        let i = this.getExtraIndex(x);
        let item = this.state.item
        if (i > -1 && item !== null) {
            let extras = item.EXTRAS;
            if (extras) {
                let q = operation === 'plus' ? extras[i].QUANTITY + 1 : extras[i].QUANTITY - 1
                extras[i].QUANTITY = q
                extras[i].TOTAL_PRICE = q * extras[i].PRICE
                item.EXTRAS = extras;
                this.setState({
                    item: { ...item }
                })
            }
        }
    }

    getPrice = () => {
        if (this.state.item) {
            let price = this.state.item?.PRICE || 0;
            this.state.item.EXTRAS.forEach(x => {
                price += x.TOTAL_PRICE
            })
            return price.toFixed(2)
        } else {
            return '0'
        }
    }

    renderExtra = (x: IExtra) => {
        return (
            <View key={x.ID} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 12 }}>{x.NAME}</Text>
                <Text style={{ fontSize: 12 }}>{`${((x.PRICE * x.QUANTITY) || x.PRICE).toFixed(2)} ₺`}</Text>
                {x.QUANTITY !== 0 ? (
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ backgroundColor: theme.colors.border, borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }} onPress={() => this.handleExtra(x, 'plus')}>
                            <Plus2 color={theme.colors.white} size={20} />
                        </TouchableOpacity>
                        <View style={{ backgroundColor: theme.colors.border, justifyContent: 'center', alignItems: 'center', width: 40 }}>
                            <Text>{x.QUANTITY.toString()}</Text>
                        </View>
                        <TouchableOpacity style={{ backgroundColor: theme.colors.border, borderTopRightRadius: 5, borderBottomRightRadius: 5 }} onPress={() => this.handleExtra(x, 'minus')}>
                            <Minus2 color={theme.colors.white} size={20} />
                        </TouchableOpacity>
                    </View>
                ) : (
                        <TouchableOpacity onPress={() => this.handleExtra(x, 'plus')}>
                            <Text>Ekle</Text>
                        </TouchableOpacity>
                    )}
            </View>
        )
    }

    checkCartItem = () => {
        console.log(this.props.cart)
        return this.state.item !== null && this.props.cart[this.state.item.ID] != undefined
    }

    addTocart = () => {
        if (!this.checkCartItem()) {
            this.props.dispatch({ type: actionTypes.ADD_TO_CART, payload: { ...this.state.item } });
            messageBox(messages.ADD_TO_CART_SUCCESS.replace('{0}', this.state.item?.NAME || ''))
        } else {
            this.props.dispatch({ type: actionTypes.DECREMENT, payload: this.state.item?.ID || 0 });
        }
    }

    onNoteChange = (note: string) => {
        this.setState((state: State) => {
            state.item ? state.item.NOTES = note : null
            return {
                item: { ...state.item }
            }
        })
    }

    render() {
        const x = this.state.item
        if (x === null) {
            return (
                <ActivityIndicator />
            )
        }
        return (
            <View style={styles.container}>
                <View style={{
                    flex: 1,
                    maxHeight: (height / 2) - 100,
                    minHeight: (height / 2) - 100
                }}>
                    {this.renderHeader()}
                    <Image source={{ uri: x.PREVIEW }} style={[styles.image]} />
                    <View style={[styles.imageBottomContainer]} transparent>
                        <View style={[styles.imageBottom, { opacity: x.VIDEO_URL ? 1 : 0 }]}>
                            <TouchableOpacity
                                onPress={() => x.VIDEO_URL && this.props.navigation.navigate(screens.videoScreen, { uri: x.VIDEO_URL })}>
                                <Play color={theme.colors.white} size={25} />
                            </TouchableOpacity>
                        </View>
                        <View style={[!this.checkCartItem() ? styles.imageBottom : styles.imageBottom2]}>
                            {this.checkCartItem() ? <AddToCart style={{ borderWidth: 0, width: 100 }} item={this.state.item as Product} /> :
                                <AddToCartHeart item={this.state.item} />}
                        </View>
                    </View>
                </View>
                <View style={{ flex: 2, backgroundColor: theme.colors.card, maxHeight: (height / 3) * 2 }}>
                    <ScrollView>
                        <View transparent style={{
                            paddingTop: 10,
                            paddingHorizontal: 10,
                            zIndex: 9
                        }}>
                            <View style={[styles.valuesContainer]}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Fire color={theme.colors.white} size={20} />
                                    <Text style={{ fontSize: 12 }}>{`Kalori: ${x.CALORI ? x.CALORI : '-'}`}</Text>
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Time color={theme.colors.white} size={22} />
                                    <Text style={{ fontSize: 12 }}>{`Servis Sür: ${x.PREPARATION_TIME ? x.PREPARATION_TIME : '-'}`}</Text>
                                </View>
                                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => this.props.navigation.navigate(screens.noteScreen, {
                                        onNoteChange: (note: string) => this.onNoteChange(note),
                                        note: this.state.item?.NOTES
                                    })}>
                                    <Pencil color={theme.colors.white} size={22} />
                                    <Text style={{ fontSize: 12 }}>{`${this.state.item?.NOTES ? 'Notu Düzenle' : 'Not Ekle'}`}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                padding: 20,
                                borderRadius: 15,
                                maxHeight: height / 4,
                                marginBottom: 10
                            }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text component="h6" style={{ fontWeight: 'bold' }}>{x.NAME}</Text>
                                    <Text style={{ fontWeight: 'bold' }}>{`${x.PRICE.toFixed(2)} ₺`}</Text>
                                </View>
                                <ScrollView>
                                    <Html html={x.DESCRIPTION} />
                                </ScrollView>
                            </View>

                            {this.state.item != null && this.state.item.EXTRAS.length > 0 &&
                                <View style={[styles.extraContainer]}>
                                    <ScrollView>
                                        {this.state.item.EXTRAS.map(e => this.renderExtra(e))}
                                    </ScrollView>
                                </View>
                            }
                        </View>
                        <View style={{
                            backgroundColor: theme.colors.card
                        }}>
                            {this.state.recommended.length > 0 && (<React.Fragment>
                                <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                                    <Text component="h6">Önerilerimiz</Text>
                                </View>
                                {this.state.recommended.length > 0 &&
                                    <ScrollView horizontal>
                                        {this.state.recommended.map(x => this.renderRecommended(x))}
                                    </ScrollView>
                                }
                            </React.Fragment>
                            )}
                        </View>
                    </ScrollView>
                </View>
            </View >
        );
    }


}
const mapState = (state: AppState) => ({
    items: state.app.menu.tree,
    cart: state.app.cart
})
export default connect(mapState)(Index)

const bgColor = '#ffffff4d'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.card
    },
    header: {
        height: 60,
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        position: 'absolute',
        width: '100%',
        zIndex: 9
    },
    heartAdd: {
        bottom: 20,
        right: 10,
        backgroundColor: bgColor,//'#12121226',
        width: 45,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    },
    imageBottomContainer: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row'
    },
    imageBottom: {
        backgroundColor: bgColor,//'#12121226',
        marginHorizontal: 10,
        borderRadius: 10,
        width: 45,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageBottom2: {
        marginHorizontal: 10,
        width: 100,
        //backgroundColor: '#12121226',
        borderRadius: 10
    },
    headerButton: {
        width: 45, borderRadius: 10,
        backgroundColor: bgColor,//'#12121226',
        alignItems: 'center', height: 45, justifyContent: 'center'
    },
    extraContainer: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 15,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxHeight: height / 4
    },
    valuesContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 15,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    recommendedItemImageContainer: {
        height: 100,
        width: 120,
        borderRadius: 10,
        margin: 5,
        backgroundColor: '#12121247',//'#12121226',
        overflow: 'hidden',
    },
    recommendedItemTextContainer: {
        position: 'absolute',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#12121226',
        //paddingBottom: 10
        //opacity: .6
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        zIndex: 9,
        backgroundColor: theme.colors.card
    },
    image: {
        resizeMode: 'cover',
        height: (height / 2) - 100,
        width: '100%',

    }
});
