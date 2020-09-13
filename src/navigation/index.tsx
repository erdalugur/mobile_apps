import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Apploading } from 'components';
import theme from 'theme'
import { AuthStackScreen } from 'screens/authStack'
import { Provider } from 'react-redux'
import { store } from 'myRedux'
import { userManager, cacheService, cacheKeys, configurationManager } from 'utils';
import { UserModel } from 'types';
import { KitchenStackScreen } from 'screens/kitchenStack'
import { ReportStackScreen } from 'screens/reportStack'
import { CachierStackScreen } from 'screens/cashierStack'
import { SettingStackScreen } from 'screens/settingStack'
import { NotificationStackScreen } from 'screens/notificationStack'
import { HomeTabs, StaffTabs } from './home'
import {
    PresentationScreen,
    RootingScreen,
    CartScreen,
} from 'screens'
import { dataManager } from 'api';

export const AuthContext = React.createContext<any>(null);

export const screens = {
    product: 'Product',
    home: 'Home',
    cart: 'Cart',
    category: 'Category',
    search: 'Search',
    notification: 'Notification',
    profile: 'Profile',
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
    tableQR: 'TableQR'
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
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );

    async function getPlaceAsync(storeId: string) {
        const { data, statusCode, error } = await dataManager.loadPlace(storeId)
        return new Promise<'ok' | 'nok'>((resolve, reject) => {
            if (statusCode === 200 && data) {
                configurationManager.setPlace(data[0]).then(x => {
                    return resolve('ok')
                })
            } else {
                configurationManager.removePlace().then(x => {
                    return resolve('nok')
                })
            }
        })

    }

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            try {
                let user = await userManager.get();
                if (user) {
                    let result = await getPlaceAsync(user.STOREID)
                    if (result === 'ok') {
                        dispatch({ type: 'RESTORE_TOKEN', token: user.token });
                    } else {
                        configurationManager.removePlace();
                        dispatch({ type: 'RESTORE_TOKEN', token: null });
                    }
                } else {
                    dispatch({ type: 'RESTORE_TOKEN', token: null });
                }
            } catch (e) {
                dispatch({ type: 'RESTORE_TOKEN', token: null });
            }
        };

        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async (user: UserModel) => {
                await userManager.set(user)
                let result = await getPlaceAsync(user.STOREID)
                if (result === 'ok')
                    dispatch({ type: 'SIGN_IN', token: user.token });
            },
            signOut: async () => {
                await userManager.remove();
                dispatch({ type: 'SIGN_OUT' })
            },
            signUp: async (user: UserModel) => {
                await userManager.set(user)
                let result = await getPlaceAsync(user.STOREID)
                if (result === 'ok')
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
                        }}
                        headerMode="none"
                    >
                        {state.isLoading ? (
                            // We haven't finished checking for the token yet
                            <AppStack.Screen name="Splash" component={Apploading} />
                        ) : state.userToken == null ? (
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
                                            component={HomeTabs} />

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
                                            component={SettingStackScreen}
                                            name={screens.settings} />

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