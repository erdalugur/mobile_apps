import { CommonActions, StackActions } from '@react-navigation/native'
import { dataManager } from 'api'
import { Layout, View, Text, Input, Button, FormRow, PhoneInput, PasswordInput } from 'components'
import { actionTypes, IAction } from 'myRedux/types'
import { screens } from 'navigation'
import React from 'react'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { debug } from 'react-native-reanimated'
import { connect } from 'react-redux'
import theme from 'theme'
import { NavigationProps } from 'types'
import { configurationManager, messageBox, userManager, validationManager } from 'utils'


interface State {
    PASSWORD: string
    PHONE: string
    errors: { [key: string]: string }
    loading: boolean
    STOREID: string
    TITLE: string
}

interface Props extends NavigationProps<{
    action: Function
    screen: string
}, any> {
    dispatch: (param: IAction<any>) => void
}
class Index extends React.PureComponent<Props, State>{
    state: State = {
        PASSWORD: '',
        PHONE: '',
        errors: {},
        loading: false,
        STOREID: '',
        TITLE: ''
    }

    componentDidMount = async () => {
        let place = await configurationManager.getPlace();
        if (place !== null) {
            this.setState({ STOREID: place?.ID || "", TITLE: place?.NAME || "" })
        }
    }

    _resetAction = (token: string) => {
        this.props.navigation.dispatch(StackActions.replace(screens.homeTabs, { value: true }))
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
        if (result.data && result.token) {
            let user = result.data[0];
            await userManager.set({
                ID: user.ID as string,
                PASSWORD: PASSWORD,
                USERNAME: PHONE,
                STOREID: this.state.STOREID || "0",
                token: result.token
            })
            this.props.dispatch({ type: actionTypes.SIGN_IN, payload: { token: result.token } })
            this._resetAction(result.token);

            if (this.props.route.params) {
                this.props.route.params.action && this.props.route.params.action();
            }
            this.setState({ loading: false })
        } else {
            this.setState({ loading: false });
            messageBox('Kullanıcı adı veya parola yanlış')
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
                        <PasswordInput
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
                    <TouchableOpacity style={[styles.registerButton]} onPress={this.goBack}>
                        <Text>
                            Geri Dön
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.registerButton]} onPress={() => this.props.navigation.navigate(screens.registerGuest, {
                        action: this.props.route.params ? this.props.route.params.action : () => console.log('loginGuest')
                    })}>
                        <Text>
                            Kayıt Ol
                        </Text>
                    </TouchableOpacity>
                </View>
            </Layout >
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