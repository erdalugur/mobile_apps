import { dataManager } from 'api';
import { Html, Layout, Text, View } from 'components'
import { constands } from 'constands';
import { Star } from 'icons';
import React from 'react'
import { ScrollView, ImageBackground, Dimensions, StyleSheet } from 'react-native';
import theme from 'theme';

interface Props {
    value: number
    PRICE: number
}
export class DiscoutnComponent extends React.PureComponent<Props, any> {

    componentDidMount = async () => {
    }

    render() {
        return (
            <View style={[styles.starContainer]}>
                <Text style={{ textDecorationLine: 'line-through', fontSize: 16 }}>{`${this.props.PRICE.toFixed(2)} ${constands.try}`}</Text>
                <Text style={{ marginLeft: 10, fontSize: 16 }}>{`${this.props.value.toFixed(2)} ${constands.try}`}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    starContainer: {
        backgroundColor: 'transparent',
        position: 'absolute',
        width: '100%',
        top: 0,
        height: 30,
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center'
    }
})