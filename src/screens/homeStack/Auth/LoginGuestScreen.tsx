import { dataManager } from 'api'
import { Layout, View, Text, Input, Button, FormRow, PhoneInput } from 'components'
import { screens } from 'navigation'
import React from 'react'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { debug } from 'react-native-reanimated'
import theme from 'theme'
import { NavigationProps } from 'types'
import { configurationManager, messageBox, userManager, validationManager } from 'utils'


interface State {
    PASSWORD: string
    PHONE: string
    errors: { [key: string]: string }
    loading: boolean
}

interface Props extends NavigationProps<{
    action: Function
    screen: string
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
        PHONE ? validationManager.checkPhone(PHONE) ? null : errors['PHONE'] = '11 hane giriniz' : errors['PHONE'] = 'Boş geçilemez'
        this.setState({ errors });

        if (Object.keys(errors).length > 0) {
            return
        }
        this.setState({ loading: true });

        PHONE = validationManager.makePhone(PHONE)

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
            this.props.route.params && this.props.route.params.action && this.props.route.params.action();
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
                    <FormRow
                        errorMessage={this.hasError('PHONE')}
                        label="Telefon"
                    >
                        <PhoneInput
                            value={this.state.PHONE}
                            onChange={(e) => this.setState({ PHONE: e.target.value })}
                        />
                    </FormRow>
                    <FormRow
                        errorMessage={this.hasError('PASSWORD')}
                        label="Parola"
                    >
                        <Input
                            value={this.state.PASSWORD}
                            onChangeText={(PASSWORD) => this.setState({ PASSWORD })}
                            placeholder="Parola" />
                    </FormRow>
                    <Button
                        textStyle={{ fontWeight: 'bold' }}
                        loading={this.state.loading} onPress={this.loginAsync} style={[styles.button]}>
                        Giriş Yap
                    </Button>
                </View>
                <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                    <TouchableOpacity style={[styles.registerButton]} onPress={() => this.props.navigation.navigate(screens.home)}>
                        <Text>
                            Geri Dön
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.registerButton]} onPress={() => this.props.navigation.navigate(screens.registerGuest, { action: this.props.route.params.action })}>
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