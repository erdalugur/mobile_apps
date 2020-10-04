import React from 'react'
import { Button, Input } from 'components'
import { StyleSheet, ScrollView, Dimensions } from 'react-native'
import theme from 'theme'
import { NavigationProps } from 'types'
import { FormRow, PhoneInput, Layout } from 'components'
import { messageBox, validationManager } from 'utils'
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

interface Props extends NavigationProps<any, any> {

}
export class PersonalInfoScreen extends React.PureComponent<Props, State> {

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
        EDITING: true,
        FORM: 1,
        PASSWORD: ''
    }

    componentDidMount = () => {
        this.loadAsync();
    }

    loadAsync = async () => {
        let userDetail = await dataManager.loadUserAsync();
        if (userDetail.statusCode === 200 && userDetail.data) {
            this.setState({
                ...userDetail.data[0],
                loading: false
            })
        }
    }

    savePersonalChangesAsync = async () => {
        let { FIRST_NAME, LAST_NAME, EMAIL, ADDRESS, PHONE } = this.state, error = {} as { [key: string]: string }
        PHONE ? validationManager.checkPhone(PHONE) ? null : error['PHONE'] = '10 Hane giriniz' : error['PHONE'] = 'Boş geçilemez'
        FIRST_NAME ? null : error['FIRST_NAME'] = 'Boş geçilemez'
        LAST_NAME ? null : error['LAST_NAME'] = 'Boş geçilemez'
        this.setState({ error })
        if (Object.keys(error).length > 0) {
            return
        }
        PHONE = validationManager.makePhone(PHONE)
        this.setState({ loading: true })
        let result = await dataManager.updateUserDetailAsync({
            ADDRESS,
            EMAIL,
            PHONE,
            FIRST_NAME,
            LAST_NAME
        });
        if (result.statusCode === 200) {
            this.setState({ loading: false })
            messageBox('İşlem başarıyla gerçekleşti')
        } else {
            this.setState({ loading: false })
            messageBox('İşlem sırasında hata meydana geldi')
        }
    }

    render() {
        return (
            <Layout style={{ flex: 1, paddingHorizontal: 10 }}>
                <ScrollView style={{ height: height - 70 }}>
                    <React.Fragment>
                        <FormRow label="Ad" errorMessage={this.state.error['FIRST_NAME']}>
                            <Input
                                placeholder="Ad"
                                value={this.state.FIRST_NAME}
                                onChangeText={FIRST_NAME => this.setState({ FIRST_NAME })} />
                        </FormRow>
                        <FormRow label="Soyad" errorMessage={this.state.error['LAST_NAME']}>
                            <Input
                                placeholder="Soyad"
                                value={this.state.LAST_NAME}
                                onChangeText={LAST_NAME => this.setState({ LAST_NAME })} />
                        </FormRow>
                        <FormRow label="Telefon" errorMessage={this.state.error['PHONE']}>
                            <PhoneInput
                                value={this.state.PHONE}
                                onChange={e => this.setState({ PHONE: e.target.value })}
                            />
                        </FormRow>
                        <FormRow label="Email" errorMessage={this.state.error['Email']}>
                            <Input
                                placeholder="Email"
                                value={this.state.EMAIL}
                                onChangeText={EMAIL => this.setState({ EMAIL })} />
                        </FormRow>
                        <FormRow label="Adres">
                            <Input
                                placeholder="Adres"
                                value={this.state.ADDRESS}
                                multiline
                                numberOfLines={4}
                                onChangeText={ADDRESS => this.setState({ ADDRESS })} />
                        </FormRow>
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
                            onPress={() => this.props.navigation.goBack()}>
                            Vazgeç
                        </Button>

                    </React.Fragment>
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