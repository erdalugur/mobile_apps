import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import theme from 'theme';
import { Text } from './Text'
import { Button } from './Button';
import { NavigationProps } from 'types';
const { width, height } = Dimensions.get("screen")
interface HeaderProps extends NavigationProps {
    title: string | undefined
}

export class Header extends React.PureComponent<HeaderProps, any>{

    renderLeft = () => {
        switch (this.props.route?.name) {
            case "Home":
                return (
                    <Button size="small">test</Button>
                );
            default:
                return (
                    <Button style={{ padding: 0 }} size="small" onPress={() => this.props.navigation.goBack()}>
                        Back
                    </Button>
                )
        }
    }
    renderCenter = () => {
        return (
            <View style={styles.center}>
                <Text>{this.props.title || ""}</Text>
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
        height: 70,
        backgroundColor: theme.colors.card,
        width: '100%',
        justifyContent: 'flex-end',
        paddingBottom: 10,
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
