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
    const [loading, setLoading] = React.useState(false)
    const { signOut } = React.useContext(AuthContext)
    let label = props.label || "Çıkış Yap"
    return (
        <Button loading={loading} onPress={() => {
            setLoading(true)
            signOut(false)
            if (props.callback)
                props.callback()

            setLoading(false)
        }} style={[props.style]}>
            {label}
        </Button>
    )
}