import React from 'react';
import { Dimensions, Platform, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text, View, MenuItem, Layout, Button, MyCode, BonusCircle } from 'components'
import { IAction, actionTypes } from 'myRedux/types';
import { AuthContextProps, NavigationProps } from 'types';
import { screens } from 'navigation';
import { userManager } from 'utils';
import { ArrowRight, QRCode } from 'icons';
import theme from 'theme';

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
                { Platform.OS === 'web' && (
                    <React.Fragment>
                        <MenuItem
                            label="Taleplerim"
                            onPress={() => this.props.navigation.navigate(screens.myReservations)}
                        />
                        <MenuItem
                            label="Yıldızlı İşlemler"
                            onPress={() => this.props.navigation.navigate(screens.myHistory)}
                        />
                        <MenuItem
                            label="Siparişlerim"
                            onPress={() => this.props.navigation.navigate(screens.myOrder)}
                        />
                    </React.Fragment>)}
                <MenuItem
                    label="Hesap Ayarları"
                    onPress={() => this.props.navigation.navigate(screens.myProfile)}
                />
            </ScrollView>
        )
    }

    renderBonus = () => {
        if (Platform.OS === 'web') {
            return (
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ padding: 20, justifyContent: 'center', alignItems: 'center', width: '50%' }}>
                        <BonusCircle bonus={14} limit={100} />
                    </View>
                    <View style={{ padding: 20, justifyContent: 'flex-end', width: '50%' }}>
                        <TouchableOpacity style={[styles.button]} onPress={() => this.props.navigation.navigate(screens.myCodeScreen)}>
                            <Text style={{ marginRight: 5 }}>Benim Barkodum</Text>
                            <View style={{ marginTop: 4 }}>
                                <ArrowRight size={15} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        } else {
            return null
        }
    }
    render() {
        return (
            <Layout
                style={styles.container}
                loading={this.state.loading}>
                { this.renderBonus()}
                { this.renderMenuItem()}
            </Layout>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: theme.colors.border, height: 35, borderRadius: 5 }
});
