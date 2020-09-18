import React from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';
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
    dispatch: (param: IAction<any>) => void
}
const { height } = Dimensions.get('window')
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
                <View style={{
                    flex: 1,
                    maxHeight: (height / 2) - 100
                }}>
                    <Image source={{ uri: x.PREVIEW }} style={[styles.image]} />
                </View>
                <View style={{
                    flex: 1,
                    backgroundColor: theme.colors.background,
                    maxHeight: (height / 2)
                }}>
                    <ScrollView>
                        <Html html={x.DESCRIPTION} />
                    </ScrollView>
                </View>
                <View style={[styles.buttonContainer]}>
                    <View style={[styles.button, { backgroundColor: theme.colors.background }]}>
                        <Text style={{ fontSize: 20 }}>
                            {`${x.PRICE.toFixed(2)} ₺`}
                        </Text>
                    </View>
                    <View style={[styles.button, { backgroundColor: theme.colors.card }]}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.dispatch({ type: actionTypes.ADD_TO_CART, payload: x });
                                messageBox(messages.ADD_TO_CART_SUCCESS.replace('{0}', x.NAME))
                            }}>
                            <Text style={{ fontSize: 20 }}>
                                {messages.ADD_TO_CART}
                            </Text>
                        </TouchableOpacity>
                    </View>
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
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        zIndex: 9,
        backgroundColor: theme.colors.card
    },
    image: {
        resizeMode: 'cover',
        height: (height / 2) - 100,
        width: '100%',

    }
});
