import { Button } from 'components/Button'
import { AuthContext } from 'navigation'
import React from 'react'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { userManager } from 'utils'



interface Props {
    style?: StyleProp<ViewStyle>
    label?: string
    action?: Function
    textStyle?: StyleProp<TextStyle>
    loading?: boolean
}
export function SignInButton(props: Props) {
    const { signIn } = React.useContext(AuthContext)
    let label = props.label || "Giriş Yap"

    let action = async () => {
        if (props.action)
            props.action()

        let user = await userManager.get();
        debugger
        if (user != null)
            signIn(user)
    }
    return (
        <Button
            loading={props.loading}
            textStyle={props.textStyle}
            onPress={() => {
                action()
            }} style={[props.style]}>
            {label}
        </Button>
    )
}