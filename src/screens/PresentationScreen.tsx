import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import theme from 'theme';
import { Text, Card } from 'components'
interface PresentationProps { }

const Presentation = (props: PresentationProps) => {
    return (
        <View style={styles.container}>
            <Card style={{ padding: 50 }}>
                <Text component="h2">Presentation</Text>
            </Card>

        </View>
    );
};

export default Presentation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: theme.colors.background,
        //color: theme.colors.text
    }
});
