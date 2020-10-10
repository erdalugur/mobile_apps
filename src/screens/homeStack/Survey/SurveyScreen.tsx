import React from 'react'
import { Button, FormRow, Input, Layout, PhoneInput, Text, View } from 'components'
import { StyleSheet, ScrollView, Dimensions } from 'react-native'
import { dataManager } from 'api'
import { Emoji } from './Emoji'
import theme from 'theme'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { applicationManager, configurationManager, messageBox, userManager, validationManager } from 'utils'
import { constands } from 'constands'
import { debug } from 'react-native-reanimated'
import { connect } from 'react-redux'
import { actionTypes, IAction } from 'myRedux/types'
import { NavigationProps } from 'types'
import { StackActions } from '@react-navigation/native'
import { screens } from 'navigation'
const { height } = Dimensions.get('window')
interface Props extends NavigationProps<any, any> {
    dispatch: (param: IAction<any>) => void
}

interface ItemProps {
    ID: number
    NAME: string
    TYPE: 'emoji'
    VALUE: number
}

interface State {
    loading: boolean
    theme: string
    items: Array<ItemProps>
    canSend: boolean
    step: '1' | '0' | '2',
    firstName: string,
    lastName: string
    phone: string
    error: { [key: string]: string }
}

const components = {
    'emoji': Emoji
}

class Index extends React.PureComponent<Props, State> {

    state: State = {
        loading: false,
        theme: '',
        items: [],
        canSend: false,
        step: '0',
        firstName: '',
        lastName: '',
        error: {},
        phone: ''
    }

    componentDidMount = async () => {
        this.loadAsync();
    }

    loadAsync = async () => {
        this.setState({ loading: true })
        let result = await dataManager.loadSurveyAsync();
        if (result.statusCode === 200 && result.data) {
            this.setState({ loading: false, items: result.data })
        } else {
            this.setState({ loading: false })
        }
    }

    handlePress = (value: number, index: number) => {
        this.setState((state: State) => {
            state.items[index].VALUE = value
            let canSend = state.items.filter(x => x.VALUE === 0).length === 0
            return {
                items: [...state.items],
                canSend: canSend
            }
        })
    }

    renderItem = (x: ItemProps, index: number) => {
        let Component = components[x.TYPE]
        return (
            <Component
                value={x.VALUE}
                key={x.ID}
                question={x.NAME}
                onPress={(value) => {
                    this.handlePress(value, index)
                }}
            />
        )
    }

    sendAnswersAsync = async () => {
        let user = await userManager.get();
        if (user === null && this.state.step === '0') {
            this.setState({ step: '1' });
            return
        }

        if (user === null) {
            let errors = {} as { [key: string]: string }
            this.state.firstName ? null : (errors['firstName'] = 'firstName')
            this.state.lastName ? null : (errors['lastName'] = 'lastName')
            this.state.phone ? null : (errors['phone'] = 'phone')

            this.setState({ error: errors })
            if (Object.keys(errors).length > 0) {
                return
            }
        }
        let items = this.state.items.filter(x => x.VALUE > 0).map(x => {
            return {
                VALUE: x.VALUE,
                ID: x.ID
            }
        });
        this.setState({ loading: true })
        let phone = validationManager.makePhone(this.state.phone)
        const result = await dataManager.sendAnswerAsync(
            items,
            this.state.firstName,
            this.state.lastName,
            phone)
        if (result.statusCode === 200 && result.data) {
            let __data__ = result.data[0] as { ID: string, token: string, NEW_RECORD: boolean, PASSWORD: string, STOREID: string }
            if (__data__.NEW_RECORD && user === null) {
                userManager.set({
                    ID: __data__.ID,
                    PASSWORD: __data__.PASSWORD,
                    STOREID: __data__.STOREID,
                    token: __data__.token,
                    USERNAME: phone
                })
                this.props.dispatch({ type: actionTypes.SIGN_IN, payload: { token: __data__.token } })
                this.props.navigation.dispatch(StackActions.replace(screens.homeTabs, { value: true }))
            } else {

            }

            messageBox('Anketimize katıldığınız için teşekkür ederiz. :)')
            this.setState({ loading: false, canSend: false, firstName: '', lastName: '', step: '2' })

        } else {
            messageBox('Sunucularımızda yoğunluktan ötürü hata meydana geldi lütfen daha sonra tekrar deneyiniz')
            this.setState({ loading: false, canSend: false, firstName: '', lastName: '' })

        }
    }

    renderStepOne = () => {
        if (this.state.step === '2') return null

        return (
            <View transparent style={{ paddingHorizontal: 20 }}>
                <FormRow errorMessage={this.state.error['firstName']} label="Ad">
                    <Input
                        placeholder="Ad"
                        value={this.state.firstName}
                        onChangeText={firstName => this.setState({ firstName })} />
                </FormRow>
                <FormRow label="Soyad" errorMessage={this.state.error['lastName']}>
                    <Input
                        placeholder="Soyad"
                        value={this.state.lastName}
                        onChangeText={lastName => this.setState({ lastName })} />
                </FormRow>
                <FormRow label="Telefon" errorMessage={this.state.error['phone']}>
                    <PhoneInput
                        placeholder="Telefon"
                        value={this.state.phone}
                        onChange={e => this.setState({ phone: e.target.value })} />
                </FormRow>
                {this.state.step === '1' && (
                    <Button textStyle={{ fontWeight: 'bold' }} style={{
                        marginTop: 10
                    }} onPress={this.sendAnswersAsync}>
                        Gönder
                    </Button>
                )}
            </View>
        )
    }

    render() {
        return (
            <Layout loading={this.state.loading}
                style={[styles.container]}>
                { this.state.step === '0' ? (
                    <ScrollView>
                        {this.state.items.map((x, i) => this.renderItem(x, i))}
                        {this.state.canSend && (
                            <Button textStyle={{ fontWeight: 'bold' }} style={{
                                marginTop: 10
                            }} onPress={this.sendAnswersAsync}>
                                Gönder
                            </Button>
                        )}
                    </ScrollView>
                ) : this.renderStepOne()}
                {this.state.step === '2' && (
                    <View transparent style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <Text>{`Anketimize katıldığınız için teşekkür ederiz ${constands.happyEmoji}`}</Text>
                    </View>
                )}
            </Layout>
        )
    }
}

export const SurveyScreen = connect()(Index)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.card,
        height: height - 80,
    },
    infoRow: { borderColor: theme.colors.border, borderBottomWidth: 1, marginTop: 10 },
    title: {
        marginHorizontal: 10
    }
})