import { dataManager } from 'api'
import { Layout, View, Text, Input, Button } from 'components'
import { screens } from 'navigation'
import React from 'react'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { debug } from 'react-native-reanimated'
import theme from 'theme'
import { NavigationProps } from 'types'
import { configurationManager, messageBox, userManager } from 'utils'


interface State {
    PASSWORD: string
    PHONE: string
    errors: { [key: string]: string }
    loading: boolean
}

interface Props extends NavigationProps<{
    action: Function
}, any> { }
export default class extends React.PureComponent<Props, State>{
    state: State = {
        PASSWORD: '',
        PHONE: '',
        errors: {},
        loading: false
    }

    loginAsync = async () => {
        let { PASSWORD, PHONE } = this.state, errors: { [key: string]: string } = {}
        PASSWORD ? null : errors['PASSWORD'] = 'Boş geçilemez'
        PHONE ? null : errors['PHONE'] = 'Boş geçilemez'
        this.setState({ errors });

        if (Object.keys(errors).length > 0) {
            return
        }
        this.setState({ loading: true });

        let result = await dataManager.loginGuest(PHONE, PASSWORD);
        let place = await configurationManager.getPlace();
        if (result.data && result.token) {
            let user = result.data[0];
            await userManager.set({
                ID: user.ID as string,
                PASSWORD: PASSWORD,
                USERNAME: PHONE,
                STOREID: place?.ID || "0",
                token: result.token
            })
            this.props.route.params.action();
            setTimeout(() => {
                this.props.navigation.goBack();
            }, 1000);
        } else {
            this.setState({ loading: false });
            messageBox('Kullanıcı adı veya parola yanlış')
        }
    }

    hasError = (key: string) => this.state.errors[key]

    render() {
        return (
            <Layout style={{ justifyContent: 'center', flex: 1, paddingHorizontal: 20 }}>
                <View style={[styles.formContainer]}>
                    <View style={[styles.item]}>
                        <Input
                            keyboardType="number-pad"
                            value={this.state.PHONE}
                            onChangeText={(PHONE) => this.setState({ PHONE })}
                            placeholder="Telefon" />
                        <ErrorMessage
                            message={this.hasError('PHONE')}
                        />
                    </View>
                    <View style={[styles.item]}>
                        <Input
                            value={this.state.PASSWORD}
                            onChangeText={(PASSWORD) => this.setState({ PASSWORD })}
                            placeholder="Parola" />
                        <ErrorMessage
                            message={this.hasError('PASSWORD')}
                        />
                    </View>
                    <Button loading={this.state.loading} onPress={this.loginAsync} style={[styles.button]}>
                        Giriş Yap
                    </Button>
                </View>
                <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                    <TouchableOpacity style={[styles.registerButton]} onPress={() => this.props.navigation.goBack()}>
                        <Text>
                            Geri Dön
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.registerButton]} onPress={() => this.props.navigation.navigate(screens.registerGuest)}>
                        <Text>
                            Kayıt Ol
                        </Text>
                    </TouchableOpacity>
                </View>
            </Layout >
        )
    }
}

function ErrorMessage(props: { message: string }) {
    if (props.message) {
        return (
            <Text style={[styles.errorMessage]}>{props.message}</Text>
        )
    } else {
        return null
    }
}

const styles = StyleSheet.create({
    formContainer: {
        borderColor: theme.colors.border,
        borderWidth: 1,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3
    },
    item: {
        borderColor: theme.colors.border, borderBottomWidth: 1, marginTop: 10
    },
    button: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
    },
    errorMessage: {
        color: 'red',
        marginLeft: 5
    },
    registerButton: {
        backgroundColor: 'transparent',
        borderWidth: 0,

    }
})