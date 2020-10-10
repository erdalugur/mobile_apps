import { CommonActions, StackActions } from '@react-navigation/native'
import { dataManager } from 'api'
import { Layout, View, Text, Input, Button, FormRow, PhoneInput } from 'components'
import { actionTypes, IAction } from 'myRedux/types'
import { screens } from 'navigation'
import React from 'react'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
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
    screen: string
}, any> {
    dispatch: (param: IAction<any>) => void
}

class Index extends React.PureComponent<Props, State>{
    state: State = {
        FIRST_NAME: '',
        LAST_NAME: '',
        ADDRESS: '',
        PHONE: '',
        PASSWORD: '',
        loading: false,
        errors: {}
    }
    componentDidMount() {
        console.log(this.props)
    }

    _resetAction = (token: string) => {
        this.props.dispatch({ type: actionTypes.SIGN_IN, payload: { token: token } })
        this.props.navigation.dispatch(StackActions.replace(screens.homeTabs, { value: true }))
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
        PHONE = validationManager.makePhone(PHONE)
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
                this.setState({ loading: false })
                if (this.props.route.params) {
                    this.props.route.params.action && this.props.route.params.action();

                }
                this._resetAction(login.token);

                if (!this.props.route.params) {
                    messageBox('Kayıt işlemi başarıyla gerçekleşti')
                    this.props.navigation.goBack();
                }
            } else {
                this.setState({ loading: false });
                messageBox('Kullanıcı adı veya parola yanlış')
            }
        } else {
            debugger
        }

    }

    hasError = (key: string) => this.state.errors[key]

    goBack = () => {
        let isCartScreen = this.props.route.params && this.props.route.params.screen === 'cart'
        isCartScreen ? this.props.navigation.goBack() : this.props.navigation.navigate(screens.homeTabs)
    }

    render() {
        return (
            <Layout style={{ justifyContent: 'center', flex: 1, paddingHorizontal: 20 }}>
                <View style={[styles.formContainer]}>
                    <FormRow errorMessage={this.hasError('FIRST_NAME')} label="Ad">
                        <Input
                            value={this.state.FIRST_NAME}
                            onChangeText={(FIRST_NAME) => this.setState({ FIRST_NAME })}
                            placeholder="Ad" />
                    </FormRow>
                    <FormRow errorMessage={this.hasError('LAST_NAME')} label="Soyad">
                        <Input
                            value={this.state.LAST_NAME}
                            onChangeText={(LAST_NAME) => this.setState({ LAST_NAME })}
                            placeholder="Soyad" />
                    </FormRow>
                    <FormRow errorMessage={this.hasError('PHONE')} label="Telefon">
                        <PhoneInput
                            value={this.state.PHONE}
                            onChange={(e) => this.setState({ PHONE: e.target.value })}
                        />
                    </FormRow>
                    <FormRow errorMessage={this.hasError('PASSWORD')} label="Parola">
                        <Input
                            value={this.state.PASSWORD}
                            onChangeText={(PASSWORD) => this.setState({ PASSWORD })}
                            placeholder="Parola" />
                    </FormRow>
                    <FormRow errorMessage={this.hasError('ADDRESS')} label="Adres">
                        <Input
                            value={this.state.ADDRESS}
                            onChangeText={(ADDRESS) => this.setState({ ADDRESS })}
                            multiline numberOfLines={3} placeholder="Adres" />
                    </FormRow>
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
export default connect()(Index)
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