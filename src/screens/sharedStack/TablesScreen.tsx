import React from 'react';
import { StyleSheet, FlatList, RefreshControl, TouchableOpacity, Dimensions } from 'react-native';
import { Text, View } from 'components'
import { dataManager } from 'api';
import theme from 'theme';
import { messageBox, messages } from 'utils';
import { NavigationProps, CartItem } from 'types';
import { screens } from 'navigation';
import { QRCode, MoreOption } from 'icons';
import { connect } from 'react-redux';
import { AppState } from 'myRedux';
import { SingleMultiType, actionTypes, IAction } from 'myRedux/types';
const { height } = Dimensions.get('screen')
type screenOptions = 'Home' | 'Search' | 'Cashier' | 'Kitchen'
interface Props extends NavigationProps<any, any> {
    cart: SingleMultiType<any, {
        [key: string]: CartItem;
    }>
    dispatch: (param: IAction<any>) => void
    routeScreen: screenOptions
}


interface ItemModel {
    GUEST: number
    NAME: string
    ID: string
}
interface State {
    items: Array<ItemModel>
    loading: boolean
    error: string
    selected: string
    filter: string
}
class Index extends React.PureComponent<Props, State>{
    state: State = {
        items: [],
        loading: false,
        error: '',
        selected: '',
        filter: 'All'
    }

    componentDidMount = async () => {
        this.loadAsync();
        this.props.navigation.setOptions({
            headerRight: () => <View style={{
                marginRight: 20,
                backgroundColor: theme.colors.card
            }}>
                <MoreOption onPress={() => messageBox('Modal açılacak')} color={theme.colors.text} />
            </View>,
            headerLeft: () => <View style={{
                marginLeft: 20
            }}>
                <QRCode onPress={() => this.props.navigation.navigate(screens.tableQR, { fromScreen: '' })} color={theme.colors.text} />
            </View>
        })
    }

    loadAsync = async () => {
        let { data, statusCode, error } = await dataManager.loadTables();
        if (statusCode === 200 && Array.isArray(data)) {
            this.setState({
                items: data,
                loading: false
            })
        } else {
            this.setState({ error: error, loading: false })
        }
    }

    showAddition = async () => {
        const { selected } = this.state
        if (selected === '') {
            messageBox('Masa seçiniz');
            return;
        } else {
            // masa ıd ye göre adisyonu çek
            let { data, statusCode, error } = await dataManager.loadAddion(selected);
            if (statusCode === 200 && Array.isArray(data) && data.length > 0) {
                this.props.navigation.navigate(screens.addition, { items: data, table: selected });
            } else if (statusCode === 200 && Array.isArray(data) && data.length === 0) {
                messageBox('Adisyon kaydı bulunamadı');
                return
            }
            else {
                messageBox(error);
            }
        }
    }

    renderItem = (item: ItemModel, index: number) => {
        let isSelected = this.state.selected === item.ID
        return (
            <View style={{
                width: '25%',
                height: 50,
                padding: 5
            }}>
                <TouchableOpacity
                    onPress={() => {
                        this.setState((state: State) => {
                            return { selected: isSelected ? '' : item.ID }
                        })
                    }}
                    style={[styles.button, {
                        backgroundColor: isSelected ? theme.colors.primary : (item.GUEST > 0 ? theme.colors.text : theme.colors.border)
                    }]}>
                    <Text color={
                        isSelected ? theme.colors.text : (item.GUEST > 0 ? theme.colors.card : theme.colors.text)
                    }>{item.NAME}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    sendOrder = async () => {
        if (this.state.selected === '') {
            messageBox('Lütfen bir masa seçin')
            return;
        }
        let { items } = this.props.cart
        if (Object.keys(items).length === 0) {
            messageBox(messages.EMPTY_CART_MESSAGE)
        } else {
            let { statusCode, data, error } = await dataManager.setCart({
                TABLEID: this.state.selected,
                JSON: Object.keys(items).map(x => {
                    return {
                        PRODUCTID: x,
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

    renderSendButton = () => {
        const { routeScreen, cart, navigation } = this.props
        let fromCart = routeScreen === 'Search'
        return fromCart && Object.keys(cart.items).length > 0 && <TouchableOpacity
            onPress={this.sendOrder}
            activeOpacity={0.8} style={[styles.sendOrder]}>
            <Text>{messages.SEND_CART}</Text>
        </TouchableOpacity>
    }

    render() {
        const { items, filter } = this.state;
        let filteredItems = filter === 'All' ? items : items.filter(x => filter === 'Empty' ? x.GUEST === 0 : x.GUEST !== 0)
        return (
            <View style={styles.container}>
                <View style={{
                    height: 45,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginBottom: 5,
                    backgroundColor: theme.colors.card
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState((state: State) => {
                                return { filter: state.filter === 'Full' ? 'All' : 'Full' }
                            })
                        }}
                        style={[styles.action]}
                    >
                        <Text>Dolu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState((state: State) => {
                                return { filter: state.filter === 'Empty' ? 'All' : 'Empty' }
                            })
                        }}
                        style={[styles.action]}
                    >
                        <Text>Boş</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.showAddition}
                        style={[styles.action]}
                    >
                        <Text>Hesabı Göster</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            onRefresh={this.loadAsync}
                            refreshing={this.state.loading}
                        />
                    }
                    style={{ width: '100%', height: height - 70 }}
                    initialNumToRender={2}
                    numColumns={4}
                    keyExtractor={item => item.ID.toString()}
                    data={filteredItems}
                    renderItem={({ item, index }) => this.renderItem(item, index)}
                />
                {this.renderSendButton()}
            </View>
        );
    }
}
const mapState = (state: AppState) => ({
    cart: state.app.cart,
    routeScreen: state.app.screen as screenOptions
})

export default connect(mapState)(Index);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        width: '100%',
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
        borderRadius: 5
    },
    action: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.border,
        paddingHorizontal: 10,
        width: '33%',
        borderRadius: 2,
    },
    sendOrder: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.border
    }
});
