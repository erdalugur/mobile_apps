import { Button, Layout, Text } from 'components'
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { NavigationProps } from 'types'

interface Props extends NavigationProps<{
    item: string
}, any> {

}
export class TableOptionScreen extends React.PureComponent<Props, any>{
    render() {
        return (
            <Layout style={[styles.container]}>
                <ScrollView>
                    <Button style={[styles.button]} textStyle={[styles.text]}>Birleşim</Button>
                    <Button style={[styles.button]} textStyle={[styles.text]}>Transfer</Button>
                    <Button style={[styles.button]} textStyle={[styles.text]}>Zayi</Button>
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