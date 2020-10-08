import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import theme from 'theme';
import { Text } from './Text'
import { Button } from './Button';
import { NavigationProps } from 'types';
const { width, height } = Dimensions.get("screen")
interface HeaderProps extends NavigationProps<any, any> {
    title: string | undefined
}

export class Header extends React.PureComponent<HeaderProps, any>{

    renderLeft = () => {
        switch (this.props.route?.name) {
            case "Home":
                return (
                    <Button style={{

                    }} size="small">test</Button>
                );
            case "Profile":
                return (
                    <Button
                        textColor={theme.colors.primary}
                        style={{ padding: 0 }}
                        size="small"
                        onPress={() => this.props.navigation.goBack()}>
                        Back
                    </Button>
                )
            default:
                return (
                    <Button
                        textColor={theme.colors.primary}
                        style={{ padding: 0, width: '100%' }} size="small"
                        onPress={() => this.props.navigation.goBack()}>
                        Back
                    </Button>
                )
        }
    }
    renderCenter = () => {
        return (
            <View style={styles.center}>
                <Text style={{ fontWeight: '600' }} component="h6">{this.props.title || ""}</Text>
            </View>
        )
    }

    renderRight = () => {
        switch (this.props.route?.name) {
            case "Home":
                return (
                    <Button
                        size="small"
                        onPress={() => this.props.navigation.navigate("Cart")}>
                        Cart
                    </Button>
                )
            default:
                return (
                    <Text>Header</Text>
                )
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={styles.item}>
                        {this.renderLeft()}
                    </View>
                    {this.renderCenter()}
                    <View style={[styles.item, styles.right]}>
                        {this.renderRight()}
                    </View>
                </View>
            </View>
        );
    }
};


const styles = StyleSheet.create({
    container: {
        height: 88,
        backgroundColor: theme.colors.card,
        width: '100%',
        justifyContent: 'flex-end',
        paddingBottom: 8,
        paddingTop: 8,
        paddingHorizontal: 10
    },
    center: {
        maxWidth: width - (70 * 2)
    },
    item: {
        maxWidth: 70,
        minWidth: 70
    },
    right: {
        alignItems: 'flex-end'
    }
});
