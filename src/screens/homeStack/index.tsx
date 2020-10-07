import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Platform, TouchableOpacity } from 'react-native'
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
import { Close, HeaderBack, MoreOption, Survey } from 'icons'
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
}
class CustomDrawerContent extends React.PureComponent<any, any>{
    state: DrawerState = {
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
        console.log(this.props)
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
            <DrawerContentScrollView {...this.props}>
                <DrawerItemList {...this.props as any} />
                <DrawerItem
                    label="Menu"
                    onPress={() => this.props.navigation.navigate(screens.home)}

                />
                {USE_CAMPAIGN_MODULE && (
                    <DrawerItem
                        label="Kampanyalar"
                        onPress={() => this.props.navigation.navigate(screens.campaignScreen)}
                    />
                )}
                {USE_ACTIVITY_MODULE && (
                    <DrawerItem
                        label="Etkinlikler"
                        onPress={() => this.props.navigation.navigate(screens.activityScreen)}
                    />
                )}
                {USE_ORGANIZATION_MODULE && (
                    <DrawerItem
                        label="Organizasyonlar"
                        onPress={() => this.props.navigation.navigate(screens.organizatonScreen)}
                    />
                )}
                {USE_RESERVATION_MODULE && (
                    <DrawerItem
                        label="Rezervasyon Al"
                        onPress={() => this.props.navigation.navigate(screens.reservationRequestScreen)}
                    />
                )}
                {USE_SURVEY_MODULE && (
                    <DrawerItem
                        label="Anket"
                        onPress={() => this.props.navigation.navigate(screens.surveyScreen)}
                    />
                )}
                {USE_GUEST_MODULE && isAuthenticated && (
                    <DrawerItem
                        label="Hesabım"
                        onPress={() => this.props.navigation.navigate(screens.profileNavigation)}
                    />
                )}
                {USE_GUEST_MODULE && !isAuthenticated && (
                    <DrawerItem
                        label="Giriş Yap"
                        onPress={() => this.props.navigation.navigate(screens.loginGuest, {
                            action: this.loginAction
                        })}
                    />
                )}
            </DrawerContentScrollView>
        );
    }
}


const Drawer = createDrawerNavigator();

export const DrawerApp = () => (
    <Drawer.Navigator
        drawerType="front"
        gestureHandlerProps={{
            enabled: false
        }}
        drawerContentOptions={{

        }}
    >
        <Drawer.Screen name={screens.home} component={HomeTabs} />
        <Drawer.Screen
            options={{
                title: 'Kampanyalar',

            }}
            name={screens.campaignScreen}
            component={CampaignStackScreen}
        />
        <Drawer.Screen
            options={{
                title: 'Etkinlikler',
                drawerLabel: 'Etkinlikler'
            }}
            name={screens.activityScreen}
            component={ActivityStackScreen}
        />
        <Drawer.Screen
            options={{
                title: 'Organizasyonlar',
            }}
            name={screens.organizatonScreen}
            component={OrganizationStackScreen}
        />
        <Drawer.Screen
            options={{
                title: 'Rezervasyon Al',
            }}
            name={screens.reservationRequestScreen}
            component={ReservationStackScreen}
        />
        <Drawer.Screen
            options={{
                title: 'Anket',
            }}
            name={screens.surveyScreen}
            component={SurveyStackScreen}
        />
        <Drawer.Screen
            options={{
                title: 'Hesabım'
            }}
            name={screens.profileNavigation}
            component={ProfileStackScreen}
        />
    </Drawer.Navigator>
)