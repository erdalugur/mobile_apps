import { dataManager } from 'api'
import { Layout, View, Text, Input, Button } from 'components'
import { screens } from 'navigation'
import React from 'react'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import theme from 'theme'
import { NavigationProps } from 'types'
import { configurationManager, messageBox, userManager, validationManager } from 'utils'


interface State {
    FIRST_NAME: string
    LAST_NAME: string
    PHONE: string
    ADDRESS: string
    PASSWORD: string
    loading: boolean
    errors: { [key: string]: string }
}
interface Props extends NavigationProps<{
    action: Function
}, any> { }

export default class extends React.PureComponent<Props, State>{
    state: State = {
        FIRST_NAME: '',
        LAST_NAME: '',
        ADDRESS: '',
        PHONE: '',
        PASSWORD: '',
        loading: false,
        errors: {}
    }

    loginAsync = async () => {
        let { FIRST_NAME, LAST_NAME, ADDRESS, PHONE, PASSWORD } = this.state, errors: { [key: string]: string } = {}
        FIRST_NAME ? null : errors['FIRST_NAME'] = 'Boş geçilemez'
        LAST_NAME ? null : errors['LAST_NAME'] = 'Boş geçilemez'
        PHONE ? validationManager.checkPhone(PHONE) ? null : errors['PHONE'] = '11 hane giriniz' : errors['PHONE'] = 'Boş geçilemez'
        ADDRESS ? null : errors['ADDRESS'] = 'Boş geçilemez'
        PASSWORD ? null : errors['PASSWORD'] = 'Boş geçilemez'
        this.setState({ errors });

        if (Object.keys(errors).length > 0) {
            return
        }
        this.setState({ loading: true })

        let result = await dataManager.registerGuest({
            ADDRESS,
            FIRST_NAME,
            LAST_NAME,
            PASSWORD,
            PHONE
        });
        if (result.statusCode === 200 && result.rowsEffected) {
            let login = await dataManager.loginGuest(PHONE, PASSWORD);
            let place = await configurationManager.getPlace();
            if (login.data && login.token) {
                let user = login.data[0];
                await userManager.set({
                    ID: user.ID as string,
                    PASSWORD: PASSWORD,
                    USERNAME: PHONE,
                    STOREID: place?.ID || "0",
                    token: login.token
                })
                setTimeout(() => {
                    if (this.props.route.params && this.props.route.params.action) {
                        this.props.route.params.action();
                        setTimeout(() => {
                            this.props.navigation.navigate(screens.cart)
                        }, 1000);
                    } else {
                        messageBox('işlem başarıyla gerçekleşti');
                        this.setState({ loading: true })
                    }
                }, 1000);
            } else {
                this.setState({ loading: false });
                messageBox('Kullanıcı adı veya parola yanlış')
            }
        } else {
            debugger
        }

    }

    hasError = (key: string) => this.state.errors[key]

    render() {
        return (
            <Layout style={{ justifyContent: 'center', flex: 1, paddingHorizontal: 20 }}>
                <View style={[styles.formContainer]}>
                    <View style={[styles.item]}>
                        <Input
                            value={this.state.FIRST_NAME}
                            onChangeText={(FIRST_NAME) => this.setState({ FIRST_NAME })}
                            placeholder="Ad" />
                        <ErrorMessage
                            message={this.hasError('FIRST_NAME')}
                        />
                    </View>
                    <View style={[styles.item]}>
                        <Input
                            value={this.state.LAST_NAME}
                            onChangeText={(LAST_NAME) => this.setState({ LAST_NAME })}
                            placeholder="Soyad" />
                        <ErrorMessage
                            message={this.hasError('LAST_NAME')}
                        />
                    </View>
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
                    <View style={[styles.item]}>
                        <Input
                            value={this.state.ADDRESS}
                            onChangeText={(ADDRESS) => this.setState({ ADDRESS })}
                            multiline numberOfLines={3} placeholder="Adres" />
                        <ErrorMessage
                            message={this.hasError('ADDRESS')}
                        />

                    </View>
                    <Button
                        textStyle={{ fontWeight: 'bold' }}
                        onPress={this.loginAsync} style={[styles.button]}>
                        Kayıt Ol
                    </Button>
                </View>
                <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                    <TouchableOpacity style={[styles.registerButton]} onPress={() => {
                        this.props.navigation.goBack()
                    }}>
                        <Text>
                            Geri Dön
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.registerButton]} onPress={() => {
                        this.props.navigation.goBack()
                    }}>
                        <Text>
                            Giriş Yap
                        </Text>
                    </TouchableOpacity>
                </View>
            </Layout>
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