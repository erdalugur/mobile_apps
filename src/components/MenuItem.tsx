import React from 'react'
import { View } from './View'
import { TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import theme from 'theme'
import { Text } from './Text'

interface Props {
    onPress?: () => void
    rowStyle?: StyleProp<ViewStyle>
    iconComponent?: {
        icon: any,
        position?: 'start' | 'end'
    }
    label: string
}
export function MenuItem(props: Props) {
    let position = props.iconComponent && props.iconComponent.position || 'start'
    return (
        <View style={[styles.buttonItem]}>
            <TouchableOpacity style={[styles.button]} onPress={() => props.onPress ? props.onPress() : null}>
                {props.iconComponent && position === 'start' && props.iconComponent.icon}
                <Text style={[styles.text]}>{props.label}</Text>
                {props.iconComponent && position === 'end' && props.iconComponent.icon}
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    buttonItem: {
        borderBottomColor: theme.colors.border,
        borderBottomWidth: 1,
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 5,
        paddingVertical: 10
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    text: {
        marginHorizontal: 10,
        fontSize: 14
    }
})