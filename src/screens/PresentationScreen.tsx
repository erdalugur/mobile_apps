import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import theme from 'theme';
import { Text } from 'components'
interface PresentationProps { }

const Presentation = (props: PresentationProps) => {
    return (
        <View style={styles.container}>
            <Text>Presentation</Text>
        </View>
    );
};

export default Presentation;

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        color: theme.colors.text
    }
});
