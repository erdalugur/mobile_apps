import React from 'react'
import { StyleSheet, Text } from 'react-native';
import { View } from './View';
import theme from 'theme';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

interface Props {
    limit: number
    bonus: number
}

export function BonusCircle(props: Props) {
    if (!props.bonus) return null

    return (
        <AnimatedCircularProgress
            size={120}
            width={3}
            backgroundWidth={12}
            fill={props.bonus}
            tintColor={theme.colors.text}
            backgroundColor={theme.colors.border}
        >
            {fill => <Text style={styles.points}>{`${props.bonus}/100`}</Text>}
        </AnimatedCircularProgress>
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