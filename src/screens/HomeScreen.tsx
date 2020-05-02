import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Button } from 'components'
import { NavigationProps } from 'types'
interface Props extends NavigationProps { }
export default function (props: Props) {
    return (
        <View full style={styles.container}>
            <Text>Home!</Text>
            <Button size={"small"} onPress={() => props.navigation.navigate("Presentation")}>
                Presentation
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
