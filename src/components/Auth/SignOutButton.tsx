import { Button } from 'components/Button'
import { AuthContext } from 'navigation'
import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'



interface Props {
    style?: StyleProp<ViewStyle>
    label?: string
    callback?: Function
}
export function SignOutButton(props: Props) {
    const { signOut } = React.useContext(AuthContext)
    let label = props.label || "Çıkış Yap"
    return (
        <Button onPress={() => {
            signOut(false)
            if (props.callback)
                props.callback()
        }} style={[props.style]}>
            {label}
        </Button>
    )
}