import { Layout, Text, View } from 'components'
import { Activity, Form, HeartBeat, Menu, Star, Survey, User } from 'icons'
import { screens } from 'navigation'
import React from 'react'
import { TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import theme from 'theme'
import { NavigationProps, PlaceModel } from 'types'
import { configurationManager } from 'utils'

interface Props extends NavigationProps<any, any> {

}

interface State {
    USE_GUEST_MODULE: boolean,
    USE_CAMPAIGN_MODULE: boolean,
    USE_ORGANIZATION_MODULE: boolean,
    USE_SURVEY_MODULE: boolean,
    USE_ACTIVITY_MODULE: boolean,
    USE_RESERVATION_MODULE: boolean
}
export class NavigationScreen extends React.PureComponent<Props, any> {
    state: State = {
        USE_GUEST_MODULE: false,
        USE_CAMPAIGN_MODULE: false,
        USE_ORGANIZATION_MODULE: false,
        USE_SURVEY_MODULE: false,
        USE_ACTIVITY_MODULE: false,
        USE_RESERVATION_MODULE: false
    }
    componentDidMount = async () => {
        let place = await configurationManager.getPlace();
        this.props.navigation.setOptions({
            title: place?.NAME
        })
        this.setState({ ...place })
    }
    render() {
        const {
            USE_GUEST_MODULE,
            USE_CAMPAIGN_MODULE,
            USE_ORGANIZATION_MODULE,
            USE_SURVEY_MODULE,
            USE_ACTIVITY_MODULE,
            USE_RESERVATION_MODULE
        } = this.state
        return (
            <Layout style={{ flex: 1, height: '100%' }}>
                <ScrollView>
                    <View style={[styles.buttonItem]}>
                        <TouchableOpacity style={[styles.button]} onPress={() => this.props.navigation.goBack()}>
                            <Menu size={20} color={theme.colors.white} />
                            <Text style={[styles.text]}>Menu</Text>
                        </TouchableOpacity>
                    </View>
                    {USE_CAMPAIGN_MODULE && (
                        <View style={[styles.buttonItem]}>
                            <TouchableOpacity style={[styles.button]} onPress={() => this.props.navigation.navigate(screens.campaignScreen)}>
                                <Star size={20} color={theme.colors.white} />
                                <Text style={[styles.text]}>Kampanyalar</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {USE_ACTIVITY_MODULE && (
                        <View style={[styles.buttonItem]}>
                            <TouchableOpacity style={[styles.button]} onPress={() => this.props.navigation.navigate(screens.activityScreen)}>
                                <Activity size={20} color={theme.colors.white} />
                                <Text style={[styles.text]}>Etkinlikler</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {USE_ORGANIZATION_MODULE && (
                        <View style={[styles.buttonItem]}>
                            <TouchableOpacity style={[styles.button]} onPress={() => this.props.navigation.navigate(screens.organizatonScreen)}>
                                <HeartBeat size={20} color={theme.colors.white} />
                                <Text style={[styles.text]}>Organizasyonlar</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {USE_RESERVATION_MODULE && (
                        <View style={[styles.buttonItem]}>
                            <TouchableOpacity style={[styles.button]} onPress={() => this.props.navigation.navigate(screens.reservationRequestScreen)}>
                                <Form size={20} color={theme.colors.white} />
                                <Text style={[styles.text]}>Rezervasyon Al</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {USE_SURVEY_MODULE && (
                        <View style={[styles.buttonItem]}>
                            <TouchableOpacity style={[styles.button]} onPress={() => this.props.navigation.navigate(screens.surveyScreen)}>
                                <Survey size={20} color={theme.colors.white} />
                                <Text style={[styles.text]}>Anket</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {USE_GUEST_MODULE && (
                        <View style={[styles.buttonItem]}>
                            <TouchableOpacity style={[styles.button]} onPress={() => this.props.navigation.navigate(screens.profileNavigation)}>
                                <User size={20} color={theme.colors.white} />
                                <Text style={[styles.text]}>Hesabım</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
            </Layout>
        )
    }
}

const styles = StyleSheet.create({
    buttonItem: {
        borderBottomColor: theme.colors.border,
        borderBottomWidth: 1,
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 5,
        paddingVertical: 10
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    text: {
        marginHorizontal: 10,
        fontSize: 14
    }
})