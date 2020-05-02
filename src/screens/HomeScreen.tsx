import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Button } from 'components'
import { NavigationProps } from 'types'
import { useSelector } from 'react-redux';
import { AppState } from 'myRedux';

interface Props extends NavigationProps { }

export default function (props: Props) {
    const app = useSelector((state: AppState) => state.app);
    console.log("app", app)
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
            <Button size={"small"} onPress={() => props.navigation.navigate("Signin")}>
                Sign In
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    },
});
