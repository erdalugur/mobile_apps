import React from 'react'
import { View, Text } from 'components'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { constands } from 'constands'
import theme from 'theme'

interface Props {
    onPress: (value: number) => void
    question: string
    value: number
}
export function Emoji(props: Props) {
    let checked = (x: number) => {
        return x === props.value
    }
    return (
        <View style={[styles.container]}>
            <View style={{
                width: '100%',
                backgroundColor: theme.colors.border,
                height: 30,
                justifyContent: 'center'
            }}>
                <Text style={{ fontSize: 16 }} center>{props.question}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => props.onPress(1)}>
                    <Text style={[styles.emoji, checked(1) ? styles.checked : {}]}>{constands.verySadEmoji}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.onPress(2)}>
                    <Text style={[styles.emoji, checked(2) ? styles.checked : {}]}>{constands.sadEmoji}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.onPress(3)}>
                    <Text style={[styles.emoji, checked(3) ? styles.checked : {}]}>{constands.normalEmoji}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.onPress(4)}>
                    <Text style={[styles.emoji, checked(4) ? styles.checked : {}]}>{constands.happyEmoji}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.onPress(5)}>
                    <Text style={[styles.emoji, checked(5) ? styles.checked : {}]}>{constands.veryHappyEmoji}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        paddingBottom: 10,
        marginBottom: 10
    },
    emoji: {
        fontSize: 20,
        marginTop: 10,
        width: 35,
        textAlign: 'center'
    },
    checked: {
        backgroundColor: '#272729',
        borderRadius: 2
    }
})