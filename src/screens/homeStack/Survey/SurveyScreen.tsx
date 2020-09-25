import React from 'react'
import { Layout, Text, View } from 'components'
import { StyleSheet, ScrollView } from 'react-native'
import { dataManager } from 'api'
import { Emoji } from './Emoji'
import theme from 'theme'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { configurationManager, messageBox, userManager } from 'utils'
interface Props {

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
}

const components = {
    'emoji': Emoji
}

export class SurveyScreen extends React.PureComponent<Props, State> {

    state: State = {
        loading: false,
        theme: '',
        items: [],
        canSend: true
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
        let items = this.state.items.filter(x => x.VALUE > 0).map(x => {
            return {
                VALUE: x.VALUE,
                ID: x.ID
            }
        });
        this.setState({ loading: true })
        const result = await dataManager.sendAnswerAsync(items)
        if (result.statusCode === 200 && result.data) {
            let __data__ = result.data[0] as { ID: string, token: string, NEW_RECORD: boolean, PASSWORD: string, STOREID: string }
            if (__data__.NEW_RECORD) {
                userManager.set({
                    ID: __data__.ID,
                    PASSWORD: __data__.PASSWORD,
                    STOREID: __data__.STOREID,
                    token: __data__.token,
                    USERNAME: ''
                })
            } else {

            }
            messageBox('Anketimize katıldığınız için teşekkür ederiz. :)')
        } else {
            messageBox('Sunucularımızda yoğunluktan ötürü hata meydana geldi lütfen daha sonra tekrar deneyiniz')
        }
        this.setState({ loading: false, canSend: false })

    }

    render() {
        return (
            <Layout loading={this.state.loading}
                style={[styles.container]}>
                <ScrollView>
                    {this.state.items.map((x, i) => this.renderItem(x, i))}
                </ScrollView>
                { this.state.canSend && (
                    <TouchableOpacity style={{
                        backgroundColor: theme.colors.background,
                        height: 50,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }} onPress={this.sendAnswersAsync}>
                        <Text>Gönder</Text>
                    </TouchableOpacity>
                )}
            </Layout>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.card
        //alignItems: 'center',
        //justifyContent: 'center'
    },
})