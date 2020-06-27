import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import theme from 'theme';
import { messages, messageBox } from 'utils';
import { SingleMultiType, IAction, actionTypes } from 'myRedux/types';
import { dataManager } from 'api';
import { connect } from 'react-redux';
import { AppState } from 'myRedux';
import { CartItem } from 'types';

interface Props {
    cart: SingleMultiType<any, {
        [key: string]: CartItem;
    }>
    dispatch: (param: IAction<number | any>) => void
}

interface State {
    hasPermission: boolean
    scanned: boolean
    table: string
}
class Index extends React.Component<Props, State> {
    state: State = {
        hasPermission: false,
        scanned: false,
        table: ""
    }
    componentDidMount = async () => {
        this.requestPermissionsAsync();
    }

    requestPermissionsAsync = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        this.setState({ hasPermission: status === 'granted' });
    }


    handleBarCodeScanned = ({ type, data }: { type: any, data: any }) => {
        if (!this.state.scanned) {
            this.setState({ scanned: true, table: data }, this.sendOrder);
        }
    };

    checkCartItems = () => Object.keys(this.props.cart.items).length > 0


    sendOrder = async () => {
        if (this.state.table === '') {
            messageBox('Lütfen bir masa seçin')
            return;
        }
        let { items } = this.props.cart
        if (!this.checkCartItems()) {
            messageBox(messages.EMPTY_CART_MESSAGE)
        } else {
            let { statusCode, data, error } = await dataManager.setCart({
                TABLEID: this.state.table,
                JSON: Object.keys(items).map(x => {
                    return {
                        PRODUCTID: items[x].ID.toString(),
                        QUANTITY: items[x].quantity.toString()
                    }
                })
            });
            if (statusCode === 200) {
                messageBox(messages.SEND_CART_SUCCESS);
                this.props.dispatch({ type: actionTypes.REMOVE_CART, payload: {} })
            } else if (error) {
                messageBox(error)
            }
        }
    }


    render() {
        const { hasPermission, scanned } = this.state
        if (hasPermission === null) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', opacity: 0.8, }}>
                    <Text style={{ color: theme.colors.white }}>Requesting for camera permission</Text>
                </View>
            )
        }
        if (hasPermission === false) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', opacity: 0.8, }}>
                    <Text style={{ color: theme.colors.white }}>No access to camera</Text>
                </View>
            )
        }
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    marginBottom: 50
                }}>
                <BarCodeScanner
                    onBarCodeScanned={this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />

                {scanned && (
                    <Button title={'Yeniden Tara'}
                        onPress={() => this.setState({ scanned: false })} />
                )}
            </View>
        );

    }
}

const mapState = (state: AppState) => ({
    cart: state.app.cart,
    routeScreen: state.app.screen as screenOptions
})

export default connect(mapState)(Index)