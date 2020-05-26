import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import theme from 'theme'
import { useNavigation } from '@react-navigation/native'
import { Text } from './Text'
interface Props {

}
export function CartButton(props: Props) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={{ flexDirection: 'row', marginRight: 5 }}
            onPress={() => navigation.navigate("Cart")}>
            <AntDesign name="shoppingcart" size={22} color={theme.colors.text} />
            {/* <Text style={{position: 'absolute', top: 10}}>0</Text> */}
        </TouchableOpacity>
    )
}
