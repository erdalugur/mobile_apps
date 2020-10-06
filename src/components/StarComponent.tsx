import { Text } from './Text'
import { View } from './View'
import { Star } from 'icons';
import React from 'react'
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import theme from 'theme';

interface Props {
    value: number
    textStyle?: StyleProp<TextStyle>
    containerStyle?: StyleProp<ViewStyle>
}
export class StarComponent extends React.PureComponent<Props, any> {

    componentDidMount = async () => {
    }

    render() {
        return (
            <View style={[styles.starContainer, this.props.containerStyle]}>
                <View style={{ flexDirection: 'row' }} transparent>
                    {Array.apply(null, Array(this.props.value))
                        .map((x, i) => (
                            <Star color={'#ffffff82'} size={20} key={i} />
                        ))}
                </View>
                <Text style={[{ marginLeft: 10, fontSize: 16 }, this.props.textStyle]}>{`Kazanma Fırsatı`}</Text>
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