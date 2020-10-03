import { dataManager } from 'api';
import { Text, View, Layout } from 'components'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import theme from 'theme';
import { applicationManager } from 'utils';

const { height } = Dimensions.get('window')
interface ItemProps {
    PREVIEW: string
    NAME: string
    STAR: string
    TRANSACTION_DATE: string
    ID: string
    PRODUCTID: string
}
interface State {
    items: Array<ItemProps>,
    loading: boolean
}
export class HistoryScreen extends React.PureComponent<any, any> {
    state: State = {
        items: [],
        loading: false
    }
    componentDidMount = async () => {
        this.loadAsync();
    }

    loadAsync = async () => {
        this.setState({ loading: true })
        let result = await dataManager.loadMyTransactions();
        if (result.statusCode === 200 && result.data) {
            this.setState({ items: result.data, loading: false })
        } else {
            this.setState({ loading: false })
        }
    }
    renderItem = (x: ItemProps) => {
        return (
            <View key={x.ID} style={[styles.itemContainer]}>
                <Text style={{ width: '50%', textAlign: 'left' }}>{x.NAME}</Text>
                <Text style={{ width: '25%', textAlign: 'center' }}>{applicationManager.formatDate(x.TRANSACTION_DATE)}</Text>
                <Text style={{ width: '25%', textAlign: 'center' }}>{x.STAR}</Text>
            </View>
        )
    }

    render() {
        return (
            <Layout loading={this.state.loading} style={[styles.container]}>
                <View style={[styles.itemContainer, {
                    backgroundColor: theme.colors.border
                }]}>
                    <Text style={{ width: '50%', textAlign: 'left', fontWeight: 'bold' }}>{'Ürün'}</Text>
                    <Text style={{ width: '25%', textAlign: 'center', fontWeight: 'bold' }}>{'Oluş. Tar.'}</Text>
                    <Text style={{ width: '25%', textAlign: 'center', fontWeight: 'bold' }}>{'Yıldız'}</Text>
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