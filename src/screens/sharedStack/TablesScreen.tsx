import React from 'react';
import { StyleSheet, FlatList, RefreshControl, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { Button, Text, View } from 'components'
import { dataManager } from 'api';
import theme from 'theme';
import { messageBox, messages } from 'utils';
import { NavigationProps, CartItem } from 'types';
import { screens } from 'navigation';
import { QRCode, MoreOption } from 'icons';
import { connect } from 'react-redux';
import { AppState } from 'myRedux';
import { SingleMultiType, actionTypes, IAction } from 'myRedux/types';
import { sharedStyles } from 'shared/style';
import { makeCartJsonBeforeSend } from 'utils/cart';
const { height } = Dimensions.get('screen')
type screenOptions = 'Home' | 'Search' | 'Cashier' | 'Kitchen'
interface Props extends NavigationProps<any, any> {
    cart: { [key: string]: CartItem }
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
            let { data, statusCode, error } = await dataManager.loadCart(selected);
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
        let items = this.props.cart
        if (Object.keys(items).length === 0) {
            messageBox(messages.EMPTY_CART_MESSAGE)
        } else {
            let { cart, extras } = makeCartJsonBeforeSend(items)
            let { statusCode, data, error } = await dataManager.setCart({
                TABLEID: this.state.selected,
                JSON: cart,
                EXTRAS: extras,
                FROM_GUEST: false
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
        let { routeScreen = "", cart, navigation } = this.props
        let fromCart = routeScreen === 'Search'
        return true && Object.keys(cart).length > 0 && (
            <Button
                className="primary"
                onPress={this.sendOrder}
                activeOpacity={0.8}
                bold
                style={[sharedStyles.bottomContainer, { borderRadius: 0 }]}
            >
                {messages.SEND_CART}
            </Button>
        )
    }

    render() {
        const { items, filter } = this.state;
        let filteredItems = filter === 'All' ? items : items.filter(x => filter === 'Empty' ? x.GUEST === 0 : x.GUEST !== 0)
        return (
            <SafeAreaView style={styles.container}>
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
                        <Text style={[styles.filterText]}>Dolu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState((state: State) => {
                                return { filter: state.filter === 'Empty' ? 'All' : 'Empty' }
                            })
                        }}
                        style={[styles.action]}
                    >
                        <Text style={[styles.filterText]}>Boş</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.showAddition}
                        style={[styles.action]}
                    >
                        <Text style={[styles.filterText]}>Hesabı Göster</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            onRefresh={this.loadAsync}
                            refreshing={this.state.loading}
                        />
                    }
                    style={{ width: '100%', height: height - 140 }}
                    initialNumToRender={2}
                    numColumns={4}
                    keyExtractor={item => item.ID.toString()}
                    data={filteredItems}
                    renderItem={({ item, index }) => this.renderItem(item, index)}
                />
                {this.renderSendButton()}
            </SafeAreaView>
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
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.border
    },
    filterText: {
        fontWeight: 'bold'
    }
});
