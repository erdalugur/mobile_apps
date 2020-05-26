import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { CartItem } from 'types';
import { View, Text } from 'components'
import { connect } from 'react-redux';
import { AppState } from 'myRedux';
import { ScrollView } from 'react-native-gesture-handler';
import theme from 'theme';
import { SingleMultiType, IAction } from 'myRedux/types';
import { Plus, Minus } from 'icons';

interface Props {
    cart: SingleMultiType<any, {
        [key: string]: CartItem;
    }>
    dispatch: (param: IAction) => void
}
class Index extends React.PureComponent<Props, any> {

    RenderItems = () => {
        let { cart } = this.props
        return Object.keys(cart.items).map(x => (
            <View
                style={[styles.itemContainer]}
                key={cart.items[x].ID}>
                <View style={[styles.imageContainer]}>
                    <Image source={{ uri: cart.items[x].PREVIEW }} style={[styles.image]} />
                </View>
                <View style={[styles.cartInfo]}>
                    <Text style={{ textTransform: 'capitalize', fontSize: 20 }}>{cart.items[x].NAME}</Text>
                    <Text>{`Fiyat → ${cart.items[x].totalPrice.toFixed(2).toString()} ₺`}</Text>
                    <Text>{`Adet → ${cart.items[x].quantity.toString()} ₺`}</Text>
                    <Text>{`Toplam Fiyat → ${cart.items[x].totalPrice.toFixed(2).toString()} ₺`}</Text>
                </View>
                <View style={[styles.buttonContainer]}>
                    <Plus color={theme.colors.text}
                        onPress={() => this.props.dispatch({ type: 'INCREMENT', payload: cart.items[x].ID })} />
                    <Minus color={theme.colors.text}
                        onPress={() => this.props.dispatch({ type: 'DECREMENT', payload: cart.items[x].ID })} />
                </View>
            </View>
        ));
    }
    render() {
        return (
            <View full>
                <ScrollView>
                    {this.RenderItems()}
                </ScrollView>
            </View>
        );
    }
}

const mapState = (state: AppState) => ({
    cart: state.app.cart
})

export default connect(mapState)(Index)


const styles = StyleSheet.create({
    cartInfo: {
        width: '45%',
        height: '100%',
        paddingLeft: 5,
        justifyContent: 'space-around'
    },
    buttonContainer: {
        width: '10%',
        height: '100%',
        justifyContent: 'space-around',
        opacity: 0.8
    },
    imageContainer: {
        width: '45%',
        height: '100%',
        padding: 5
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        borderRadius: 5
    },
    itemContainer: {
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 120,
        marginBottom: 5
    }
});
