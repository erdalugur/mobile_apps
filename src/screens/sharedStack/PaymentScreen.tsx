import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, View, Input, Button, Layout } from 'components'
import { NavigationProps } from 'types';
import theme from 'theme';
import { messageBox, messages } from 'utils';
import { SelectedItem } from '../additionStack/AdditionScreen'
import { dataManager } from 'api';

interface Props extends NavigationProps<{
    table: string
    price: string
    items: SelectedItem[],
    sessionId: number,
    operation: 'addPayment' | 'closeSession'
}, any> { }

interface State {
    table: string
    price: string
    items: SelectedItem[],
    sessionId: number
    selectedPayment: string
    paymentTypes: Array<{
        ID: string
        NAME: string
    }>
}
class Index extends React.PureComponent<Props, State>{
    state: State = {
        price: '0',
        table: '',
        items: [],
        sessionId: 0,
        selectedPayment: '',
        paymentTypes: []
    }

    componentDidMount = () => {
        this.setup();
    }

    setup = async () => {
        this.props.navigation.setOptions({
            title: this.props.route.params.operation === 'addPayment' ? 'Ödeme Al' : 'Hesabı Kapat'
        })
        this.setState({
            price: this.props.route.params.price,
            table: this.props.route.params.table,
            sessionId: this.props.route.params.sessionId,
            items: this.props.route.params.items
        })
        this.loadAsync();
    }

    loadAsync = async () => {
        let { data, statusCode, error } = await dataManager.loadPaymentTypes();
        if (statusCode === 200 && Array.isArray(data)) {
            this.setState({ paymentTypes: data });
        } else {
            messageBox(error);
        }
    }

    closeSession = async () => {
        let { selectedPayment, table, items, sessionId } = this.state;
        if (selectedPayment === '') {
            messageBox('Ödeme Tipi Seçiniz');
            return;
        }
        let { data, error, statusCode } = await dataManager.closeAddition(
            table,
            selectedPayment,
            sessionId,
            items
        );
        if (statusCode === 200) {
            messageBox(messages.PROCESS_SUCCESS);
            this.setState({ items: [] });
            setTimeout(() => {
                this.props.navigation.goBack();
            }, 2000);
            return;
        } else {
            messageBox(error);
        }
    }

    addPayment = async () => {
        let { price, table, items, selectedPayment, sessionId } = this.state;
        let { data, error, statusCode, rowsEffected } = await dataManager.addPayment(
            table,
            selectedPayment,
            items,
            sessionId
        );
        if (statusCode === 200) {
            messageBox(messages.PROCESS_SUCCESS)
        } else {
            messageBox(error);
        }
    }

    renderItems = () => {
        return (
            <FlatList
                style={{ width: '100%', height: '100%' }}
                initialNumToRender={2}
                numColumns={2}
                keyExtractor={item => item.ID.toString()}
                data={this.state.paymentTypes}
                renderItem={({ item, index }) => {
                    let isSelected = this.state.selectedPayment === item.ID
                    return (
                        <View style={{
                            paddingLeft: index % 2 === 0 ? 5 : 2.5,
                            paddingRight: index % 2 === 0 ? 2.5 : 5,
                            width: '50%'
                        }}>
                            <Button
                                key={index}
                                onPress={() => {
                                    this.setState((state: State) => {
                                        return { selectedPayment: item.ID === state.selectedPayment ? '' : item.ID }
                                    })
                                }}
                                textColor={isSelected ? theme.colors.card : theme.colors.text}
                                style={{
                                    width: '100%',
                                    marginBottom: 5,
                                    opacity: 0.8,
                                    backgroundColor: isSelected ? theme.colors.text : theme.colors.border,
                                    padding: 10,

                                }}>{item.NAME}</Button>
                        </View>
                    )
                }}
            />
        )

    }

    render() {
        const operation = this.props.route.params.operation
        return (
            <Layout style={styles.container}>
                <View style={{ flex: 1 }}>
                    {this.renderItems()}
                </View>
                { this.state.selectedPayment !== '' && (
                    <View style={{
                        bottom: 0,
                        width: '100%',
                        position: 'absolute',
                        height: 60
                    }}>
                        <Button
                            textStyle={{ fontWeight: 'bold' }}
                            onPress={() => operation === 'addPayment' ? this.addPayment() : this.closeSession()}
                        >Tamamla</Button>
                    </View>
                )}
            </Layout>
        );
    }
}
export default Index;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
