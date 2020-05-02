import React from 'react'
import { View as ViewBase, StyleProp, ViewStyle } from 'react-native'
import { Card, Text } from 'components'
import theme from 'theme'

interface Props {
    full?: boolean
    style?: StyleProp<ViewStyle>
}
export class View extends React.PureComponent<Props, any> {
    render() {
        return (
            <ViewBase style={[{
                backgroundColor: theme.colors.background,
            }, this.props.style, this.props.full ? { flex: 1 } : {}]}>
                {this.props.children}
            </ViewBase>
        )
    }
}