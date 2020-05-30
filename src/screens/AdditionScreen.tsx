import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Text, View } from 'components'
import { NavigationProps } from 'types';
import theme from 'theme';

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
    items: AdditionItem[]
}, any> {

}

interface State { }
export default class extends React.PureComponent<Props, State> {

    render() {
        let items = this.props.route.params.items
        return (
            <View style={styles.container}>
                <ScrollView style={{ width: '100%' }}>
                    {items.map(x => (
                        <View key={x.ID} style={{
                            height: 70,
                            borderBottomWidth: 1,
                            borderBottomColor: theme.colors.border,
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 10
                        }}>
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
});
