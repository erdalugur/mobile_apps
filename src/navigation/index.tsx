import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Apploading } from 'components';
import theme from 'theme'
import { AuthStackScreen } from 'screens/authStack'
import { Provider } from 'react-redux'
import { store } from 'myRedux'
import { userManager, cacheService, cacheKeys, configurationManager, applicationManager } from 'utils';
import { UserModel } from 'types';
import { KitchenStackScreen } from 'screens/kitchenStack'
import { ReportStackScreen } from 'screens/reportStack'
import { CachierStackScreen } from 'screens/cashierStack'
import { SettingNavigationScreen } from 'screens/profileStack/NavigationScreen'
import { ProfileScreen } from 'screens/profileStack/ProfileScreen'
import { NotificationStackScreen } from 'screens/notificationStack'
import { HomeTabs, StaffTabs } from './home'
import {
    PresentationScreen,
    RootingScreen,
    CartScreen,
} from 'screens'
import { dataManager } from 'api';
import { Platform } from 'react-native';
import { ProfileStackScreen } from 'screens/profileStack';
import { DrawerApp } from 'screens/homeStack';

export const AuthContext = React.createContext<any>(null);

export const screens = {
    product: 'Product',
    home: 'Home',
    cart: 'Cart',
    category: 'Category',
    search: 'Search',
    notification: 'Notification',
    profile: 'Profile',
    profileNavigation: 'ProfileNavigation',
    myProfile: 'MyProfileScreen',
    signin: 'Signin',
    loginQR: 'LoginQR',
    presentation: 'Presentation',
    routing: 'Routing',
    settings: 'Settings',
    kitchen: 'Kitchen',
    cashier: 'Cashier',
    reports: 'Reports',
    addition: 'Addition',
    tables: 'Tables',
    payment: 'Payment',
    reportDetail: 'ReportDetail',
    auth: 'Auth',
    cartQR: 'CartQR',
    cartResult: 'CartResult',
    tableQR: 'TableQR',
    noteScreen: 'NoteScreen',
    videoScreen: 'VideoScreen',
    surveyScreen: 'SurveyScreen',
    navigationScreen: 'NavigationScreen',
    campaignScreen: 'CampaignScreen',
    activityScreen: 'ActivityScreen',
    activityRequestScreen: 'ActivityRequestScreen',
    reservationRequestScreen: 'ReservationRequestScreen',
    organizatonScreen: 'OrganizationScreen',
    organizatonRequestScreen: 'OrganizatonRequestScreen',
    myReservations: 'MyReservations',
    myHistory: 'MyHistory',
    loginGuest: 'LoginGuest',
    registerGuest: 'RegisterGuest',
    personalInfoScreen: 'PersonalInfoScreen',
    myCodeScreen: 'MyCodeScreen',
    tableOptionScreen: 'TableOptionScreen',
    myOrder: 'MyOrderScreen'
}



export const AppStack = createStackNavigator();

export default function ({ navigation }: any) {
    const [state, dispatch] = React.useReducer(
        (prevState: any, action: any) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                        isWebApp: Platform.OS === 'web'
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                        isWebApp: Platform.OS === 'web'
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                        isWebApp: Platform.OS === 'web'
                    };
                case 'MAKE_WEB':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: null,
                        isWebApp: true,
                        isLoading: false,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );

    const applicationParams = async () => {
        let user = await userManager.get();
        let domain = Platform.OS === 'web' && applicationManager.domain() || "";
        return {
            storeId: user?.STOREID || "0",
            domain: domain,
            token: user?.token
        }
    }

    const bootstrapAsync = async (token: string | undefined, domain: string, storeId: string) => {
        const { data, statusCode, error } = await dataManager.loadPlace({ domain, storeId })
        if (statusCode === 200 && data) {
            configurationManager.setPlace(data[0])
            if (Platform.OS === 'web') {
                dispatch({ type: 'MAKE_WEB' });
            } else {
                dispatch({ type: 'RESTORE_TOKEN', token: token });
            }
        } else {
            configurationManager.removePlace();
        }
    };

    React.useEffect(() => {
        applicationParams().then(({ token, domain, storeId }) => {
            bootstrapAsync(token, domain, storeId);
        })
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async (user: UserModel) => {
                await userManager.set(user)
                await bootstrapAsync(user.token, '', user.STOREID);
                dispatch({ type: 'SIGN_IN', token: user.token });
            },
            signOut: async (place: boolean = true) => {
                await userManager.remove();
                if (place)
                    await configurationManager.removePlace();

                dispatch({ type: 'SIGN_OUT' })
            },
            signUp: async (user: UserModel) => {
                await userManager.set(user)
                await bootstrapAsync(user.token, '', user.STOREID);
                dispatch({ type: 'SIGN_IN', token: user.token });
            },
        }),
        []
    );
    return (
        <AuthContext.Provider value={authContext}>
            <Provider store={store}>
                <NavigationContainer theme={theme}>
                    <AppStack.Navigator
                        screenOptions={{
                            gestureEnabled: true,
                            ...TransitionPresets.SlideFromRightIOS,
                            gestureDirection: "horizontal",
                            headerShown: false
                        }}
                    // headerMode="screen"

                    >
                        {state.isLoading ? (
                            // We haven't finished checking for the token yet
                            <AppStack.Screen name="Splash" component={Apploading} />
                        ) : state.isWebApp ? (
                            <AppStack.Screen
                                name={screens.home}
                                component={DrawerApp} />)
                                : state.userToken == null ? (
                                    // No token found, user isn't signed in
                                    <AppStack.Screen
                                        name="SignIn"
                                        component={AuthStackScreen}
                                    />
                                ) : (
                                        <>
                                            <AppStack.Screen
                                                name={screens.routing}
                                                component={RootingScreen}
                                            />

                                            <AppStack.Screen
                                                name={screens.presentation}
                                                component={PresentationScreen}
                                            />

                                            <AppStack.Screen
                                                name={screens.home}
                                                component={DrawerApp} />

                                            <AppStack.Screen
                                                name={screens.cart}
                                                component={CartScreen}
                                            />

                                            <AppStack.Screen
                                                component={NotificationStackScreen}
                                                name={screens.notification} />

                                            <AppStack.Screen
                                                component={AuthStackScreen}
                                                name={screens.auth} />

                                            <AppStack.Screen
                                                component={StaffTabs}
                                                name={screens.search} />

                                            <AppStack.Screen
                                                component={ProfileStackScreen}
                                                name={screens.settings} />
                                            <AppStack.Screen
                                                component={ProfileScreen}
                                                name={screens.profile} />
                                            <AppStack.Screen
                                                component={KitchenStackScreen}
                                                name={screens.kitchen} />

                                            <AppStack.Screen
                                                component={ReportStackScreen}
                                                name={screens.reports} />

                                            <AppStack.Screen
                                                component={CachierStackScreen}
                                                name={screens.cashier} />
                                        </>
                                    )}
                    </AppStack.Navigator>
                </NavigationContainer>
            </Provider>
        </AuthContext.Provider>
    );
}