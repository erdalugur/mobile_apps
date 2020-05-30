import React from 'react';
import { StyleSheet, ScrollView, Picker } from 'react-native';
import { Text, View, Button } from 'components'
import { NavigationProps } from 'types';
import theme from 'theme';
import { dataManager } from 'api';

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

interface State {
    selectedPayment: string
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
        selectedPayment: '1'
    }

    close = async () => {
        let { data, error, statusCode } = await dataManager.closeAddition(this.props.route.params.table, this.state.selectedPayment);
        console.log(statusCode)
    }

    render() {
        let items = this.props.route.params.items
        return (
            <View style={styles.container}>
                <View style={{ height: 50, flexDirection: 'row' }}>
                    <View style={{ width: '50%', paddingRight: 1 }}>
                        <Button style={{
                            backgroundColor: theme.colors.border
                        }}>
                            Kapat
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
                        <View key={x.ID} style={[styles.itemContainer]}>
                            <View style={{ width: '55%' }}>
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
                        </View>
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
