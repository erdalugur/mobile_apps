import React from 'react';
import { messages, messageBox } from 'utils';
import { SingleMultiType, IAction, actionTypes } from 'myRedux/types';
import { dataManager } from 'api';
import { connect } from 'react-redux';
import { AppState } from 'myRedux';
import { CartItem } from 'types';
import { BarcodeScanner } from 'components';

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


    handleBarCodeScanned = ({ type, data }: { type: any, data: any }) => {
        this.setState({ table: data }, this.sendOrder);
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
        return (
            <BarcodeScanner
                handleBarCodeScanned={this.handleBarCodeScanned}
            />
        )

    }
}

const mapState = (state: AppState) => ({
    cart: state.app.cart,
})

export default connect(mapState)(Index)