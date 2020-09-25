import { dataManager } from 'api';
import { Html, Layout, Text, View } from 'components'
import { Star } from 'icons';
import React from 'react'
import { ScrollView, ImageBackground, Dimensions, StyleSheet } from 'react-native';
import theme from 'theme';

interface Props {
    value: number
}
export class StarComponent extends React.PureComponent<Props, any> {

    componentDidMount = async () => {
    }

    render() {
        return (
            <View style={[styles.starContainer]}>
                <View style={{ flexDirection: 'row' }} transparent>
                    {Array.apply(null, Array(this.props.value))
                        .map((x, i) => (
                            <Star color={'#ffffff82'} size={20} key={i} />
                        ))}
                </View>
                <Text style={{ marginLeft: 10, fontSize: 16 }}>{`Kazanma Fırsatı`}</Text>
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