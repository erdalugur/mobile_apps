import React from 'react'
import { View, Text } from 'components'
import { connect } from 'react-redux'
import { TouchableOpacity, FlatList, StatusBar, StyleSheet } from 'react-native'
import theme from 'theme'
import { NavigationProps } from 'types'
import { Cheff, Setting, Menu, Bowtie } from 'icons'

interface Props extends NavigationProps<any, any> {

}

interface State {

}

interface MenuItem {
    NAME: string
    PATH: string
    ICON: JSX.Element
}

let items: MenuItem[] = [
    { NAME: 'MİSAFİR', PATH: 'Home', ICON: <Menu color={theme.colors.text} size={40} /> },
    { NAME: 'GARSON', PATH: 'Search', ICON: <Bowtie color={theme.colors.text} size={40} /> },
    { NAME: 'MUTFAK', PATH: 'Kitchen', ICON: <Cheff color={theme.colors.text} size={40} /> },
    { NAME: 'AYARLAR', PATH: 'Settings', ICON: <Setting color={theme.colors.text} size={40} /> },
]


class Index extends React.PureComponent<Props, State> {

    componentWillMount = async () => {
        StatusBar.setBarStyle('light-content')
    }

    renderItem = (x: MenuItem, index: number) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate(x.PATH)
                }}
                style={[styles.menuItem]}>
                <View style={[styles.button]}>
                    {x.ICON}
                    <Text
                        component="h5"
                        color={theme.colors.text}>{x.NAME}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View full style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 1 }}>

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
    }
})