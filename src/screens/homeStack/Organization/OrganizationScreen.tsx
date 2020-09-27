import React from 'react'
import { Button, Input, Layout, Text, TicketOne, TicketTwo, View } from 'components'
import { StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Dimensions } from 'react-native'
import theme from 'theme'
import { messageBox } from 'utils'
import { dataManager } from 'api'
import { NavigationProps, TicketItemProps } from 'types'
import { screens } from 'navigation'

const { width, height } = Dimensions.get('window')

interface Props extends NavigationProps<any, any> {

}


const themes: { [key: string]: any } = {
    1: TicketOne,
    2: TicketTwo
}

interface State {
    loading: boolean
    items: Array<TicketItemProps>
    error: { [key: string]: string }
}
export class OrganizationScreen extends React.PureComponent<Props, State> {

    state: State = {
        loading: false,
        items: [],
        error: {}
    }

    componentDidMount = async () => {
        this.loadAsync();
    }

    loadAsync = async () => {
        this.setState({ loading: true })

        const result = await dataManager.loadOrganizations(1);
        if (result.statusCode === 200 && result.data) {
            this.setState({ items: result.data, loading: false })
        } else {
            this.setState({ loading: false })
        }
    }

    renderItem = (x: TicketItemProps) => {
        x.THEME_NO = x.THEME_NO || 1;
        let Component = themes[x.THEME_NO]
        return (
            <Component
                key={x.ID}
                onPress={() => this.props.navigation.navigate(screens.activityRequestScreen, { ID: x.ID, NAME: x.NAME })}
                {...x}
            />
        )
    }

    render() {
        return (
            <Layout style={[styles.container]} loading={this.state.loading}>
                {this.state.items.length > 0 ? (
                    <ScrollView>
                        {this.state.items.map(x => this.renderItem(x))}
                    </ScrollView>
                ) : (
                        <Text>Henüz sunabileceğimiz organizasyon bulunmuyor.</Text>
                    )}
            </Layout>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxHeight: height - 70
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
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        position: 'absolute',
        width: '100%',
        top: '50%',
        fontWeight: 'bold'
    },
})