import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import {
    HomeScreen,
    CartScreen,
    CategoryScreen,
    ProductScreen,
    TablesScreen,
    PaymentScreen,
    AdditionScreen,
    CartQRScreen,
    CartResultScreen,
    ProductNoteScreen,
    ProfileScreen
} from 'screens'

import {
    HomeOptions,
    CartOptions,
    ProductNoteOptions, SurveyOptions
} from '../../navigation/options'
import { CartButton, DrawerIcon, View } from 'components'
import theme from 'theme';
import { Activity, Close, HeaderBack, HeartBeat, Menu, Form, Star, Survey, User } from 'icons'
import { screens } from 'navigation'
import LoginGuestScreen from './Auth/LoginGuestScreen';
import RegisterGuestScreen from './Auth/RegisterGuestScreen';
import { StackActions } from '@react-navigation/native';
import { HomeTabs } from 'navigation/home';
import { configurationManager, userManager } from 'utils';
import { CampaignStackScreen } from './Campaign';
import { ActivityStackScreen } from './Activity';
import { OrganizationStackScreen } from './Organization';
import { ReservationStackScreen } from './Reservation';
import { SurveyStackScreen } from './Survey';
import { ProfileStackScreen } from 'screens/profileStack';

export const HomeStack = createStackNavigator();

export const HomeStackScreen = (props: any) => {
    let options: any = {}
    if (props.route.state) {
        options.tabBarVisible = props.route.state.index > 0 ? false : true
    }
    props.navigation.setOptions({
        ...options
    })

    return (
        <HomeStack.Navigator
            headerMode="screen"
            screenOptions={{
                headerRight: ({ tintColor }: any) => (
                    <CartButton />
                ),
                headerBackTitleVisible: false,
                headerBackTitleStyle: { color: theme.colors.text },
                headerBackImage: ({ tintColor }: any) => <HeaderBack />
            }}>
            <HomeStack.Screen
                options={{
                    headerLeft: ({ }) => (
                        <DrawerIcon {...props} />
                    ),
                }}
                name={screens.home}
                component={HomeScreen} />
            <HomeStack.Screen
                options={CartOptions}
                name={screens.cart}
                component={CartScreen}
            />
            <HomeStack.Screen
                options={{
                    gestureEnabled: false,
                    headerBackImage: () => null,
                    title: 'Sonuç'
                }}
                name={screens.cartResult}
                component={CartResultScreen}
            />
            <HomeStack.Screen
                options={{
                    title: 'Kategoriler'
                }}
                name={screens.category}
                component={CategoryScreen}
            />
            <HomeStack.Screen
                options={{
                    title: '',
                    headerStyle: {
                        backgroundColor: 'transparent'
                    },
                    header: () => null
                }}
                name={screens.product}
                component={ProductScreen}
            />
            <HomeStack.Screen
                options={{
                    title: 'Qr',

                }}
                name={screens.cartQR}
                component={CartQRScreen}
            />
            <HomeStack.Screen
                options={{
                    header: () => null
                }}
                name={screens.loginGuest}
                component={LoginGuestScreen}
            />
            <HomeStack.Screen
                options={{
                    header: () => null
                }}
                name={screens.registerGuest}
                component={RegisterGuestScreen}
            />
            <HomeStack.Screen
                options={{
                    title: 'Masalar'
                }}
                name={screens.tables}
                component={TablesScreen}
            />

            <HomeStack.Screen
                options={{
                    title: 'Adisyon'
                }}
                name={screens.addition}
                component={AdditionScreen}
            />

            <HomeStack.Screen
                options={{
                    title: 'Ödeme Al'
                }}
                name={screens.payment}
                component={PaymentScreen}
            />
            <HomeStack.Screen
                options={ProductNoteOptions}
                name={screens.noteScreen}
                component={ProductNoteScreen}
            />

        </HomeStack.Navigator>
    )
}


interface DrawerState {
    USE_GUEST_MODULE: boolean,
    USE_CAMPAIGN_MODULE: boolean,
    USE_ORGANIZATION_MODULE: boolean,
    USE_SURVEY_MODULE: boolean,
    USE_ACTIVITY_MODULE: boolean,
    USE_RESERVATION_MODULE: boolean
    isAuthenticated: boolean
    navigation: any
    loginAction: () => void
}
const Drawer = createDrawerNavigator();

export class DrawerApp extends React.PureComponent<any, any>{
    state: any = {
        USE_GUEST_MODULE: false,
        USE_CAMPAIGN_MODULE: false,
        USE_ORGANIZATION_MODULE: false,
        USE_SURVEY_MODULE: false,
        USE_ACTIVITY_MODULE: false,
        USE_RESERVATION_MODULE: false,
        isAuthenticated: false,
    }
    componentDidMount = async () => {
        let place = await configurationManager.getPlace();
        let isAuthenticated = await userManager.isAuthenticated();

        this.setState({ ...place, isAuthenticated: isAuthenticated })
    }

    loginAction = () => {
        this.props.navigation.dispatch(
            StackActions.replace(screens.home)
        )
    }

    render() {

        return (
            <DrawerContent {...Object.assign({}, this.state, this.props.navigation, { loginAction: this.loginAction })} />
        );
    }
}



export const DrawerContent = (props: DrawerState) => {
    const {
        USE_GUEST_MODULE,
        USE_CAMPAIGN_MODULE,
        USE_ORGANIZATION_MODULE,
        USE_SURVEY_MODULE,
        USE_ACTIVITY_MODULE,
        USE_RESERVATION_MODULE,
        isAuthenticated
    } = props

    const loginAction = () => {
        const resetAction = StackActions.popToTop();
        props.navigation.dispatch(resetAction);
    }
    return (
        <Drawer.Navigator
            drawerType="front"
            gestureHandlerProps={{
                enabled: false
            }}
            drawerContentOptions={{

            }}
        >
            <Drawer.Screen options={{
                drawerLabel: 'Menü',
                drawerIcon: ({ }) => <Menu size={20} color={theme.colors.white} />
            }} name={screens.home} component={HomeTabs} />
            {USE_CAMPAIGN_MODULE && (
                <Drawer.Screen
                    options={{
                        title: 'Kampanyalar',
                        drawerIcon: ({ }) => <Star size={20} color={theme.colors.white} />
                    }}
                    name={screens.campaignScreen}
                    component={CampaignStackScreen}
                />
            )}
            {USE_ACTIVITY_MODULE && (
                <Drawer.Screen
                    options={{
                        title: 'Etkinlikler',
                        drawerLabel: 'Etkinlikler',
                        drawerIcon: ({ }) => <Activity size={20} color={theme.colors.white} />
                    }}
                    name={screens.activityScreen}
                    component={ActivityStackScreen}
                />)}
            {USE_ORGANIZATION_MODULE && (
                <Drawer.Screen
                    options={{
                        title: 'Organizasyonlar',
                        drawerIcon: ({ }) => <HeartBeat size={20} color={theme.colors.white} />
                    }}
                    name={screens.organizatonScreen}
                    component={OrganizationStackScreen}
                />
            )}
            {USE_RESERVATION_MODULE && (
                <Drawer.Screen
                    options={{
                        title: 'Rezervasyon Al',
                        drawerIcon: ({ }) => <Form size={20} color={theme.colors.white} />
                    }}
                    name={screens.reservationRequestScreen}
                    component={ReservationStackScreen}
                />
            )}
            {USE_SURVEY_MODULE && (
                <Drawer.Screen
                    options={{
                        title: 'Anket',
                        drawerIcon: ({ }) => <Survey size={20} color={theme.colors.white} />
                    }}
                    name={screens.surveyScreen}
                    component={SurveyStackScreen}
                />
            )}
            {USE_GUEST_MODULE && isAuthenticated && (
                <Drawer.Screen
                    options={{
                        title: 'Hesabım',
                        drawerIcon: ({ }) => <User size={20} color={theme.colors.white} />
                    }}
                    name={screens.profileNavigation}
                    component={ProfileStackScreen}
                />
            )}
            {USE_GUEST_MODULE && !isAuthenticated && (
                <Drawer.Screen
                    name={screens.loginGuest}
                    component={LoginGuestScreen}
                    initialParams={{
                        action: props.loginAction
                    }}
                    options={{
                        title: 'Giriş Yap',
                        drawerIcon: ({ }) => <User size={20} color={theme.colors.white} />
                    }}
                />
            )}
        </Drawer.Navigator>
    )
}