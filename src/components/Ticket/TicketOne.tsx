

import React from 'react';
import { TouchableOpacity, ImageBackground, StyleSheet, Dimensions } from 'react-native'
import { Text, View } from 'components'
import { TicketItemProps } from 'types';

const { width, height } = Dimensions.get('window')

interface Props extends TicketItemProps {
    onPress: () => void
}
export class TicketOne extends React.PureComponent<Props, any>{

    render() {
        return (
            <TouchableOpacity
                style={[styles.item]}
                onPress={this.props.onPress}>
                <ImageBackground
                    source={{ uri: this.props.IMAGE_URL }}
                    resizeMethod="auto"
                    style={[styles.image]}>
                    <View style={{ backgroundColor: '#0000009c', height: '100%', width: '100%' }}>
                        <Text style={[styles.title]}>{this.props.NAME}</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold'
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        position: 'absolute',
        width: '100%',
        top: '50%',
        fontWeight: 'bold'
    },
    item: {
        paddingTop: 10,
        paddingHorizontal: 10,
        height: (height / 4) - 20,
        minHeight: 140,
        maxHeight: 180
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 5,
        overflow: 'hidden',
    }
})