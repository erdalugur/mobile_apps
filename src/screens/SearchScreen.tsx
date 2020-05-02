import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Button, Header } from 'components'
import { NavigationProps } from 'types';
interface Props extends NavigationProps { }

export default function (props: Props) {
    return (
        <View full>
            <Text>Search!</Text>
            <Button onPress={() => props.navigation.navigate("Cart")}>Cart</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
