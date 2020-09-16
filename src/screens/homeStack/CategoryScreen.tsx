import React from 'react';
import { StyleSheet, FlatList, Image, TouchableOpacity, ImageBackground, Dimensions, ViewBase } from 'react-native';
import { View, Text, AddToCart, CartButton } from 'components'
import { connect } from 'react-redux';
import { NavigationProps, Product, ProductTreeModel } from 'types';
import theme from 'theme';
import { screens } from 'navigation';
import { IAction } from 'myRedux/types';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { MoreOption } from 'icons';
import { messageBox, applicationManager } from 'utils';

const { height } = Dimensions.get('screen')
interface Props extends NavigationProps<{
    title: string
    items: Product[]
    all: Array<ProductTreeModel>
}, any> {
    dispatch: (param: IAction<any>) => void
}
interface State {
    items: Array<Product>,
    drawerOpen: boolean
    themeNo: string
}

class Index extends React.PureComponent<Props, State> {
    state: State = {
        items: [],
        drawerOpen: false,
        themeNo: '1'
    }
    componentDidMount = () => {
        this.bootstrapAsync();
    }
    bootstrapAsync = async () => {
        const place = await applicationManager.config.getPlace();
        let themeNo = place !== null && place.CATEGORY_THEME_N0.toString() || '2'

        this.setState({
            items: this.props.route.params.items,
            themeNo: themeNo
        })
        this.props.navigation.setOptions({
            title: this.props.route.params.title || 'Ürünler',
            headerRight: ({ tintColor }: any) => (
                <View style={{ width: '100%', justifyContent: 'space-around', flexDirection: 'row', backgroundColor: theme.colors.card }}>
                    <CartButton />
                    {themeNo === '2' &&
                        <TouchableOpacity onPress={() => this.setState((state: State) => ({ drawerOpen: !state.drawerOpen }))}>
                            <MoreOption color={theme.colors.white} />
                        </TouchableOpacity>
                    }
                </View>
            )
        })

    }

    renderCategoryItem = (x: ProductTreeModel) => {
        return (
            <TouchableOpacity onPress={() => {
                this.setProductsAndTitle(x.PRODUCTS, x.NAME)
            }} key={x.ID}>
                <ImageBackground
                    source={{ uri: x.PREVIEW }}
                    style={[styles.categoryItemImageContainer]}>
                    <View style={[styles.categoryItemTextContainer]}>
                        <Text style={{ fontWeight: 'bold' }} color={'#fff'}>{x.NAME}</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
    }

    renderProductItem = (item: Product) => {
        return (
            <View
                style={[styles.itemContainer]}
                key={item.ID}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        this.props.navigation.navigate(screens.product, { item: item })
                    }}
                    style={[styles.imageContainer]}>
                    <Image source={{ uri: item.PREVIEW }} style={[styles.image]} />
                </TouchableOpacity>
                <View style={[styles.productItemTextContainer]}>
                    <View style={[styles.productInfoContainer]}>
                        <Text style={{ textTransform: 'capitalize', fontSize: 20 }}>{item.NAME}</Text>
                        <Text>{`Fiyat → ${item.PRICE.toFixed(2).toString()} ₺`}</Text>
                    </View>
                    <View style={[styles.buttonContainer]}>
                        <AddToCart item={item} />
                    </View>
                </View>
            </View>
        )
    }

    setProductsAndTitle = (items: Product[], title: string) => {
        this.setState({ items: items, drawerOpen: false })
        this.props.navigation.setOptions({
            title: title
        })
    }

    renderDrawer = () => {
        return (
            <View style={{
                position: 'absolute',
                flex: 1,
                width: '80%',
                height: '100%',
                top: 0,
                right: 0,
                zIndex: 99,
                backgroundColor: theme.colors.background
            }}>
                <ScrollView style={{ height: height - 100 }}>
                    {this.props.route.params.all.map(x => (
                        <TouchableOpacity
                            style={{
                                height: 50,
                                paddingHorizontal: 10,
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                borderColor: theme.colors.border,
                                borderBottomWidth: 1
                            }}
                            key={x.ID} onPress={() => {
                                this.setProductsAndTitle(x.PRODUCTS, x.NAME)
                            }}>
                            <Text>{x.NAME}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        )
    }

    renderCategories = () => {
        return (
            <View style={{
                height: 80
            }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {this.props.route.params.all.map(x => this.renderCategoryItem(x))}
                </ScrollView>
            </View>
        )
    }

    render() {
        let { items } = this.state
        let style = this.state.themeNo === '1' ? { height: height - 130 } : { flex: 1, }
        return (
            <View style={{ flex: 1 }}>
                {this.state.drawerOpen && this.renderDrawer()}
                {this.state.themeNo === '1' && this.renderCategories()}
                <View style={{
                    ...style
                }}>
                    <ScrollView>
                        {items.map(x => this.renderProductItem(x))}
                    </ScrollView>
                </View>
            </View>
        )
    }
}

export default connect()(Index);
const styles = StyleSheet.create({
    container: {
    },
    categoryItemImageContainer: {
        height: 70,
        width: 120,
        borderRadius: 10,
        margin: 5,
        backgroundColor: '#2a2a2f',
        overflow: 'hidden',
    },
    categoryItemTextContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#2a2a2f',
        opacity: .6
    },
    itemContainer: {
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 120,
        marginBottom: 5,
    },
    productItemTextContainer: {
        width: '55%',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-around'
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
    cartInfo: {
        width: '45%',
        height: '100%',
        paddingLeft: 5,
        justifyContent: 'space-around'
    },
    buttonContainer: {
        opacity: 0.8
    },
    productInfoContainer: { width: '100%', height: 65, justifyContent: 'space-around' }
});
