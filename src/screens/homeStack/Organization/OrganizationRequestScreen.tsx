import React from 'react'
import { Button, ContactRequestForm, Input, Layout, Text, View } from 'components'
import { StyleSheet, Dimensions } from 'react-native'
import theme from 'theme'
import { messageBox } from 'utils'
import { ContactRequestProps, NavigationProps } from 'types'
import { dataManager } from 'api'

const { height } = Dimensions.get('window')

interface Props extends NavigationProps<{
    ID: number
    NAME: string
}, any> { }

interface State {
    loading: boolean
    resetForm: boolean
}
export class OrganizationRequestScreen extends React.PureComponent<Props, State> {

    state: State = {
        loading: false,
        resetForm: false
    }

    makeRequestAsync = async (data: ContactRequestProps) => {
        data.REQUEST_TYPE = ''
        data.REQUESTID = this.props.route.params.ID
        this.setState({ loading: true });
        const result = await dataManager.makeRequest(data);
        if (result.statusCode === 200) {
            messageBox('Talebiliniz alınmıştır en kısa sürede sizinle iletişime geçilecektir.')
            this.setState({ resetForm: true, loading: false })
        } else {
            this.setState({ loading: false, resetForm: true })
        }
    }

    render() {
        return (
            <Layout style={[styles.container]}>
                <ContactRequestForm
                    resetForm={this.state.resetForm}
                    loading={this.state.loading}
                    submit={(data) => this.makeRequestAsync(data)}
                />
            </Layout>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.card,
        height: height - 80
    },
    infoRow: { borderColor: theme.colors.border, borderBottomWidth: 1, marginTop: 10 },
    button: {
        backgroundColor: theme.colors.background,
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    text: {
        fontWeight: 'bold'
    }
})