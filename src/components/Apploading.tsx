import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface ApploadingProps { }

export const Apploading = (props: ApploadingProps) => {
    return (
        <View style={styles.container}>
            <Text>Apploading</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {}
});
