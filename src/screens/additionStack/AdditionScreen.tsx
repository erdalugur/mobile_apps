import React from 'react';
import { StyleSheet, ScrollView, Picker, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { Text, View, Button, ProductExtra } from 'components'
import { NavigationProps, TransactionExtra, TransactionStatusText } from 'types';
import theme from 'theme';
import { dataManager } from 'api';
import { messageBox, messages } from 'utils';
import { screens } from 'navigation';
import { MoreOption, Pencil } from 'icons';

const { height } = Dimensions.get('screen')
export interface AdditionItem {
    DISCOUNT_PERCENT: string,
    ID: string,
    LAST_PRICE: number,
    PRODUCT_NAME: string,
    QUANTITY: number,
    SESSIONID: number,
    UNIT_PRICE: number,
    PRODUCTID: string
    NOTES: string
    EXTRAS: TransactionExtra[]
    STATUS: number
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
    items: AdditionItem[]
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

    setup = () => {
        this.props.navigation.setOptions({
            headerRight: () => (
                <View style={{
                    marginRight: 20,
                    backgroundColor: theme.colors.card
                }}>
                    <MoreOption onPress={() =>
                        this.props.navigation.navigate(screens.tableOptionScreen, {
                            item: this.state.table,
                            items: this.state.selectedItems.length > 0 ? this.state.selectedItems : this.state.items.map(x => x.ID)
                        })
                    } color={theme.colors.text} />
                </View>
            )
        })
        this.setState({
            table: this.props.route.params.table,
            items: this.props.route.params.items.map(x => {
                x.EXTRAS = JSON.parse(x.EXTRAS)
                return x
            })
        })
    }

    sessionId = () => {
        return this.props.route.params.items[0].SESSIONID
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
        let price: number = 0;
        items.filter(x => selectedItems.indexOf(x.ID) > -1).map(x => {
            price = price + x.LAST_PRICE;
        })
        let sendingItems: SelectedItem[] = items.filter(x => selectedItems.indexOf(x.ID) > -1).map(x => {
            return { PRICE: x.UNIT_PRICE, PRODUCTID: parseInt(x.PRODUCTID) } as SelectedItem
        })
        return { sendingItems, price };
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

    renderNote = (item: AdditionItem) => {
        return (
            <View style={[styles.extraContainer]}>
                <Text style={[styles.extraTitle]}>Notlar</Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <Text style={{ paddingHorizontal: 5 }}>{item.NOTES}</Text>
                    <TouchableOpacity style={{}} onPress={() => this.props.navigation.navigate(screens.noteScreen, {
                        // onNoteChange: (note: string) => {
                        //     this.props.dispatch({ type: actionTypes.SET_NOTE, payload: { key: key, note: note } })
                        // },
                        // note: item.NOTES
                    })}>
                        <Pencil color={theme.colors.white} size={20} />
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    renderExtras = (item: AdditionItem) => {
        if (item.EXTRAS.length > 0) {
            return (
                <View style={[styles.extraContainer]}>
                    <Text style={[styles.extraTitle]}>Esktralar</Text>
                    {item.EXTRAS.map((e, i) => (
                        <ProductExtra
                            screen="adisyon"
                            extra={e}
                            productKey={item.PRODUCTID}
                            handleExtra={ee => {
                                console.log("ee", ee);

                            }}
                            key={i}
                        />
                    ))}
                </View>
            )
        } else {
            null
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
                        <View key={x.ID} style={[styles.itemContainer, {
                            borderLeftWidth: this.state.selectedItems.indexOf(x.ID) > -1 ? 4 : 0,
                            borderLeftColor: this.state.selectedItems.indexOf(x.ID) > -1 ? theme.colors.text : theme.colors.card
                        }]}>
                            <TouchableOpacity
                                style={[styles.button]}
                                onPress={() => {
                                    this.setState((state: State) => {
                                        let index = state.selectedItems.indexOf(x.ID);
                                        if (index > -1) {
                                            state.selectedItems.splice(index, 1);
                                        } else {
                                            state.selectedItems.push(x.ID);
                                        }
                                        return { selectedItems: [...state.selectedItems] }
                                    })
                                }}>
                                <View style={{ width: '50%', justifyContent: 'space-around' }}>
                                    <Text>{x.PRODUCT_NAME}</Text>
                                    <Text style={{ fontSize: 12, marginTop: 5 }}>{`Durum: ${TransactionStatusText[x.STATUS]}`}</Text>
                                </View>
                                <View style={{ width: '50%', justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <View style={{ width: '45%' }}>
                                        <Text>{`Adet`}</Text>
                                        <Text>{`Fiyat`}</Text>
                                        <Text>{`Son Fiyat`}</Text>
                                    </View>
                                    <View style={{ width: '10%' }}>
                                        <Text>{`→`}</Text>
                                        <Text>{`→`}</Text>
                                        <Text>{`→`}</Text>
                                    </View>
                                    <View style={{ width: '45%', alignItems: 'flex-end' }}>
                                        <Text>{`${x.QUANTITY.toFixed()}`}</Text>
                                        <Text>{`${x.UNIT_PRICE.toFixed(2).toString()} ₺`}</Text>
                                        <Text>{`${x.LAST_PRICE.toFixed(2).toString()} ₺`}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState((state: State) => {
                                        let index = state.displayList.indexOf(x.ID)
                                        if (index > -1)
                                            state.displayList.splice(index, 1)
                                        else
                                            state.displayList.push(x.ID)

                                        return {
                                            displayList: [...state.displayList]
                                        }
                                    })
                                }}
                                style={[styles.others]}>
                                <Text>{`Diğer Bilgileri ${this.state.displayList.indexOf(x.ID) > -1 ? 'Gizle' : 'Göster'}`}</Text>
                            </TouchableOpacity>
                            {this.state.displayList.indexOf(x.ID) > -1 && (
                                <View style={{ padding: 10 }}>
                                    {this.renderExtras(x)}
                                    {this.renderNote(x)}
                                </View>
                            )}
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
        height: 70
    },
    others: { backgroundColor: theme.colors.border, height: 30, justifyContent: 'center', alignItems: 'center' },
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
    }
});
