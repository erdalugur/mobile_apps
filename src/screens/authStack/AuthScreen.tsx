import React from 'react'
import { NavigationProps } from 'types'
import { TouchableOpacity, ImageBackground, View, Text } from 'react-native'
import theme from 'theme'
import { screens } from 'navigation'
import config from 'config'


interface Props extends NavigationProps<{

}, any> { }
interface State { }

export default class extends React.PureComponent<Props, State>{
    render() {
        return (
            <ImageBackground
                source={{ uri: config.loginBackgroundImage }}
                style={{ flex: 2 }}>
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate(screens.signin)
                    }} style={{
                        marginBottom: 20,
                        backgroundColor: theme.colors.border,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 3
                    }}><Text style={{
                        color: theme.colors.text,

                    }}>KULLANICI ADI İLE GİRİŞ</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate(screens.loginQR)
                    }} style={{
                        marginBottom: 20,
                        backgroundColor: theme.colors.border,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 3
                    }}><Text style={{
                        color: theme.colors.text,
                    }}>QR İLE GİRİŞ</Text></TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}