import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationProps } from 'types';
import { View, Text, Header } from 'components'
interface Props extends NavigationProps { }
export default function (props: Props) {
    return (
        <View full>
            <Header {...props} title="Cart" />
            <Text>Cart!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
