import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import theme from 'theme'
import { useNavigation } from '@react-navigation/native'
import { Text } from './Text'
import { screens } from 'navigation'
interface Props {

}
export function CartButton(props: Props) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={{ flexDirection: 'row', marginRight: 15 }}
            onPress={() => navigation.navigate(screens.cart)}>
            <AntDesign name="shoppingcart" size={25} color={theme.colors.text} />
        </TouchableOpacity>
    )
}
