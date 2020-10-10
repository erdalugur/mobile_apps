import React from 'react'
import { Button, Input, SignOutButton } from 'components'
import { StyleSheet, ScrollView, Dimensions } from 'react-native'
import theme from 'theme'
import { ContactRequestProps, NavigationProps } from 'types'
import { FormRow, PhoneInput, DateInput, Layout } from 'components'
import { applicationManager, messageBox, userManager, validationManager } from 'utils'
import { dataManager } from 'api'
import { StackActions } from '@react-navigation/native'
import { screens } from 'navigation'
const { height } = Dimensions.get('window')
interface State {
    error: { [key: string]: string }
    loading: boolean
    FIRST_NAME: string,
    LAST_NAME: string,
    PHONE: string
    ADDRESS: string
    EMAIL: string
    CREATED_DATE: string
    EDITING: boolean,
    USERNAME: string
    PASSWORD: string
    FORM: 1 | 2
}

interface Props extends NavigationProps<any, any> {

}
export class ProfileScreen extends React.PureComponent<Props, State> {

    state: State = {
        USERNAME: '',
        FIRST_NAME: '',
        LAST_NAME: '',
        PHONE: '',
        ADDRESS: '',
        EMAIL: '',
        CREATED_DATE: '',
        loading: false,
        error: {},
        EDITING: false,
        FORM: 1,
        PASSWORD: ''
    }

    componentDidMount = () => {
        this.loadAsync();
    }

    loadAsync = async () => {
        let user = await userManager.get();
        this.setState({
            USERNAME: user?.USERNAME || "",
            PASSWORD: user?.PASSWORD || "",
            loading: false
        })
    }



    savePrivateChangesAsync = async () => {
        let { USERNAME, PASSWORD } = this.state, error = {} as { [key: string]: string }
        USERNAME ? null : error['USERNAME'] = 'Kullanıcı adı boş olamaz'
        PASSWORD ? PASSWORD.length >= 5 ? null : error['PASSWORD'] = 'Parola en az 5 karekter olmalı' : error['PASSWORD'] = 'Parola boş olamaz'
        this.setState({ error })
        if (Object.keys(error).length > 0) return;

        let user = await userManager.get();
        if (user) {
            this.setState({ loading: true })
            let result = await dataManager.updateUserNameAsync(USERNAME, PASSWORD);
            if (result.statusCode === 200) {
                let msg = result.data && result.data[0]
                if (msg && msg.errorMessage) {
                    messageBox(msg.errorMessage)
                    this.setState({ loading: false })
                } else {
                    await userManager.set({
                        ID: user.ID as string,
                        PASSWORD: PASSWORD,
                        USERNAME: USERNAME,
                        STOREID: user.STOREID,
                        token: user.token
                    })
                    this.setState({ loading: false, EDITING: false })
                    messageBox('işlem başarıyla gerçekleşti')
                }
            } else {
                messageBox('işlem sırasında hata oluştu')
                this.setState({ loading: false })
            }
        }
    }

    renderPrivate = () => {
        return (
            <React.Fragment>
                <FormRow label="Kullanıcı Adı" errorMessage={this.state.error['USERNAME']}>
                    <Input
                        editable={this.state.EDITING}
                        placeholder="Ad"
                        value={this.state.USERNAME}
                        onChangeText={USERNAME => this.setState({ USERNAME })} />
                </FormRow>
                <FormRow label="Parola" errorMessage={this.state.error['PASSWORD']}>
                    <Input
                        editable={this.state.EDITING}
                        placeholder="Parola"
                        value={this.state.EDITING ? this.state.PASSWORD : '***'}
                        onChangeText={PASSWORD => this.setState({ PASSWORD })} />
                </FormRow>
                {this.state.EDITING ? (
                    <Button
                        loading={this.state.loading}
                        style={[styles.button, { backgroundColor: theme.colors.primary }]}
                        textStyle={[styles.text]}
                        onPress={this.savePrivateChangesAsync}>
                        Kaydet
                    </Button>
                ) : (
                        <Button
                            loading={this.state.loading}
                            style={[styles.button]}
                            textStyle={[styles.text]}
                            onPress={() => this.setState({ EDITING: true })}>
                            Kullanıcı Bilgileri Düzenle
                        </Button>
                    )}

                {this.state.EDITING ? (
                    <Button
                        loading={this.state.loading}
                        style={[styles.button]}
                        textStyle={[styles.text]}
                        onPress={() => this.setState({ EDITING: false, FORM: 1 })}>
                        Vazgeç
                    </Button>
                ) : (
                        <Button
                            loading={this.state.loading}
                            style={[styles.button, { backgroundColor: theme.colors.primary }]}
                            textStyle={[styles.text]}
                            onPress={() => this.props.navigation.navigate(screens.personalInfoScreen)}>
                            Kişisel Bilgileri Düzenle
                        </Button>
                    )}
            </React.Fragment>
        )
    }

    signOutAction = () => {
        this.props.navigation.dispatch(
            StackActions.replace(screens.homeTabs)
        );
    }

    render() {
        return (
            <Layout style={{ flex: 1, paddingHorizontal: 10 }}>
                <ScrollView style={{ height: height - 70 }}>
                    {this.renderPrivate()}
                    <SignOutButton style={[styles.button]} callback={this.signOutAction} />
                </ScrollView>
            </Layout>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.colors.border,
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    text: {
        fontWeight: 'bold'
    },
    label: {
        color: theme.colors.text,
        marginHorizontal: 10
    }
})