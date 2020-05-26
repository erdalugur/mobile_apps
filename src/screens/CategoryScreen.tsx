import React from 'react';
import { StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { View, Text } from 'components'
import { connect } from 'react-redux';
import { NavigationProps, Product } from 'types';
import theme from 'theme';
import { screens } from 'navigation';
import { IAction, actionTypes } from 'myRedux/types';
import { messageBox, messages } from 'utils';


interface Props extends NavigationProps<{
    title: string
    items: Product[]
}, any> {
    dispatch: (param: IAction) => void
}
interface State {

}

class Index extends React.PureComponent<Props, State> {
    componentDidMount = () => {
        this.setTitle();
    }
    setTitle = () => {
        this.props.navigation.setOptions({
            title: this.props.route.params.title || 'Ürünler'
        })
    }

    renderItem = (x: Product, index: number) => {
        return (
            <TouchableOpacity
                key={index}
                onPress={() => {
                    this.props.navigation.navigate(screens.product, { item: x });
                }}
                style={[styles.itemContainer, {
                    paddingLeft: index % 2 === 0 ? 5 : 2.5,
                    paddingRight: index % 2 === 0 ? 2.5 : 5
                }]}>
                <View style={{ width: '100%' }}>
                    <Image source={{ uri: x.PREVIEW }}
                        style={{
                            resizeMode: 'cover',
                            height: 200
                        }} />
                    <View style={[styles.nameContainer]}>
                        <Text style={{ fontSize: 14 }}>{x.NAME}</Text>
                        <Text style={{ fontSize: 14 }}>{`${x.PRICE.toFixed(2)} ₺`}</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        this.props.dispatch({ type: actionTypes.ADD_TO_CART, payload: x })
                        messageBox(messages.ADD_TO_CART_SUCCESS.replace('{0}', x.NAME))
                    }} style={[styles.basket]}>
                        <Text>{messages.ADD_TO_CART}</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        let { items } = this.props.route.params
        return (
            <FlatList
                style={{ width: '100%', height: '100%' }}
                initialNumToRender={2}
                numColumns={2}
                keyExtractor={item => item.ID.toString()}
                data={items}
                renderItem={({ item, index }) => this.renderItem(item, index)}
            />
        )
    }
}

export default connect()(Index);
const styles = StyleSheet.create({
    container: {
    },
    itemContainer: {
        width: '50%',
        alignItems: 'center',
        paddingTop: 5
    },
    priceContainer: {
        position: 'absolute',
        width: '30%',
        top: 0,
        zIndex: 1,
        height: 30,
        opacity: 0.7,
        borderBottomRightRadius: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameContainer: {
        paddingHorizontal: 2,
        //backgroundColor: theme.colors.card,
        //position: 'absolute',
        width: '100%',
        //bottom: 0,
        zIndex: 1,
        //opacity: 0.7,
        height: 60,
        //alignItems: 'center',
        justifyContent: 'space-around',
    },
    basket: {
        backgroundColor: theme.colors.background,
        justifyContent: 'center', alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.text,
        height: 30,
        borderRadius: 2,
        opacity: 0.8,
        marginHorizontal: 2
    },
});
