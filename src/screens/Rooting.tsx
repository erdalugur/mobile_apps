import React from 'react'
import { View, Text } from 'components'
import { connect } from 'react-redux'
import { TouchableOpacity, FlatList, StatusBar, StyleSheet } from 'react-native'
import theme from 'theme'
import { NavigationProps } from 'types'
import { Cheff, Setting, Menu, Bowtie, Money, ReportFile, MotorCycle } from 'icons'
import { IAction, actionTypes } from 'myRedux/types'
import { configurationManager } from 'utils'

interface Props extends NavigationProps<any, any> {
    dispatch: (param: IAction<string>) => void
}

interface State {

}

interface MenuItem {
    NAME: string
    PATH: string
    ICON: JSX.Element
}

let items: MenuItem[] = [
    //{ NAME: 'MİSAFİR', PATH: 'Home', ICON: <Menu color={theme.colors.text} size={40} /> },
    { NAME: 'GARSON', PATH: 'Search', ICON: <Bowtie color={theme.colors.text} size={45} /> },
    { NAME: 'KASİYER', PATH: 'Cashier', ICON: <Money color={theme.colors.text} size={40} /> },
    { NAME: 'MUTFAK', PATH: 'Kitchen', ICON: <Cheff color={theme.colors.text} size={40} /> },
    { NAME: 'PAKET SERVİS', PATH: 'PackageOrderScreen', ICON: <MotorCycle color={theme.colors.text} size={40} /> },

    { NAME: 'RAPORLAR', PATH: 'Reports', ICON: <ReportFile color={theme.colors.text} size={40} /> },
    { NAME: 'AYARLAR', PATH: 'Settings', ICON: <Setting color={theme.colors.text} size={40} /> },
]

interface IState {
    name: string
}
class Index extends React.PureComponent<Props, State> {
    state: IState = {
        name: ""
    }

    componentWillMount = async () => {
        StatusBar.setBarStyle('light-content')
    }

    renderItem = (x: MenuItem, index: number) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.dispatch({ type: actionTypes.SET_SCREEN, payload: x.PATH })
                    this.props.navigation.navigate(x.PATH)
                }}
                style={[styles.menuItem, index === -1 ? styles.guest : {}]}>
                <View style={[styles.button]}>
                    {x.ICON}
                    <Text
                        component="h6"
                        color={theme.colors.text}>{x.NAME}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    componentDidMount = async () => {
        const place = await configurationManager.getPlace();
        this.setState({ name: place?.NAME || "" })
    }

    renderTitle = () => {

        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <Text component="h2">{this.state.name}</Text>
            </View>
        )
    }

    render() {
        return (
            <View full style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
                <View style={{ flex: 1 }}>
                    {this.renderTitle()}
                </View>
                <View style={{ flex: 2 }}>
                    {this.renderItem({ NAME: 'MİSAFİR', PATH: 'Home', ICON: <Menu color={theme.colors.text} size={40} /> }, -1)}
                    <FlatList
                        style={{ width: '100%', height: '100%' }}
                        initialNumToRender={2}
                        numColumns={2}
                        keyExtractor={item => item.PATH}
                        data={items}
                        renderItem={({ item, index }) => this.renderItem(item, index)}
                    />
                </View>
            </View>
        )
    }
}

export default connect()(Index);

const styles = StyleSheet.create({
    menuItem: {
        width: '50%',
        padding: 5,
        height: 120
    },
    button: {
        backgroundColor: theme.colors.card,
        height: '100%',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 10,
        opacity: 0.9,
        paddingVertical: 10
    },
    guest: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    }
})