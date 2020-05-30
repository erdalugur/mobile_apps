import React from 'react';
import { StyleSheet, ScrollView, Picker, TouchableOpacity } from 'react-native';
import { Text, View, Button } from 'components'
import { NavigationProps } from 'types';
import theme from 'theme';
import { dataManager } from 'api';
import { messageBox, messages } from 'utils';

interface AdditionItem {
    DISCOUNT_PERCENT: string,
    ID: string,
    LAST_PRICE: number,
    PRODUCT_NAME: string,
    QUANTITY: number,
    SESSIONID: number,
    UNIT_PRICE: number,
}

interface Props extends NavigationProps<{
    items: AdditionItem[],
    table: string
}, any> {

}
interface SelectedItem {
    PRODUCTID: number
    PRICE: number

}
interface State {
    selectedPayment: string
    table: string,
    selectedItems: Array<string>
    items: AdditionItem[]
}

interface PaymentType {
    NAME: string
    ID: number
}

let PaymentItems: PaymentType[] = [
    { NAME: 'Nakit', ID: 1 }
]
export default class extends React.PureComponent<Props, State> {
    state: State = {
        selectedPayment: '1',
        table: '',
        selectedItems: [],
        items: []
    }
    componentDidMount = () => {
        this.setup();
    }

    setup = () => {
        this.setState({
            table: this.props.route.params.table,
            items: this.props.route.params.items
        })
    }

    sessionId = () => {
        return this.props.route.params.items[0].SESSIONID
    }

    close = async () => {
        let { selectedPayment, table, items } = this.state
        if (items.length === 0) return;

        let { data, error, statusCode } = await dataManager.closeAddition(
            table,
            selectedPayment,
            this.sessionId()
        );
        if (statusCode === 200) {
            messageBox(messages.PROCESS_SUCCESS);
            this.setState({ items: [] });
            return;
        }
    }

    addPayment = async () => {
        let { selectedItems, table, selectedPayment } = this.state
        let items = this.props.route.params.items;
        if (selectedItems.length === 0) {
            messageBox('Lütfen bir kayıt seçin')
            return;
        }

        let sendingItems: SelectedItem[] = items.filter(x => selectedItems.indexOf(x.ID) > -1).map(x => {
            return { PRICE: x.UNIT_PRICE, PRODUCTID: parseInt(x.ID) } as SelectedItem
        })
        let { data, error, statusCode, rowsEffected } = await dataManager.addPayment(
            table,
            selectedPayment,
            sendingItems,
            this.sessionId()
        );
        if (statusCode === 200) {
            messageBox(messages.PROCESS_SUCCESS)
        } else {
            messageBox(error);
        }
    }

    render() {
        let { items } = this.state
        return (
            <View style={styles.container}>
                <View style={{ height: 50, flexDirection: 'row' }}>
                    <View style={{ width: '50%', paddingRight: 1 }}>
                        <Button
                            onPress={this.addPayment}
                            style={{
                                backgroundColor: theme.colors.border
                            }}>
                            Ödeme Al
                        </Button>
                    </View>
                    <View style={{ width: '50%', paddingLeft: 1, }}>
                        <Button
                            onPress={this.close}
                            style={{
                                backgroundColor: theme.colors.border
                            }}>
                            Kapat
                        </Button>
                    </View>
                </View>
                <ScrollView style={{ width: '100%' }}>
                    {items.map(x => (
                        <TouchableOpacity key={x.ID}
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
                            }}
                            style={[styles.itemContainer, {
                                borderLeftWidth: this.state.selectedItems.indexOf(x.ID) > -1 ? 4 : 0,
                                borderLeftColor: this.state.selectedItems.indexOf(x.ID) > -1 ? theme.colors.primary : theme.colors.card
                            }]}>
                            <View style={{ width: '55%', flexDirection: 'row' }}>
                                <Text>{x.PRODUCT_NAME}</Text>
                            </View>
                            <View style={{ width: '45%', justifyContent: 'space-between', flexDirection: 'row' }}>
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
                    ))}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContainer: {
        height: 70,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    }
});
