import React from 'react';
import { StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { View, Text } from 'components'
import { connect } from 'react-redux';
import { NavigationProps, Product } from 'types';
import theme from 'theme';
import { screens } from 'navigation';


interface Props extends NavigationProps<{
    title: string
    items: Product[]
}, any> {

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
        console.log(index)
        return (
            <TouchableOpacity
                key={index}
                onPress={() => {
                    this.props.navigation.navigate(screens.product, { item: x });
                }}
                style={[styles.itemContainer, {
                    paddingLeft: index % 2 === 0 ? 10 : 5,
                    paddingRight: index % 2 === 0 ? 5 : 10
                }]}>
                <View style={{
                    width: '100%',
                    backgroundColor: theme.colors.card
                }}>
                    <View style={[styles.priceContainer]}>
                        <Text style={{ fontSize: 16 }}>{`${x.PRICE.toFixed(2)} ₺`}</Text>
                    </View>
                    <Image
                        source={{ uri: x.PREVIEW }}
                        style={{
                            resizeMode: 'cover',
                            height: 200
                        }} />
                    <View style={[styles.nameContainer]}>
                        <Text style={{ fontSize: 20 }}>{x.NAME}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    renderItems = () => {
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

    render() {
        return (
            <View style={styles.container}>
                {this.renderItems()}
            </View>
        );
    }
}

export default connect()(Index);
const styles = StyleSheet.create({
    container: {
    },
    itemContainer: {
        width: '50%',
        alignItems: 'center',
        paddingTop: 10,
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
        position: 'absolute',
        width: '100%',
        bottom: 0,
        zIndex: 1,
        opacity: 0.7,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
