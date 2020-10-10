import { Layout, MenuItem } from 'components'
import { Activity, Form, HeartBeat, Menu, Star, Survey, User } from 'icons'
import { screens } from 'navigation'
import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import theme from 'theme'
import { NavigationProps, PlaceModel } from 'types'
import { configurationManager, userManager } from 'utils'
import { StackActions } from '@react-navigation/native';

interface Props extends NavigationProps<any, any> {

}

interface State {
    USE_GUEST_MODULE: boolean,
    USE_CAMPAIGN_MODULE: boolean,
    USE_ORGANIZATION_MODULE: boolean,
    USE_SURVEY_MODULE: boolean,
    USE_ACTIVITY_MODULE: boolean,
    USE_RESERVATION_MODULE: boolean
    isAuthenticated: boolean
}
export class NavigationScreen extends React.PureComponent<Props, any> {
    state: State = {
        USE_GUEST_MODULE: false,
        USE_CAMPAIGN_MODULE: false,
        USE_ORGANIZATION_MODULE: false,
        USE_SURVEY_MODULE: false,
        USE_ACTIVITY_MODULE: false,
        USE_RESERVATION_MODULE: false,
        isAuthenticated: false
    }
    componentDidMount = async () => {
        let place = await configurationManager.getPlace();
        this.props.navigation.setOptions({
            title: place?.NAME
        })
        let isAuthenticated = await userManager.isAuthenticated();

        this.setState({ ...place, isAuthenticated: isAuthenticated })
    }

    loginAction = () => {
        const resetAction = StackActions.popToTop();
        this.props.navigation.dispatch(resetAction);
    }
    render() {
        const {
            USE_GUEST_MODULE,
            USE_CAMPAIGN_MODULE,
            USE_ORGANIZATION_MODULE,
            USE_SURVEY_MODULE,
            USE_ACTIVITY_MODULE,
            USE_RESERVATION_MODULE,
            isAuthenticated
        } = this.state
        return (
            <Layout style={{ flex: 1, height: '100%' }}>
                <ScrollView>
                    <MenuItem
                        label="Menu"
                        onPress={() => this.props.navigation.goBack()}
                        iconComponent={{
                            icon: <Menu size={20} color={theme.colors.white} />
                        }}
                    />
                    {USE_CAMPAIGN_MODULE && (
                        <MenuItem
                            label="Kampanyalar"
                            onPress={() => this.props.navigation.navigate(screens.campaignScreen)}
                            iconComponent={{
                                icon: <Star size={20} color={theme.colors.white} />
                            }}
                        />
                    )}
                    {USE_ACTIVITY_MODULE && (
                        <MenuItem
                            label="Etkinlikler"
                            onPress={() => this.props.navigation.navigate(screens.activityScreen)}
                            iconComponent={{
                                icon: <Activity size={20} color={theme.colors.white} />
                            }}
                        />
                    )}
                    {USE_ORGANIZATION_MODULE && (
                        <MenuItem
                            label="Organizasyonlar"
                            onPress={() => this.props.navigation.navigate(screens.organizatonScreen)}
                            iconComponent={{
                                icon: <HeartBeat size={20} color={theme.colors.white} />
                            }}
                        />
                    )}
                    {USE_RESERVATION_MODULE && (
                        <MenuItem
                            label="Rezervasyon Al"
                            onPress={() => this.props.navigation.navigate(screens.reservationRequestScreen)}
                            iconComponent={{
                                icon: <Form size={20} color={theme.colors.white} />
                            }}
                        />
                    )}
                    {USE_SURVEY_MODULE && (
                        <MenuItem
                            label="Anket"
                            onPress={() => this.props.navigation.navigate(screens.surveyScreen)}
                            iconComponent={{
                                icon: <Survey size={20} color={theme.colors.white} />
                            }}
                        />
                    )}
                    {USE_GUEST_MODULE && isAuthenticated && (
                        <MenuItem
                            label="Hesabım"
                            onPress={() => this.props.navigation.navigate(screens.profileNavigation)}
                            iconComponent={{
                                icon: <User size={20} color={theme.colors.white} />
                            }}
                        />
                    )}
                    {USE_GUEST_MODULE && !isAuthenticated && (
                        <MenuItem
                            label="Giriş Yap"
                            onPress={() => this.props.navigation.navigate(screens.loginGuest, {
                                action: this.loginAction
                            })}
                            iconComponent={{
                                icon: <User size={20} color={theme.colors.white} />
                            }}
                        />
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