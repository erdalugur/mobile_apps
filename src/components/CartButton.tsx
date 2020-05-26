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
            style={{ flexDirection: 'row', marginRight: 10 }}
            onPress={() => navigation.navigate("Cart")}>
            <AntDesign name="shoppingcart" size={25} color={theme.colors.text} />
        </TouchableOpacity>
    )
}
