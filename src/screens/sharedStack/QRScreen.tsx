import React from 'react';
import { messageBox, userManager } from 'utils';
import { SingleMultiType, IAction } from 'myRedux/types';
import { dataManager } from 'api';
import { connect } from 'react-redux';
import { AppState } from 'myRedux';
import { CartItem, NavigationProps } from 'types';
import { screens } from 'navigation';
import { BarcodeScanner } from 'components';

//<tennantId|username|password>
interface Props extends NavigationProps<any, any> {
    cart: SingleMultiType<any, {
        [key: string]: CartItem;
    }>
    dispatch: (param: IAction<number | any>) => void
}

interface State {
    hasPermission: boolean
    scanned: boolean
    username: string
    password: string
    tennantId: string
    loading: boolean
}
class Index extends React.Component<Props, State> {
    state: State = {
        hasPermission: false,
        scanned: false,
        username: "",
        password: "",
        tennantId: "",
        loading: false
    }

    handleBarCodeScanned = ({ type, data }: { type: any, data: string }) => {
        let [tennantId, username, password] = data.split("|");
        this.setState({
            scanned: true,
            username,
            password,
            tennantId
        }, this.loginAsync);
    };

    checkCartItems = () => Object.keys(this.props.cart.items).length > 0


    loginAsync = async () => {
        let { username,
            password,
            tennantId } = this.state
        let { token, data, error } = await dataManager.login(
            username,
            password,
            tennantId
        );
        if (token && data && data.length > 0) {
            let __data__ = data[0];
            await userManager.set({
                ID: __data__.ID,
                PASSWORD: password,
                USERNAME: username,
                STOREID: tennantId,
                token: token
            });
            this.setState({ loading: false })
            this.props.navigation.navigate(screens.routing)
        } else {
            messageBox(error);
            this.setState({ loading: false })
        }
    }


    render() {
        return (
            <BarcodeScanner
                full={true}
                handleBarCodeScanned={this.handleBarCodeScanned}
            />
        );
    }
}

const mapState = (state: AppState) => ({
    cart: state.app.cart,
})

export default connect(mapState)(Index)