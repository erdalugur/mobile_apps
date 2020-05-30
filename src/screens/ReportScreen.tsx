import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'components'

export default function () {
    return (
        <View style={styles.container}>
            <Text>Raporlar!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
