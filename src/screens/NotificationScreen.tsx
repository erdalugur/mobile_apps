import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'components'

export default function App() {
    return (
        <View style={styles.container}>
            <Text>Campaign!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
