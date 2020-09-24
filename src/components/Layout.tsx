import React from 'react'
import { View, ViewStyle, ActivityIndicator } from 'react-native'
import { Text } from './Text'
import theme from 'theme'

interface Props {
    loading?: boolean
    style?: ViewStyle
}
export class Layout extends React.PureComponent<Props, any> {

    render() {
        if (this.props.loading) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator color={theme.colors.white} size={40} />
                    <Text>Yükleniyor...</Text>
                </View>
            )
        } else {
            return (
                <View style={[this.props.style]}>
                    {this.props.children}
                </View>
            )
        }
    }
}