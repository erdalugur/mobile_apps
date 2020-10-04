import React from 'react'
import { Button, Input } from 'components'
import { StyleSheet, ScrollView, Dimensions } from 'react-native'
import theme from 'theme'
import { ContactRequestProps } from 'types'
import { FormRow, PhoneInput, DateInput, Layout } from 'components'
import { applicationManager, userManager, validationManager } from 'utils'
import { dataManager } from 'api'
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

interface Props {

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
        let userDetail = await dataManager.loadUserAsync();
        if (userDetail.statusCode === 200 && userDetail.data) {
            this.setState({
                ...userDetail.data[0],
                USERNAME: user?.USERNAME,
                PASSWORD: user?.PASSWORD,
                loading: false
            })
        }
    }

    savePersonalChangesAsync = async () => {
        let { FIRST_NAME, LAST_NAME, EMAIL, ADDRESS, PHONE, USERNAME, PASSWORD } = this.state, error = {} as { [key: string]: string }
        PHONE ? validationManager.checkPhone(PHONE) ? null : error['PHONE'] = '10 Hane giriniz' : error['PHONE'] = 'Boş geçilemez'
        FIRST_NAME ? null : error['FIRST_NAME'] = 'Boş geçilemez'
        LAST_NAME ? null : error['LAST_NAME'] = 'Boş geçilemez'
        this.setState({ error })
        if (Object.keys(error).length > 0) {
            return
        }
        PHONE = `0${validationManager.makePhone(PHONE)}`
    }

    renderPersonal = () => {
        return (
            <React.Fragment>
                <FormRow label="Ad" errorMessage={this.state.error['FIRST_NAME']}>
                    <Input
                        editable={this.state.EDITING}
                        placeholder="Ad"
                        value={this.state.FIRST_NAME}
                        onChangeText={FIRST_NAME => this.setState({ FIRST_NAME })} />
                </FormRow>
                <FormRow label="Soyad" errorMessage={this.state.error['LAST_NAME']}>
                    <Input
                        editable={this.state.EDITING}
                        placeholder="Soyad"
                        value={this.state.LAST_NAME}
                        onChangeText={LAST_NAME => this.setState({ LAST_NAME })} />
                </FormRow>
                <FormRow label="Telefon" errorMessage={this.state.error['PHONE']}>
                    <PhoneInput
                        disabled={!this.state.EDITING}
                        value={this.state.PHONE}
                        onChange={e => this.setState({ PHONE: e.target.value })}
                    />
                </FormRow>
                <FormRow label="Email" errorMessage={this.state.error['Email']}>
                    <Input
                        editable={this.state.EDITING}
                        placeholder="Email"
                        value={this.state.EMAIL}
                        onChangeText={EMAIL => this.setState({ EMAIL })} />
                </FormRow>
                <FormRow label="Adres">
                    <Input
                        editable={this.state.EDITING}
                        placeholder="Adres"
                        value={this.state.ADDRESS}
                        multiline
                        numberOfLines={4}
                        onChangeText={ADDRESS => this.setState({ ADDRESS })} />
                </FormRow>
                {this.state.EDITING ? (
                    <>
                        <Button
                            loading={this.state.loading}
                            style={[styles.button, { backgroundColor: theme.colors.primary }]}
                            textStyle={[styles.text]}
                            onPress={this.savePersonalChangesAsync}>
                            Kaydet
                            </Button>
                        <Button
                            loading={this.state.loading}
                            style={[styles.button, { backgroundColor: theme.colors.border }]}
                            textStyle={[styles.text]}
                            onPress={() => this.setState({ EDITING: false, FORM: 1 })}>
                            Vazgeç
                        </Button>
                    </>
                ) : (
                        <Button
                            loading={this.state.loading}
                            style={[styles.button]}
                            textStyle={[styles.text]}
                            onPress={() => this.setState({ EDITING: true })}>
                            Düzenle
                        </Button>
                    )}

            </React.Fragment>
        )
    }

    savePrivateChangesAsync = async () => {

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
                            onPress={() => this.setState({ EDITING: true, FORM: 2 })}>
                            Kişisel Bilgileri Düzenle
                        </Button>
                    )}
            </React.Fragment>
        )
    }

    render() {
        return (
            <Layout style={{ flex: 1, paddingHorizontal: 10 }}>
                <ScrollView style={{ height: height - 70 }}>
                    <FormRow label="Üyelik Tarihi">
                        <Input
                            editable={false}
                            value={applicationManager.formatDate(this.state.CREATED_DATE)}
                        />
                    </FormRow>
                    {this.state.FORM === 1 ? this.renderPrivate() : this.renderPersonal()}
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