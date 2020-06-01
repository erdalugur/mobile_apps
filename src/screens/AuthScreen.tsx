import React from 'react'
import { View, Text, Button } from 'components'
import { NavigationProps } from 'types'
import { TouchableOpacity, ScrollView } from 'react-native'
import theme from 'theme'
import { screens } from 'navigation'


interface Props extends NavigationProps<{

}, any> { }
interface State { }

export default class extends React.PureComponent<Props, State>{
    render() {
        return (
            <View full style={{
                padding: 30,
                backgroundColor: theme.colors.card
            }}>
                <View style={{
                    flex: 1,
                    backgroundColor: theme.colors.card
                }}></View>
                <View style={{ flex: 1, backgroundColor: theme.colors.card }}>
                    <ScrollView>
                        <Button onPress={() => {
                            this.props.navigation.navigate(screens.signin)
                        }} style={{ marginBottom: 20, backgroundColor: theme.colors.border, height: 50 }}>Kullanıcı Adı İle Giriş</Button>
                        <Button onPress={() => {
                            this.props.navigation.navigate(screens.loginQR)
                        }} style={{ height: 50 }}>QR İle Giriş</Button>
                    </ScrollView>
                </View>
            </View>
        )
    }
}