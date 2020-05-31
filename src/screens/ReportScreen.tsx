// import React from 'react';
// import { StyleSheet } from 'react-native';
// import { Text, View } from 'components'

// export default function () {
//     return (
//         <View style={styles.container}>
//             <Text>KİŞİ BAZLI!</Text>
//             <Text>ÜRÜN BAZLI!</Text>
//             <Text>PERIOD BAZLI!</Text>
//             <Text>ADISYON BAZLI!</Text>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
// });

import React from 'react'
import { View, Text } from 'components'
import { connect } from 'react-redux'
import { TouchableOpacity, FlatList, StatusBar, StyleSheet } from 'react-native'
import theme from 'theme'
import { NavigationProps } from 'types'
import { Cheff, Setting, Menu, Bowtie, Money, ReportFile, Calendar, Person } from 'icons'

interface Props extends NavigationProps<any, any> {

}

interface State {

}
export type ReportType = 'PERSON' | 'PRODUCT' | 'PERIOD' | 'PRICE'
interface MenuItem {
    TYPE: ReportType
    NAME: string
    PATH: string
    ICON: JSX.Element
}

let items: MenuItem[] = [
    { TYPE: 'PERSON', NAME: 'Kişi Bazlı', PATH: 'ReportDetail', ICON: <Person color={theme.colors.text} size={40} /> },
    { TYPE: 'PRODUCT', NAME: 'Ürün Bazlı', PATH: 'ReportDetail', ICON: <Menu color={theme.colors.text} size={40} /> },
    { TYPE: 'PERIOD', NAME: 'Periyod Bazlı', PATH: 'ReportDetail', ICON: <Calendar color={theme.colors.text} size={40} /> },
    { TYPE: 'PRICE', NAME: 'Adisyon Bazlı', PATH: 'ReportDetail', ICON: <Money color={theme.colors.text} size={40} /> },
]


class Index extends React.PureComponent<Props, State> {

    componentWillMount = async () => {
        StatusBar.setBarStyle('light-content')
    }

    renderItem = (x: MenuItem, index: number) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate(x.PATH, { type: x.TYPE })
                }}
                style={[styles.menuItem]}>
                <View style={[styles.button]}>
                    {x.ICON}
                    <Text

                        color={theme.colors.text}>{x.NAME}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View full style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
                <FlatList
                    style={{ width: '100%', height: '100%' }}
                    initialNumToRender={2}
                    numColumns={2}
                    keyExtractor={item => item.PATH}
                    data={items}
                    renderItem={({ item, index }) => this.renderItem(item, index)}
                />
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
