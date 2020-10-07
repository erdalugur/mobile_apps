import { dataManager } from 'api';
import { Text, View, Layout } from 'components'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import theme from 'theme';
import { applicationManager } from 'utils';
import { TransactionStatusText, TransactionStatusType } from 'types';

const { height } = Dimensions.get('window')
interface ItemProps {
    NAME: string
    QUANTITY: string
    LAST_PRICE: number
    SESSIONID: number
    ID: string
    STATUS: number
}
interface State {
    items: Array<ItemProps>,
    loading: boolean
}
export default class MyOrderScreen extends React.PureComponent<any, any> {
    state: State = {
        items: [],
        loading: false
    }
    componentDidMount = async () => {
        this.loadAsync();
    }

    loadAsync = async () => {
        this.setState({ loading: true })
        let result = await dataManager.loadMyOrder();
        if (result.statusCode === 200 && result.data) {
            this.setState({ items: result.data, loading: false })
        } else {
            this.setState({ loading: false })
        }
    }

    renderItem = (x: ItemProps) => {
        return (
            <View key={x.ID} style={[styles.itemContainer]}>
                <Text style={{ width: '35%', textAlign: 'left' }}>{x.NAME}</Text>
                <Text style={{ width: '25%', textAlign: 'center' }}>{x.QUANTITY}</Text>
                <Text style={{ width: '25%', textAlign: 'center' }}>{applicationManager.formatPrice(x.LAST_PRICE)}</Text>
                <Text style={{ width: '15%', textAlign: 'right' }}>{applicationManager.transactionStatusText(x.STATUS)}</Text>
            </View>
        )
    }

    render() {
        return (
            <Layout loading={this.state.loading} style={[styles.container]}>
                <View style={[styles.itemContainer, {
                    backgroundColor: theme.colors.border
                }]}>
                    <Text style={{ width: '35%', textAlign: 'left', fontWeight: 'bold' }}>{'Ürün'}</Text>
                    <Text style={{ width: '25%', textAlign: 'center', fontWeight: 'bold' }}>{'Adet'}</Text>
                    <Text style={{ width: '25%', textAlign: 'center', fontWeight: 'bold' }}>{'Fiyat'}</Text>
                    <Text style={{ width: '15%', textAlign: 'right', fontWeight: 'bold' }}>{'Durum'}</Text>
                </View>
                <ScrollView style={{ maxHeight: height - 80 }}>
                    {this.state.items.map(x => this.renderItem(x))}
                </ScrollView>
            </Layout>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContainer: {
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderLeftColor: theme.colors.border,
        justifyContent: 'space-between',
    }
});