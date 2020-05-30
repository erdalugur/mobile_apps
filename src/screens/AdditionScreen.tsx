import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'components'
import { NavigationProps } from 'types';

interface AdditionItem {
    DISCOUNT_PERCENT: string,
    ID: string,
    LAST_PRICE: number,
    PRODUCT_NAME: string,
    QUANTITY: number,
    SESSIONID: number,
    UNIT_PRICE: number,
}

interface Props extends NavigationProps<{
    items: AdditionItem[]
}, any> {

}

interface State { }
export default class extends React.PureComponent<Props, State> {

    render() {
        //console.log(this.props.route.params.items)
        return (
            <View style={styles.container}>
                <Text>Adisyon!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
