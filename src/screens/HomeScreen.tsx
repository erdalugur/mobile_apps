import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Button } from 'components'
import { NavigationProps } from 'types'

interface Props extends NavigationProps { }

export default function (props: Props) {
    return (
        <View full>
            <Text>Home!</Text>
            <Button size={"small"} onPress={() => props.navigation.navigate("Presentation")}>
                Presentation
            </Button>
            <Button size={"small"} onPress={() => props.navigation.navigate("Cart")}>
                Cart
            </Button>
            <Button size={"small"} onPress={() => props.navigation.navigate("Notification")}>
                Kampanyalar
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    },
});
