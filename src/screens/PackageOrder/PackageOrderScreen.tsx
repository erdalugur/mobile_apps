import React from 'react';
import { StyleSheet, ScrollView, Picker, TouchableOpacity, SafeAreaView, Dimensions, Linking } from 'react-native';
import { Text, View, Button, ProductExtra } from 'components'
import { NavigationProps, TransactionExtra, TransactionStatusText } from 'types';
import theme from 'theme';
import { dataManager } from 'api';
import { applicationManager, messageBox, messages } from 'utils';
import { screens } from 'navigation';
import { MoreOption, Pencil, Phone } from 'icons';

const { height } = Dimensions.get('screen')

interface Transactions {
    TRANSACTIONID: string
    PRODUCTID: number
    LAST_PRICE: number
}
export interface PackageOrderItem {
    TOTAL_PRICE: number,
    FULL_NAME: string,
    SESSIONID: string,
    ADDRESS: string
    USERNAME: string
    PHONE: string
    TRANSACTIONS: Array<Transactions>
}

interface Props extends NavigationProps<{
    items: any[],
    table: string
}, any> {

}
export interface SelectedItem {
    PRODUCTID: number
    PRICE: number
}
interface State {
    selectedPayment: string
    table: string,
    selectedItems: Array<string>
    items: PackageOrderItem[]
    displayList: string[]
}


export default class extends React.PureComponent<Props, State> {
    state: State = {
        selectedPayment: '',
        table: '',
        selectedItems: [],
        items: [],
        displayList: []
    }
    componentDidMount = () => {
        this.setup();
    }

    handleOptions = () => {
        if (this.state.selectedItems.length === 0) {
            messageBox('En az bir kayıt seçin')
            return;
        }
        this.props.navigation.navigate(screens.tableOptionScreen, {
            item: this.state.table,
            items: this.getProducts()
        })
    }

    getProducts = () => {
        if (this.state.selectedItems.length === 0)
            return []

        let sitem = this.state.selectedItems[0];
        let item = this.state.items.find(x => sitem === x.SESSIONID)
        if (item !== undefined) {
            return item.TRANSACTIONS.map(x => {
                return x.TRANSACTIONID
            })
        } else {
            return []
        }
    }

    setup = async () => {
        this.props.navigation.setOptions({
            headerRight: () => (
                <View style={{
                    marginRight: 20,
                    backgroundColor: theme.colors.card
                }}>
                    <MoreOption onPress={this.handleOptions} color={theme.colors.text} />
                </View>
            )
        })

        let { data, statusCode, error } = await dataManager.loadPackageOrder()
        if (statusCode === 200 && data) {
            this.setState({
                table: "0",
                items: data.map(x => {
                    x.TRANSACTIONS = JSON.parse(x.TRANSACTIONS)
                    return x
                })
            })
        }
    }

    sessionId = () => {
        return this.state.items[0].SESSIONID
    }

    close = async () => {
        let { table, items, selectedItems } = this.state
        if (items.length === 0) return;
        const { price, sendingItems } = this.sendingData();

        this.props.navigation.navigate(screens.payment, {
            table: table,
            price: price.toString(),
            items: sendingItems,
            sessionId: this.sessionId(),
            operation: 'closeSession'
        })
    }

    sendingData = () => {
        let { selectedItems, table, items } = this.state
        let item = items.filter(x => selectedItems.indexOf(x.SESSIONID) > -1)[0]
        let price = 0;
        if (item != null) {
            let sendingItems: SelectedItem[] = item.TRANSACTIONS.map(x => {
                price += x.LAST_PRICE
                return {
                    PRICE: x.LAST_PRICE,
                    PRODUCTID: x.PRODUCTID
                } as SelectedItem
            })
            return { sendingItems, price };
        } else {
            return { sendingItems: [], price: 0 }
        }
    }

    addPayment = async () => {
        let { selectedItems, table, items } = this.state
        if (selectedItems.length === 0) {
            messageBox('Lütfen ödemesini alacağınız en az bir kayıt seçin');
            return;
        }
        const { price, sendingItems } = this.sendingData();

        this.props.navigation.navigate(screens.payment, {
            table: table,
            price: price.toString(),
            items: sendingItems,
            sessionId: this.sessionId(),
            operation: 'addPayment'
        })
    }

    callPhone = async (x: PackageOrderItem) => {
        if (x.PHONE) {
            const url = `tel://${x.PHONE}`
            Linking.openURL(url)
        }
    }

    render() {
        let { items } = this.state
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ height: 50, flexDirection: 'row' }}>
                    <View style={{ width: '50%', paddingRight: 1 }}>
                        <Button
                            onPress={this.addPayment}
                            className="default"
                            bold>
                            Ödeme Al
                        </Button>
                    </View>
                    <View style={{ width: '50%', paddingLeft: 1, }}>
                        <Button
                            onPress={this.close}
                            className="default" bold>
                            Kapat
                        </Button>
                    </View>
                </View>
                <ScrollView style={{ height: height - 140 }}>
                    {items.map(x => (
                        <View key={x.SESSIONID} style={[styles.itemContainer, {
                            borderLeftWidth: this.state.selectedItems.indexOf(x.SESSIONID) > -1 ? 4 : 0,
                            borderLeftColor: this.state.selectedItems.indexOf(x.SESSIONID) > -1 ? theme.colors.text : theme.colors.card
                        }]}>
                            <TouchableOpacity
                                style={[styles.button]}
                                onPress={() => {
                                    this.setState((state: State) => {
                                        let index = state.selectedItems.indexOf(x.SESSIONID);
                                        if (index > -1) {
                                            state.selectedItems.splice(index, 1);
                                        } else {
                                            state.selectedItems = [x.SESSIONID]
                                        }
                                        return { selectedItems: [...state.selectedItems] }
                                    })
                                }}>

                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
                                    <View style={{ width: '35%' }}>
                                        <Text style={[styles.text]}>{`Tutar`}</Text>
                                        <Text style={[styles.text]}>{`Müşteri`}</Text>
                                        <Text style={[styles.text]}>{`Telefon`}</Text>
                                        <Text style={[styles.text]}>{`Adres`}</Text>
                                    </View>
                                    <View style={{ width: '10%' }}>
                                        <Text style={[styles.text]}>{`→`}</Text>
                                        <Text style={[styles.text]}>{`→`}</Text>
                                        <Text style={[styles.text]}>{`→`}</Text>
                                        <Text style={[styles.text]}>{`→`}</Text>
                                    </View>
                                    <View style={{ width: '55%', }}>
                                        <Text style={[styles.text]}>{applicationManager.formatPrice(x.TOTAL_PRICE)}</Text>
                                        <Text style={[styles.text]}>{x.FULL_NAME}</Text>
                                        <Text style={[styles.text]}>{x.PHONE}</Text>
                                        <Text style={[styles.text]}>{`${x.ADDRESS}`}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.callPhone(x)}
                                style={[styles.others]}>
                                <Phone size={20} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContainer: {
        //height: 70,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        marginBottom: 10
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        //height: 70
    },
    others: { backgroundColor: theme.colors.border, height: 30, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
    extraTitle: { backgroundColor: theme.colors.border, paddingHorizontal: 5 },
    extraContainer: { marginBottom: 10, borderWidth: 1, borderColor: theme.colors.border },
    extraButton: {
        width: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonSubText: {
        fontSize: 12,
        textAlign: 'center'
    },
    text: {
        marginTop: 5
    }
});
