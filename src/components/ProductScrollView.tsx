import React from 'react'
import { ScrollView, Image, StyleSheet } from 'react-native'
import { View } from './View'
import theme from 'theme'
import { Text } from './Text'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Product, NavigationProps } from 'types'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { IAction } from 'myRedux/types'

interface State {

}

interface Props extends NavigationProps<any, any> {
    title: string
    categoryId: string
    items: Array<Product>
    dispatch: Dispatch<IAction>
}


class Index extends React.PureComponent<Props, State>{
    state: State = {}
    renderItems = () => {

        return this.props.items.map(x => (
            <View key={x.ID} style={{ marginRight: 5, width: 140 }}>
                <View style={{ padding: 5 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Product", { item: x })}>
                        <Image source={{ uri: x.PREVIEW }} style={[styles.image]} />
                        <View style={[styles.productName]}>
                            <Text style={{ textTransform: "capitalize", textAlign: 'center' }}>{x.NAME.slice(0, 100)}</Text>
                            <Text style={{ textAlign: 'center' }}>{`${x.PRICE.toFixed(2).toString()} ₺`}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.dispatch({ type: "ADD_TO_CART", payload: x });
                        }}
                        style={[styles.basket]}>
                        <Text>
                            Sepete Ekle
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        ));
    }
    render() {

        return (
            <View style={[styles.container]}>
                <View style={[styles.title]}>
                    <Text>{this.props.title}</Text>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("Category", {
                            title: this.props.title,
                            items: this.props.items
                        })}>
                        <Text>
                            Tümünü Gör
                        </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}>
                    {this.renderItems()}
                </ScrollView>
            </View>
        )
    }
}

export const ProductScrollView = connect()(Index)
const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.card,
        height: 300,
        paddingBottom: 5,
        marginBottom: 10
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 10,
        paddingBottom: 10
    },
    image: {
        width: 130,
        height: 150,
        resizeMode: 'cover'
    },
    basket: {
        justifyContent: 'center', alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.text,
        height: 30,
        borderRadius: 2
    },
    productName: { justifyContent: 'space-around', height: 70, width: '100%' }
})