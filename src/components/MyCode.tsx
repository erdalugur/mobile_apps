import React from 'react'
import QRCode from 'react-native-qrcode-svg';
import { Dimensions, Platform, StyleSheet, Text } from 'react-native';
import { View } from './View';
import theme from 'theme';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

interface Props {
    code: string | undefined
}
const MAX_POINTS = 500;

export function MyCode(props: Props) {
    let maxHeight = 150
    if (props.code === '') return null

    return (
        <View style={{
            margin: 20,
        }}>
            <Text style={{ fontWeight: 'bold', marginVertical: 10, color: theme.colors.text }}>Eğer puanlarınızı kullanmak isterseniz barkodu okutunuz</Text>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.colors.white,
                padding: 20,
                borderRadius: 5
            }}>
                <QRCode
                    size={maxHeight}
                    value={props.code?.toString()}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    points: {
        textAlign: 'center',
        color: theme.colors.text,
        fontSize: 22,
        fontWeight: '100',
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#152d44',
        padding: 50,
    },
    pointsDelta: {
        color: '#4c6479',
        fontSize: 50,
        fontWeight: '100',
    },
    pointsDeltaActive: {
        color: '#fff',
    },
});