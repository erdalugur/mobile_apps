import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'components'

export default function () {
    return (
        <View full style={styles.container}>
            <Text>Home!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
