import React from 'react'
import { View, Text } from 'components'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { NavigationProps } from 'types'
import { screens } from 'navigation'

interface State { }
interface Props extends NavigationProps<{}, any> { }
export default class CartQRScreen extends React.PureComponent<Props, State> {
    render() {
        return (
            <View full style={{
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text>QR Cart</Text>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate(screens.cartResult)
                }}>
                    <Text>Qr Result</Text>
                </TouchableOpacity>
            </View>
        )
    }
}