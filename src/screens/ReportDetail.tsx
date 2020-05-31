import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Text, View } from 'components'
import { NavigationProps } from 'types';
import { ReportType } from './ReportScreen';
import { dataManager } from 'api';
import { messageBox } from 'utils';
import theme from 'theme';

interface ItemModel {
    CATEGORY: string,
    CREATED_DATE: string,
    NAME: string,
    PRICE: number,
    PRODUCT: string,
    SESSIONID: number,
    TABLE_NAME: string,
    PERSON: string
}
interface Props extends NavigationProps<{
    type: ReportType
}, any> { }

interface State {
    loading: boolean
    items: Array<ItemModel>
}

export default class extends React.PureComponent<Props, State>{
    state: State = {
        loading: false,
        items: []
    }

    componentDidMount = () => {
        this.loadAsync();
    }

    loadAsync = async () => {
        let report = this.props.route.params.type
        let { data, statusCode, error } = await dataManager.loadReports();
        if (statusCode === 200 && Array.isArray(data)) {
            this.setState({ items: data, loading: false });
        } else if (error) {
            this.setState({ loading: false });
            messageBox(error);
        }
    }

    renderProduct = () => {
        let items = groupBy<{ [key: string]: ItemModel[] }>(this.state.items, 'PRODUCT');

        return (
            <ScrollView style={{
                padding: 10,

            }}>
                {Object.keys(items).map(x => (
                    <View key={x} style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: 50,
                        backgroundColor: theme.colors.border,
                        paddingHorizontal: 10,
                        borderRadius: 2,
                        marginBottom: 5
                    }}>
                        <Text>{x}</Text>
                        <Text>
                            {items[x].length.toString()}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        )
    }

    renderPerson = () => {
        let items = groupBy<{ [key: string]: ItemModel[] }>(this.state.items, 'PERSON');

        return (
            <ScrollView style={{
                padding: 10,
            }}>
                {Object.keys(items).map(x => (
                    <View key={x} style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: 50,
                        backgroundColor: theme.colors.border,
                        paddingHorizontal: 10,
                        borderRadius: 2,
                        marginBottom: 5
                    }}>
                        <Text>{x}</Text>
                        <Text>
                            {items[x].length.toString()}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        )
    }

    renderPeriod = () => {
        return (
            <View>
                <Text>
                    Günlük Saatlik
                    </Text>
            </View>
        )
    }

    renderPrice = () => {
        let items = groupBy<{ [key: string]: ItemModel[] }>(this.state.items, 'TABLE_NAME');

        return (
            <ScrollView style={{
                padding: 10,
            }}>
                {Object.keys(items).map(x => (
                    <View key={x} style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: 50,
                        backgroundColor: theme.colors.border,
                        paddingHorizontal: 10,
                        borderRadius: 2,
                        marginBottom: 5
                    }}>
                        <Text>{x}</Text>
                        <Text>
                            {items[x].length.toString()}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        )
    }
    render() {
        let report = this.props.route.params.type
        const renderReport = {
            "PERSON": this.renderPerson(),
            "PRODUCT": this.renderProduct(),
            "PERIOD": this.renderPeriod(),
            "PRICE": this.renderPrice()
        }
        return (
            <View style={styles.container}>
                {renderReport[report]}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
let groupBy = function <T>(xs: Array<any>, key: string) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {}) as T;
};