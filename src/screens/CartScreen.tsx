import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { NavigationProps } from 'types';
import { View, Text, Header } from 'components'
import { useSelector } from 'react-redux';
import { AppState } from 'myRedux';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import theme from 'theme';
interface Props { }
export default function (props: Props) {
    const cart = useSelector((state: AppState) => state.app.cart);

    const RenderItems = () => {
        return Object.keys(cart.items).map(x => (
            <View
                style={{
                    marginTop: 5
                }}
                key={cart.items[x].ID}>
                <View style={{
                    paddingHorizontal: 5,
                    backgroundColor: theme.colors.card,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 75,
                }}>

                    <Image source={{ uri: cart.items[x].IMAGE_URL }} style={{
                        height: 70,
                        width: 50,
                        resizeMode: "contain"
                    }} />
                    <View>
                        <Text style={{ textTransform: 'capitalize' }}>{cart.items[x].NAME}</Text>
                    </View>
                    <Text>{cart.items[x].quantity.toString()}</Text>
                    <Text>{cart.items[x].totalPrice.toString()}</Text>
                </View>
            </View>
        ));
    }
    return (
        <View full>
            <ScrollView>
                {RenderItems()}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
