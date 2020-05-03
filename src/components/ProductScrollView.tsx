import React from 'react'
import { ScrollView, Image, StyleSheet } from 'react-native'
import { View } from './View'
import theme from 'theme'
import { Text } from './Text'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Product } from 'types'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { IAction } from 'myRedux/types'
let Products: Product[] = [
    { ID: 1, NAME: "dankek lokmalık hindistan cevizli 160 g", PRICE: 3.75, DESCRIPTION: "", IMAGE_URL: "https://migros-dali-storage-prod.global.ssl.fastly.net/sanalmarket/product/05090023/05090023-f4ba19.jpg" },
    { ID: 2, NAME: "dankek lokmalık hindistan cevizli 160 g", PRICE: 3.75, DESCRIPTION: "", IMAGE_URL: "https://migros-dali-storage-prod.global.ssl.fastly.net/sanalmarket/product/05090023/05090023-f4ba19.jpg" },
    { ID: 3, NAME: "dankek lokmalık hindistan cevizli 160 g", PRICE: 3.75, DESCRIPTION: "", IMAGE_URL: "https://migros-dali-storage-prod.global.ssl.fastly.net/sanalmarket/product/05090023/05090023-f4ba19.jpg" },
    { ID: 4, NAME: "dankek lokmalık hindistan cevizli 160 g", PRICE: 3.75, DESCRIPTION: "", IMAGE_URL: "https://migros-dali-storage-prod.global.ssl.fastly.net/sanalmarket/product/05090023/05090023-f4ba19.jpg" }
]
interface State {

}

interface Props {
    title: string
    categoryId: number
    items: Array<Product>
    dispatch: Dispatch<IAction>
}


class Index extends React.PureComponent<Props, State>{
    static defaultProps = {
        title: "Kendini Şımart",
        categoryId: 1,
        items: Products
    }
    state: State = {}


    renderItems = () => {

        return this.props.items.map(x => (
            <View key={x.ID} style={{ marginRight: 5, width: 120 }}>
                <View style={{ padding: 5 }}>
                    <TouchableOpacity>
                        <Image source={{ uri: x.IMAGE_URL }} style={[styles.image]} />
                        <View style={[styles.productName]}>
                            <Text style={{ textTransform: "capitalize" }}>{x.NAME}</Text>
                            <Text>{x.PRICE.toString()}</Text>
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
                    <TouchableOpacity>
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
        height: 320,
        paddingBottom: 5,
        marginBottom: 10
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
        marginBottom: 10
    },
    image: {
        width: 110,
        height: 150,
        resizeMode: 'stretch'
    },
    basket: {
        justifyContent: 'center', alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.text,
        height: 30,
        borderRadius: 2
    },
    productName: { justifyContent: 'space-around', height: 100, width: '100%' }
})