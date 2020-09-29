import React from 'react'
import { Button, Input, Layout, Text, View } from 'components'
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import theme from 'theme'
import { messageBox } from 'utils'
import { ContactRequestProps } from 'types'



interface State extends ContactRequestProps {
    error: { [key: string]: string }
}

interface Props {
    submit: (data: State) => void
    loading: boolean
    resetForm: boolean
}
export class ContactRequestForm extends React.PureComponent<Props, State> {

    state: State = {
        REQUESTID: 0,
        FIRST_NAME: '',
        LAST_NAME: '',
        NOTE: '',
        PAX: '',
        PHONE: '',
        REQUEST_DATE: '',
        REQUEST_TIME: '',
        REQUEST_TYPE: '',
        error: {}
    }

    makeRequestAsync = async () => {
        let { FIRST_NAME, LAST_NAME, REQUEST_DATE, PAX, REQUEST_TIME, PHONE } = this.state, error = {} as { [key: string]: string }
        PHONE ? null : error['PHONE'] = 'Boş geçilemez'
        FIRST_NAME ? null : error['FIRST_NAME'] = 'Boş geçilemez'
        LAST_NAME ? null : error['LAST_NAME'] = 'Boş geçilemez'
        PAX ? null : error['pax'] = 'Boş geçilemez'
        REQUEST_DATE ? null : error['REQUEST_DATE'] = 'Boş geçilemez'
        REQUEST_TIME ? null : error['REQUEST_TIME'] = 'Boş geçilemez'
        this.setState({ error })
        if (Object.keys(error).length > 0) {
            return
        }
        this.props.submit(this.state)
    }

    componentDidUpdate = (prevProps: Props) => {
        if (prevProps.resetForm !== this.props.resetForm) {
            this.setState({
                FIRST_NAME: '',
                LAST_NAME: '',
                NOTE: '',
                PAX: '',
                PHONE: '',
                REQUESTID: 0,
                REQUEST_DATE: '',
                REQUEST_TIME: '',
                REQUEST_TYPE: '',
                error: {}
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <View style={[styles.infoRow]}>
                    <Input
                        placeholder="Tarih"
                        value={this.state.REQUEST_DATE}
                        onChangeText={REQUEST_DATE => this.setState({ REQUEST_DATE })} />
                    {this.state.error['REQUEST_DATE'] && <Text style={{ marginLeft: 5, color: 'red' }}>Boş Geçilemez</Text>}
                </View>
                <View style={[styles.infoRow]}>
                    <Input
                        placeholder="Saat"
                        value={this.state.REQUEST_TIME}
                        onChangeText={REQUEST_TIME => this.setState({ REQUEST_TIME })} />
                    {this.state.error['REQUEST_TIME'] && <Text style={{ marginLeft: 5, color: 'red' }}>Boş Geçilemez</Text>}
                </View>
                <View style={[styles.infoRow]}>
                    <Input
                        placeholder="Ad"
                        value={this.state.FIRST_NAME}
                        onChangeText={FIRST_NAME => this.setState({ FIRST_NAME })} />
                    {this.state.error['FIRST_NAME'] && <Text style={{ marginLeft: 5, color: 'red' }}>Boş Geçilemez</Text>}
                </View>
                <View style={[styles.infoRow]}>
                    <Input
                        placeholder="Soyad"
                        value={this.state.LAST_NAME}
                        onChangeText={LAST_NAME => this.setState({ LAST_NAME })} />
                    {this.state.error['LAST_NAME'] && <Text style={{ marginLeft: 5, color: 'red' }}>Boş Geçilemez</Text>}
                </View>
                <View style={[styles.infoRow]}>
                    <Input
                        placeholder="Telefon"
                        value={this.state.PHONE}
                        onChangeText={PHONE => this.setState({ PHONE })} />
                    {this.state.error['PHONE'] && <Text style={{ marginLeft: 5, color: 'red' }}>Boş Geçilemez</Text>}
                </View>
                <View style={[styles.infoRow]}>
                    <Input
                        placeholder="Kişi Sayısı"
                        value={this.state.PAX}
                        keyboardType="number-pad"
                        onChangeText={PAX => this.setState({ PAX })} />
                    {this.state.error['PAX'] && <Text style={{ marginLeft: 5, color: 'red' }}>Boş Geçilemez</Text>}
                </View>
                <View style={[styles.infoRow]}>
                    <Input
                        placeholder="Ekstra Not"
                        value={this.state.NOTE}
                        multiline
                        numberOfLines={4}
                        onChangeText={NOTE => this.setState({ NOTE })} />
                </View>
                <Button
                    loading={this.props.loading}
                    style={[styles.button]}
                    textStyle={[styles.text]}
                    onPress={this.makeRequestAsync}>
                    Gönder
                </Button>
            </React.Fragment>
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