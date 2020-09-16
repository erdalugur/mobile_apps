import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Image, RefreshControl, SafeAreaView } from 'react-native';
import { View, Text, Input, CartButton, AddToCart } from 'components'
import { NavigationProps, ProductTreeModel, Product, CartItem, FetchAllModel } from 'types';
import theme from 'theme';
import { Search, Back } from 'icons';
import { connect } from 'react-redux';
import { AppState } from 'myRedux';
import { screens } from 'navigation';
import { IAction, SingleMultiType, actionTypes } from 'myRedux/types';
import { dataManager } from 'api';

interface Props extends NavigationProps<any, any> {
    items: ProductTreeModel[]
    dispatch: (param: IAction<number | Product | FetchAllModel>) => void
    cart: SingleMultiType<any, {
        [key: string]: CartItem;
    }>
}

interface State {
    items: Product[]
    searchTerm: string
    loading: boolean
}

class Index extends React.PureComponent<Props, State> {
    state: State = {
        items: [],
        searchTerm: '',
        loading: false
    }

    componentDidMount = async () => {
        if (this.props.items.length == 0)
            this.loadAsync();
    }

    loadAsync = async () => {
        console.log("fetchAllStart")
        this.setState({ loading: true });
        let result = await dataManager.loadAll();
        this.props.dispatch({ type: actionTypes.FETCH_ALL, payload: result });
        console.log("fetchAllEnd", result.tree.length)
        this.setState({ loading: false });
    }

    renderItems = () => {
        let items: Product[] = [];
        this.props.items.forEach(x => {
            items = items.concat(x.PRODUCTS);
        })
        return items.filter(x => x.NAME.indexOf(this.state.searchTerm) > -1).map(x => (
            <View
                style={[styles.itemContainer]}
                key={x.ID}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        this.props.navigation.navigate(screens.product, { item: x })
                    }}
                    style={[styles.imageContainer]}>
                    <Image source={{ uri: x.PREVIEW }} style={[styles.image]} />
                </TouchableOpacity>
                <View style={[styles.cartInfo]}>
                    <Text style={{ textTransform: 'capitalize', fontSize: 20 }}>{x.NAME}</Text>
                    <Text>{`Fiyat → ${x.PRICE.toFixed(2).toString()} ₺`}</Text>
                    <AddToCart item={x} />
                </View>
            </View>
        ))
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.card }}>
                <View style={[styles.headerContainer]}>
                    <View style={[styles.searchboxWrapper]}>
                        {/* {this.props.navigation.canGoBack() && <Back onPress={() => this.props.navigation.goBack()} />} */}
                        <View style={[styles.headerInputWrapper]}>
                            <Search color={'#ddd'} size={23} />
                            <Input
                                value={this.state.searchTerm}
                                onChangeText={(searchTerm) => this.setState({ searchTerm })}
                                placeholder="Ürün ara..."
                                style={{
                                    width: '100%',
                                }} />
                        </View>
                        <CartButton />
                    </View>
                </View>
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={this.state.loading}
                        onRefresh={this.loadAsync}
                    />
                }>
                    {this.renderItems()}
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const mapState = (state: AppState) => ({
    items: state.app.menu.tree,
    cart: state.app.cart
})
export default connect(mapState)(Index)
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        height: 65,
        backgroundColor: theme.colors.card,
        paddingTop: 10,
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
    searchboxWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.colors.card,
        opacity: 0.9
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
        borderRadius: 2,
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
        borderRadius: 2,
        opacity: 0.8
    },
});
