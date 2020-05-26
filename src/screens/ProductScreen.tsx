import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { View, Text, Html } from 'components'
import { NavigationProps, Product } from 'types';
import theme from 'theme';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { IAction, actionTypes } from 'myRedux/types';
import { connect } from 'react-redux';
import { messageBox, messages } from 'utils'
interface Props extends NavigationProps<{
    item: Product
}, any> {
    dispatch: (param: IAction) => void
}

interface State { }

class Index extends React.PureComponent<Props, any> {
    componentDidMount = () => {
        this.setTitle();
    }

    setTitle = () => {
        this.props.navigation.setOptions({
            title: this.props.route.params.item.NAME
        })
    }
    render() {
        const x = this.props.route.params.item
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <Image source={{ uri: x.PREVIEW }} style={[styles.image]} />
                </View>
                <ScrollView style={{ flex: 1, marginBottom: 70 }}>
                    <Html html={x.DESCRIPTION} />
                </ScrollView>
                <View style={[styles.buttonContainer]}>
                    <View style={[styles.button]}>
                        <Text style={{ fontSize: 20 }}>
                            {`${x.PRICE.toFixed(2)} ₺`}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.dispatch({ type: actionTypes.ADD_TO_CART, payload: x });
                            messageBox(messages.ADD_TO_CART_SUCCESS.replace('{0}', x.NAME))
                        }}
                        style={[styles.button]}>
                        <Text style={{ fontSize: 20 }}>
                            {messages.ADD_TO_CART}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


export default connect()(Index)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.card
    },
    button: {
        height: 70,
        alignContent: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        height: 70,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    image: {
        resizeMode: 'cover',
        height: '100%',
        width: '100%'
    }
});
