import { dataManager } from 'api';
import { Text, View, Layout } from 'components'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import theme from 'theme';
import { applicationManager } from 'utils';

const { height } = Dimensions.get('window')
interface ItemProps {
    REQUEST_TIME: string
    REQUEST_DATE: string
    CONTACT_TYPE: "1" | "2" | "3"
    CREATED_DATE: string
    PAX: number
    ID: string
    STATUS: 1 | 2 | 3
}
interface State {
    items: Array<ItemProps>,
    loading: boolean
}
export default class MyReservationScreen extends React.PureComponent<any, any> {
    state: State = {
        items: [],
        loading: false
    }
    componentDidMount = async () => {
        this.loadAsync();
    }

    loadAsync = async () => {
        this.setState({ loading: true })
        let result = await dataManager.loadMyRequest();
        if (result.statusCode === 200 && result.data) {
            this.setState({ items: result.data, loading: false })
        } else {
            this.setState({ loading: false })
        }
    }
    checkStatus = (statu: 1 | 2 | 3) => {
        switch (statu) {
            case 1:
                return "işlemde"
            case 2:
                return "Onay"
            case 3:
                return "Ret"
            default:
                return "işlemde"
        }
    }

    getRequestType = (statu: "1" | "2" | "3") => {
        switch (statu) {
            case "1":
                return "Rezervasyon"
            case "2":
                return "Organizasyon"
            case "3":
                return "Etkinlik"
            default:
                return "Rezervasyon"
        }
    }
    renderItem = (x: ItemProps) => {
        return (
            <View key={x.ID} style={[styles.itemContainer]}>
                <Text style={{ width: '35%', textAlign: 'left' }}>{this.getRequestType(x.CONTACT_TYPE)}</Text>
                <Text style={{ width: '25%', textAlign: 'center' }}>{applicationManager.formatDate(x.CREATED_DATE)}</Text>
                <Text style={{ width: '25%', textAlign: 'center' }}>{applicationManager.formatDate(x.REQUEST_DATE)}</Text>
                <Text style={{ width: '15%', textAlign: 'right' }}>{this.checkStatus(x.STATUS)}</Text>
            </View>
        )
    }

    render() {
        return (
            <Layout loading={this.state.loading} style={[styles.container]}>
                <View style={[styles.itemContainer, {
                    backgroundColor: theme.colors.border
                }]}>
                    <Text style={{ width: '35%', textAlign: 'left', fontWeight: 'bold' }}>{'Talep Türü'}</Text>
                    <Text style={{ width: '25%', textAlign: 'center', fontWeight: 'bold' }}>{'Oluş. Tar.'}</Text>
                    <Text style={{ width: '25%', textAlign: 'center', fontWeight: 'bold' }}>{'Talep Tar.'}</Text>
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