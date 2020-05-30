import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, Input, Button } from 'components'
import { NavigationProps } from 'types';
import theme from 'theme';
import { messageBox, messages } from 'utils';
import { SelectedItem } from './AdditionScreen'
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
            sessionId
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

    render() {
        const operation = this.props.route.params.operation
        return (
            <View style={styles.container}>
                <View style={{
                    padding: 5,
                    flex: 1
                }}>
                    {operation === 'addPayment' &&
                        <Input
                            placeholder="Tutar"
                            style={{ borderWidth: 1, borderColor: theme.colors.border }}
                            keyboardType="number-pad"
                            value={this.state.price.toString()}
                            onChangeText={price => this.setState({ price })}
                        />}
                    {this.state.paymentTypes.map(x => {
                        let isSelected = this.state.selectedPayment === x.ID
                        return (
                            <Button
                                onPress={() => {
                                    this.setState({ selectedPayment: x.ID })
                                }}
                                style={{
                                    marginTop: 10,
                                    opacity: 0.8,
                                    backgroundColor: isSelected ? theme.colors.primary : theme.colors.background,
                                    padding: 10,
                                    borderColor: theme.colors.text,
                                    borderWidth: isSelected ? 0 : 1
                                }} key={x.ID}>{x.NAME}</Button>
                        )
                    })}
                    <Button
                        onPress={() => {
                            operation === 'addPayment' ? this.addPayment() : this.closeSession();
                        }}
                        style={{
                            marginTop: 10,
                            backgroundColor: theme.colors.border
                        }}>Tamamla</Button>
                </View>
            </View>
        );
    }
}
export default Index;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
