import React from 'react';
import { messageBox } from 'utils';
import { dataManager } from 'api';
import { connect } from 'react-redux';
import { AppState } from 'myRedux';
import { NavigationProps } from 'types';
import { BarcodeScanner } from 'components';
import { screens } from 'navigation';

interface Props extends NavigationProps<any, any> {
}

interface State {
    table: string
}
class Index extends React.Component<Props, State> {
    state: State = {
        table: ""
    }


    handleBarCodeScanned = ({ type, data }: { type: any, data: string }) => {
        this.sendOrder(data);
    };

    sendOrder = async (__table__: string) => {
        if (__table__ === '') {
            messageBox('Masa seçiniz');
            return;
        } else {
            // masa ıd ye göre adisyonu çek
            let { data, statusCode, error } = await dataManager.loadAddion(__table__);
            if (statusCode === 200 && Array.isArray(data) && data.length > 0) {
                this.props.navigation.navigate(screens.addition, { items: data, table: __table__ });
            } else if (statusCode === 200 && Array.isArray(data) && data.length === 0) {
                messageBox('Adisyon kaydı bulunamadı');
                return
            }
            else {
                messageBox(error);
            }
        }
    }

    render() {
        return (
            <BarcodeScanner
                full={false}
                handleBarCodeScanned={this.handleBarCodeScanned}
            />
        )

    }
}

const mapState = (state: AppState) => ({

})

export default connect(mapState)(Index)