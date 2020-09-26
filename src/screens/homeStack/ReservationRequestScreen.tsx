import React from 'react'
import { Button, ContactRequestForm, Input, Layout, Text, View } from 'components'
import { StyleSheet, TouchableOpacity } from 'react-native'
import theme from 'theme'
import { messageBox } from 'utils'
import { ContactRequestProps } from 'types'
import { dataManager } from 'api'

interface Props { }

interface State {
    loading: boolean
    resetForm: boolean
}
export class ReservationRequestScreen extends React.PureComponent<any, State> {

    state: State = {
        loading: false,
        resetForm: false
    }

    makeRequestAsync = async (data: ContactRequestProps) => {
        data.REQUEST_TYPE = 'RESERVATION'
        this.setState({ loading: true });
        const result = await dataManager.makeRequest(data);
        if (result.statusCode === 200) {
            messageBox('Talebiliniz alınmıştır en kısa sürede sizinle iletişime geçilecektir.')
            this.setState({ resetForm: true, loading: false })
        } else {
            this.setState({ loading: false })
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
        backgroundColor: theme.colors.card
        //alignItems: 'center',
        //justifyContent: 'center'
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