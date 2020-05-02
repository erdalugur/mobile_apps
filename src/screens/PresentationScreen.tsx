import * as React from 'react';
import { StyleSheet } from 'react-native';
import theme from 'theme';
import { Text, Card, Button, Header, View } from 'components'
import { NavigationProps } from 'types';
interface PresentationProps extends NavigationProps { }

class Presentation extends React.PureComponent<PresentationProps, any>{
    render() {
        return (
            <View full>
                {/* <Header {...props} /> */}
                <View style={styles.container}>
                    <Card style={{ padding: 50 }}>
                        <Text component="h2">Presentation</Text>
                    </Card>
                    <Button onPress={() => this.props.navigation.goBack()}>
                        Button
            </Button>
                </View>
            </View>
        );
    }
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
