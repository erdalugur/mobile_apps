import React from 'react';
import { Dimensions, Platform, StyleSheet } from 'react-native';
import { Text, View, MenuItem, Layout, Button, MyCode } from 'components'
import { TouchableOpacity } from 'react-native';
import theme from 'theme';
import { IAction, actionTypes } from 'myRedux/types';
import { AuthContextProps, NavigationProps } from 'types';
import { screens } from 'navigation';
import { userManager } from 'utils';
import { ScrollView } from 'react-native-gesture-handler';

interface State {
    loading: boolean
    userId: string
}

interface Props extends NavigationProps<{}, any>, AuthContextProps {
    dispatch: (param: IAction<string>) => void
}

export class SettingNavigationScreen extends React.PureComponent<Props, State> {

    state: State = {
        userId: '',
        loading: false
    }

    componentDidMount = async () => {
        let user = await userManager.get();
        this.setState({ userId: user?.ID || '' })
    }

    renderMenuItem = () => {
        return (
            <ScrollView style={{ height: Dimensions.get('window').height - 80 }}>
                <MenuItem
                    label="Taleplerim"
                    onPress={() => this.props.navigation.navigate(screens.myReservations)}
                />
                <MenuItem
                    label="Yıldızlı İşlemler"
                    onPress={() => this.props.navigation.navigate(screens.myHistory)}
                />
                <MenuItem
                    label="Hesap Ayarları"
                    onPress={() => this.props.navigation.navigate(screens.myProfile)}
                />
            </ScrollView>
        )
    }
    render() {
        return (
            <Layout
                style={styles.container}
                loading={this.state.loading}>
                <MyCode code={this.state.userId} />
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
