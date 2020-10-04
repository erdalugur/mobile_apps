import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Text, View, MenuItem, Layout, Button } from 'components'
import { TouchableOpacity } from 'react-native';
import theme from 'theme';
import { IAction, actionTypes } from 'myRedux/types';
import { AuthContextProps, NavigationProps } from 'types';
import { screens } from 'navigation';
import { userManager } from 'utils';

interface State {
    loading: boolean
    isAuthenticated: boolean
}

interface Props extends NavigationProps<{}, any>, AuthContextProps {
    dispatch: (param: IAction<string>) => void
}

export class SettingNavigationScreen extends React.PureComponent<Props, State> {

    state: State = {
        isAuthenticated: false,
        loading: false
    }

    componentDidMount = async () => {
        // let isAuthenticated = await userManager.isAuthenticated();
        // this.setState({ isAuthenticated, loading: false })
    }

    renderMenuItem = () => {
        return (
            <React.Fragment>
                <MenuItem
                    label="Taleplerim"
                    onPress={() => this.props.navigation.navigate(screens.myReservations)}
                />
                <MenuItem
                    label="İşlem Geçmişi"
                    onPress={() => this.props.navigation.navigate(screens.myHistory)}
                />
                <MenuItem
                    label="Hesap Ayarları"
                    onPress={() => this.props.navigation.navigate(screens.myProfile)}
                />
            </React.Fragment>
        )
    }
    render() {
        return (
            <Layout
                style={styles.container}
                loading={this.state.loading}>
                { this.renderMenuItem()}
            </Layout>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
