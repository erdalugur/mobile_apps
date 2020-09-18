import React from 'react';
import { StyleSheet, Image, Dimensions, ImageBackground, ActivityIndicator } from 'react-native';
import { View, Text, Html, CartButton } from 'components'
import { NavigationProps, Product, ProductTreeModel } from 'types';
import theme from 'theme';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { IAction, actionTypes } from 'myRedux/types';
import { connect } from 'react-redux';
import { messageBox, messages } from 'utils'
import { Back, CartIcon, Plus, Heart, Fire, Time, Pencil } from 'icons';
import { screens } from 'navigation';
import { dataManager } from 'api';
import { AppState } from 'myRedux';

interface Props extends NavigationProps<{
    item: Product
}, any> {
    dispatch: (param: IAction<any>) => void
    items: ProductTreeModel[]
}
const { height } = Dimensions.get('window')
interface IExtra {
    ID: number
    NAME: string
    PRICE: number
}

interface State {
    recommended: Array<Product>
    item: Product | null
    loading: boolean
    extras: Array<IExtra>
}

class Index extends React.PureComponent<Props, any> {
    state: State = {
        recommended: [],
        item: null,
        loading: false,
        extras: []
    }
    componentDidMount = () => {
        this.bootstrapAsync();

    }

    bootstrapAsync = async () => {
        this.setTitle();
        let item = this.props.route.params.item
        await this.loadDetailAsync(item);
    }

    loadDetailAsync = async (item: Product) => {
        this.setState({ item: item, loading: true });
        const result = await dataManager.loadProductDetail(item.ID);
        let items = this.props.items
        if (result.statusCode === 200 && result.data) {
            let _recommended_ = JSON.parse(result.data[0].RECOMMENDED) as { RECOMMENDEDID: number }[]
            let extras = JSON.parse(result.data[0].EXTRAS)
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
            this.setState({ recommended: recommended, extras: extras, loading: false })
        } else {
            this.setState({ loading: false });
        }
    }

    setTitle = () => {
        // this.props.navigation.setOptions({
        //     title: this.props.route.params.item.NAME
        // })
    }

    renderHeader = () => {
        return (
            <View style={[styles.header]}>
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
                        <Text style={{ fontWeight: 'bold' }} color={'#fff'}>{x.NAME}</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
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
                    {/* <View style={[styles.heartAdd]} transparent>
                        <TouchableOpacity style={{}}>
                            <Heart color={theme.colors.white} />
                        </TouchableOpacity>
                    </View> */}
                </View>
                <View style={{ flex: 2, backgroundColor: theme.colors.card }}>
                    <View transparent style={{
                        flex: 1,
                    }}>
                        <View transparent style={{
                            marginTop: -40,
                            paddingTop: 10,
                            paddingHorizontal: 20,
                        }}>
                            <View style={{
                                padding: 20,
                                borderRadius: 15,
                                maxHeight: height / 4
                            }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text component="h6" style={{ fontWeight: 'bold' }}>{x.NAME}</Text>
                                    <Text>{`${x.PRICE.toFixed(2)} ₺`}</Text>
                                </View>
                                <ScrollView>
                                    <Html html={x.DESCRIPTION} />
                                </ScrollView>
                            </View>
                            <View style={{ paddingHorizontal: 20, paddingVertical: 10, borderRadius: 15, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Fire color={theme.colors.white} size={25} />
                                    <Text>{`Kalori: ${x.CALORI ? x.CALORI : '-'}`}</Text>
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Time color={theme.colors.white} size={25} />
                                    <Text>{`Haz. Süresi: ${x.PREPARATION_TIME ? x.PREPARATION_TIME : '-'}`}</Text>
                                </View>
                                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Pencil color={theme.colors.white} size={25} />
                                    <Text>Not Ekle</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        flex: 1,
                        maxHeight: 200,
                        backgroundColor: theme.colors.card
                    }}>
                        {this.state.recommended.length > 0 && (<React.Fragment>
                            <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                                <Text component="h6">Önerilerimiz</Text>
                            </View>
                            <ScrollView horizontal>
                                {this.state.recommended.map(x => this.renderRecommended(x))}
                            </ScrollView>
                        </React.Fragment>
                        )}
                        <View style={[styles.buttonContainer]}>
                            <View style={[styles.button, { backgroundColor: theme.colors.background }]}>
                                <Text style={{ fontSize: 20 }}>
                                    {`${x.PRICE.toFixed(2)} ₺`}
                                </Text>
                            </View>
                            <View style={[styles.button, { backgroundColor: theme.colors.card }]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.dispatch({ type: actionTypes.ADD_TO_CART, payload: x });
                                        messageBox(messages.ADD_TO_CART_SUCCESS.replace('{0}', x.NAME))
                                    }}>
                                    <Text style={{ fontSize: 20 }}>
                                        {messages.ADD_TO_CART}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {/* <ScrollView style={{ height: '100%' }}>

                        <View style={{
                            flex: 1,
                            backgroundColor: theme.colors.background,
                            //maxHeight: (height / 2)
                        }}>
                            <ScrollView>
                                <Html html={x.DESCRIPTION} />
                            </ScrollView>
                        </View> */}
                    {/* <View style={[styles.buttonContainer]}>
                    <View style={[styles.button, { backgroundColor: theme.colors.background }]}>
                        <Text style={{ fontSize: 20 }}>
                            {`${x.PRICE.toFixed(2)} ₺`}
                        </Text>
                    </View>
                    <View style={[styles.button, { backgroundColor: theme.colors.card }]}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.dispatch({ type: actionTypes.ADD_TO_CART, payload: x });
                                messageBox(messages.ADD_TO_CART_SUCCESS.replace('{0}', x.NAME))
                            }}>
                            <Text style={{ fontSize: 20 }}>
                                {messages.ADD_TO_CART}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </View> 

                    </ScrollView>
            */}
                </View>
            </View >
        );
    }
}
const mapState = (state: AppState) => ({
    items: state.app.menu.tree
})
export default connect(mapState)(Index)
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
        position: 'absolute',
        bottom: 40,
        right: 8,
        backgroundColor: '#12121226',
        width: 50,
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerButton: { width: 50, borderRadius: 15, backgroundColor: '#12121226', alignItems: 'center', height: 45, justifyContent: 'center' },
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
        backgroundColor: 'rgb(18 18 18 / 32%)',
        overflow: 'hidden',
    },
    recommendedItemTextContainer: {
        position: 'absolute',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgb(18 18 18 / 32%)',
        paddingBottom: 10
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
