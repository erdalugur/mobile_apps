import React from 'react'
import QRCode from 'react-native-qrcode-svg';
import { Dimensions, Platform, StyleSheet } from 'react-native';
import { View } from './View';
import { Text } from './Text'
import theme from 'theme';

interface Props {
    code: string | undefined
}
export function MyCode(props: Props) {
    let maxHeight = 150
    if (props.code === '') return null

    return (
        <View style={{
            margin: 20,
        }}>
            <Text style={{ fontWeight: 'bold', marginVertical: 10 }}>Eğer puanlarınızı kullanmak isterseniz barkodu okutunuz</Text>
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