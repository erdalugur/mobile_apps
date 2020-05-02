import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Button, Header } from 'components'
import { NavigationProps } from 'types'
interface Props extends NavigationProps { }

export default function (props: Props) {
    return (
        <View full>
            <Header
                title="Home"
                navigation={props.navigation}
                route={props.route} />
            <Text>Home!</Text>
            <Button size={"small"} onPress={() => props.navigation.navigate("Presentation")}>
                Presentation
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    },
});
