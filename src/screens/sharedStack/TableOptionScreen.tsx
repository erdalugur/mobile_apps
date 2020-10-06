import { dataManager } from 'api'
import { Button, Layout, Text } from 'components'
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { NavigationProps, TransactionStatusType, TransactionStatus } from 'types'
import { messageBox } from 'utils'

interface Props extends NavigationProps<{
    item: string
    items: Array<string>
}, any> {

}
export class TableOptionScreen extends React.PureComponent<Props, any>{

    sendStatusAsync = async (status: number) => {
        let items = this.props.route.params.items.map(x => {
            return {
                ID: x
            }
        })

        let result = await dataManager.updateWaitingAsync(status, items)
        if (result.statusCode === 200) {

            messageBox('işlem başarıyla gerçekleşti');
            if (status === 3) {
                this.setState({ loading: true })
                setTimeout(() => {
                    this.props.navigation.goBack();
                }, 1000);
            }
        }
    }
    render() {
        return (
            <Layout style={[styles.container]}>
                <ScrollView>
                    <Button style={[styles.button]} textStyle={[styles.text]}>Birleşim</Button>
                    <Button style={[styles.button]} textStyle={[styles.text]}>Transfer</Button>
                    <Button style={[styles.button]} textStyle={[styles.text]} onPress={() => this.sendStatusAsync(TransactionStatus.lost)}>Zayi</Button>
                    <Button style={[styles.button]} textStyle={[styles.text]}>İndirim</Button>
                    <Button style={[styles.button]} textStyle={[styles.text]} onPress={() => this.sendStatusAsync(TransactionStatus.cancel)}>İptal</Button>
                    <Button style={[styles.button]} textStyle={[styles.text]} onPress={() => this.sendStatusAsync(TransactionStatus.gift)}>İkram</Button>
                </ScrollView>
            </Layout>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    button: {
        marginBottom: 10
    },
    text: { fontWeight: 'bold' }
})