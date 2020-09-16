import React from 'react'
import { ScrollView, Image, StyleSheet } from 'react-native'
import { View } from './View'
import theme from 'theme'
import { Text } from './Text'
import { Product, NavigationProps } from 'types'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { IAction, actionTypes } from 'myRedux/types'
import { AddToCart } from './AddToCart'

interface State {

}

interface Props extends NavigationProps<any, any> {
    items: Array<Product>
    dispatch: Dispatch<IAction<any>>
}


class Index extends React.PureComponent<Props, State>{
    state: State = {}
    renderItems = () => {
        return this.props.items.map(x => (
            <View key={x.ID} style={{ marginRight: 5, width: 140, marginTop: 5 }}>
                <View style={{ paddingHorizontal: 5 }}>
                    <View style={[styles.productName]}>
                        <Text style={{ textTransform: "capitalize", textAlign: 'center' }}>{x.NAME.slice(0, 100)}</Text>
                        <Text style={{ textAlign: 'center' }}>{`${x.PRICE.toFixed(2).toString()} ₺`}</Text>
                    </View>
                    <AddToCart item={x} />
                </View>
            </View>
        ));
    }
    render() {

        return (
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}>
                {this.renderItems()}
            </ScrollView>
        )
    }
}

export const ProductsWithoutImageView = connect()(Index)
const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.card,
        height: 100,
        paddingBottom: 5,
        marginBottom: 10
    },
    basket: {
        justifyContent: 'center', alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.text,
        height: 30,
        borderRadius: 2,
        opacity: 0.8
    },
    productName: { justifyContent: 'space-around', height: 70, width: '100%' }
})