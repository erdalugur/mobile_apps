import React from 'react';
import PresentationScreen from 'screens/PresentationScreen'
import HomeScreen from 'screens/HomeScreen'
import SigninScreen from 'screens/SigninScreen'
import { QRScreen } from 'screens/QRScreen'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotificationScreen from 'screens/NotificationScreen';
import SearchScreen from 'screens/SearchScreen';
import CartScreen from 'screens/CartScreen'
import CategoryScreen from 'screens/CategoryScreen'
import ProductScreen from 'screens/ProductScreen';
import KitchenScreen from 'screens/KitchenScreen';
import CashierScreen from 'screens/CashierScreen';
import ReportScreen from 'screens/ReportScreen';
import TablesScreen from 'screens/TablesScreen';
import PaymentScreen from 'screens/PaymentScreen';
import ReportDetail from 'screens/ReportDetail';
import AuthScreen from 'screens/AuthScreen';

import ProfileScreen from 'screens/ProfileScreen';
import { AntDesign } from '@expo/vector-icons';
import { HomeOptions, ProfileOptions, NotificationOptions, SearchOptions, CartOptions } from './options'
import { CartButton } from 'components'
import theme from 'theme';
import { HeaderBack } from 'icons'
import RootingScreen from 'screens/Rooting';
import AdditionScreen from 'screens/AdditionScreen';
import CartQRScreen from 'screens/CartQRScreen';
import CartResultScreen from 'screens/CartResultScreen';


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
    cartResult: 'CartResult'
}

export const HomeStack = createStackNavigator();
export const HomeStackScreen = ({ navigation, route }: any) => {
    if (route.state) {
        navigation.setOptions({
            tabBarVisible: route.state.index > 0 ? false : true
        })
    }
    return (
        <HomeStack.Navigator screenOptions={{
            // header: () => null
            headerRight: ({ tintColor }) => <CartButton />,
            headerBackTitleVisible: false,
            headerBackTitleStyle: { color: theme.colors.text },
            headerBackImage: ({ tintColor }) => <HeaderBack />
        }}>
            <HomeStack.Screen
                options={HomeOptions}
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
                    title: 'Ürünler',

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

        </HomeStack.Navigator>
    )
}
const SearchStack = createStackNavigator();
const SearchStackScreen = ({ navigation, route }: any) => {

    if (route.state) {
        let options: any = {
            tabBarVisible: route.state.index > 0 ? false : true
        }
        navigation.setOptions({
            ...options
        })
    }
    return (
        <SearchStack.Navigator headerMode="screen"
            screenOptions={{
                headerRight: ({ tintColor }) => <CartButton />,
                headerBackTitleVisible: false,
                headerBackTitleStyle: { color: theme.colors.text },
                headerBackImage: ({ tintColor }) => <HeaderBack />
            }}
        >
            <SearchStack.Screen
                options={{
                    header: () => null
                }}
                name={screens.search}
                component={SearchScreen}
            />
            <SearchStack.Screen
                options={{
                    title: 'Ürün'
                }}
                name={screens.product}
                component={ProductScreen} />
            <SearchStack.Screen
                options={CartOptions}
                name={screens.cart}
                component={CartScreen} />
            <SearchStack.Screen
                options={{
                    title: 'QR'
                }}
                name={screens.cartQR}
                component={CartQRScreen} />
            <SearchStack.Screen
                options={{
                    title: 'Masalar'
                }}
                name={screens.tables}
                component={TablesScreen} />
            <SearchStack.Screen
                options={{
                    title: 'Adisyon'
                }}
                component={AdditionScreen}
                name={screens.addition}
            />
            <SearchStack.Screen
                options={{
                    title: 'Ödeme Al'
                }}
                component={PaymentScreen}
                name={screens.payment}
            />
            <SearchStack.Screen
                options={{
                    title: 'Sonuç',
                    gestureEnabled: false,
                    headerBackImage: () => null
                }}
                name={screens.cartResult}
                component={CartResultScreen} />
        </SearchStack.Navigator>
    )
}
const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
    <ProfileStack.Navigator>
        <ProfileStack.Screen
            options={ProfileOptions}
            name={screens.profile}
            component={ProfileScreen}
        />
    </ProfileStack.Navigator>
)

const NotificationStack = createStackNavigator();
const NotificationStackScreen = () => (
    <NotificationStack.Navigator>
        <NotificationStack.Screen
            options={NotificationOptions}
            name={screens.notification}
            component={NotificationScreen}
        />
    </NotificationStack.Navigator>
)

const Tab = createBottomTabNavigator();



export const HomeTabs = ({ navigation, route }: { navigation: any, route: any }) => {
    return (
        <Tab.Navigator
            //initialRouteName="Search"
            screenOptions={({ route, navigation }) => ({

                tabBarIcon: ({ color, size }) => {
                    let iconName: string = "";
                    if (route.name === screens.home)
                        iconName = 'appstore1'
                    else if (route.name === screens.search)
                        iconName = 'search1';
                    else if (route.name === screens.profile)
                        iconName = 'user'

                    return <AntDesign color={color} size={size} name={iconName} />
                },
                header: () => null
            })}
            tabBarOptions={{ activeTintColor: theme.colors.text }}>
            <Tab.Screen
                options={{
                    title: "Menü",

                }}
                component={HomeStackScreen}
                name={screens.home} />

            <Tab.Screen
                options={{
                    title: "Ara",
                }}
                component={SearchStackScreen}
                name={screens.search} />
        </Tab.Navigator>
    )
}
const CartStack = createStackNavigator();
const CartStackScreen = () => (
    <CartStack.Navigator>
        <CartStack.Screen
            options={CartOptions}
            name={screens.cart}
            component={CartScreen}
        />
    </CartStack.Navigator>
)

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
    <AuthStack.Navigator headerMode="none">
        <AuthStack.Screen
            name={screens.auth} component={AuthScreen}
        />
        <AuthStack.Screen
            name={screens.signin} component={SigninScreen}
        />
        <AuthStack.Screen
            name={screens.loginQR} component={QRScreen}
        />


    </AuthStack.Navigator>
)

const SettingStack = createStackNavigator();
const SettingStackScreen = () => (
    <SettingStack.Navigator>
        <SettingStack.Screen
            name={screens.settings}
            component={ProfileScreen}
        />
    </SettingStack.Navigator>
)

const KitchenStack = createStackNavigator();
const KitchenStackScreen = () => (
    <KitchenStack.Navigator>
        <KitchenStack.Screen
            options={{
                title: 'Mutfak'
            }}
            name={screens.kitchen}
            component={KitchenScreen}
        />
    </KitchenStack.Navigator>
)


const CachierStack = createStackNavigator();
const CachierStackScreen = () => (
    <CachierStack.Navigator
        mode="modal"
        headerMode="screen"
        screenOptions={{
            headerBackTitleVisible: false,
            headerBackTitleStyle: { color: theme.colors.text },
            headerBackImage: ({ tintColor }) => <HeaderBack />
        }}
    >
        <CachierStack.Screen
            options={{
                title: 'Masalar'
            }}
            name={screens.tables}
            component={TablesScreen}
        />
        <CachierStack.Screen
            options={{
                title: 'Kasiyer'
            }}
            name={screens.cashier}
            component={CashierScreen}
        />
        <CachierStack.Screen
            options={{
                title: 'Adisyon'
            }}
            name={screens.addition}
            component={AdditionScreen}
        />
        <CachierStack.Screen
            options={{
                title: 'Ödeme Al'
            }}
            name={screens.payment}
            component={PaymentScreen}
        />
        <CachierStack.Screen
            options={{
                title: 'QR'
            }}
            name={screens.cartQR}
            component={CartQRScreen}
        />
        <CachierStack.Screen
            options={{
                title: 'Sonuç',
                gestureEnabled: false
            }}
            name={screens.cartResult}
            component={CartResultScreen}
        />
    </CachierStack.Navigator>
)

const ReportStack = createStackNavigator();
const ReportStackScreen = () => (
    <ReportStack.Navigator
        mode="modal"
        headerMode="screen"
        screenOptions={{
            headerBackTitleVisible: false,
            headerBackTitleStyle: { color: theme.colors.text },
            headerBackImage: ({ tintColor }) => <HeaderBack />
        }}
    >
        <ReportStack.Screen
            options={{
                title: 'Raporlar'
            }}
            name={screens.reports}
            component={ReportScreen}
        />
        <ReportStack.Screen
            options={{
                title: 'Rapor Detay'
            }}
            name={screens.reportDetail}
            component={ReportDetail}
        />

    </ReportStack.Navigator>
)

const AdditionStack = createStackNavigator();
const AdditionStackScreen = ({ route, navigation }: { route: any, navigation: any }) => {
    if (route.state) {
        navigation.setOptions({
            tabBarVisible: route.state.index > 0 ? false : true
        })
    }
    return (
        <AdditionStack.Navigator
            // mode="modal"
            headerMode="screen"
            screenOptions={{
                headerBackTitleVisible: false,
                headerBackTitleStyle: { color: theme.colors.text },
                headerBackImage: ({ tintColor }) => <HeaderBack />
            }}
        >
            <AdditionStack.Screen
                options={{
                    title: 'Masalar'
                }}
                component={TablesScreen}
                name={screens.tables}
            />
            <AdditionStack.Screen
                options={{
                    title: 'Adisyon'
                }}
                component={AdditionScreen}
                name={screens.addition}
            />
            <AdditionStack.Screen
                options={{
                    title: 'Ödeme Al'
                }}
                component={PaymentScreen}
                name={screens.payment}
            />
            <AdditionStack.Screen
                options={{
                    title: 'Ödeme Al'
                }}
                component={CartQRScreen}
                name={screens.cartQR}
            />

        </AdditionStack.Navigator>
    )
}

const StaffTab = createBottomTabNavigator();

export const StaffTabs = ({ navigation, route }: { navigation: any, route: any }) => {
    return (
        <StaffTab.Navigator
            screenOptions={({ route, navigation }) => ({

                tabBarIcon: ({ color, size }) => {
                    let iconName: string = "";
                    if (route.name === screens.search)
                        iconName = 'appstore1'
                    else if (route.name === screens.addition)
                        iconName = 'search1';
                    else if (route.name === screens.profile)
                        iconName = 'user'

                    return <AntDesign color={color} size={size} name={iconName} />
                },
                header: () => null
            })}
            tabBarOptions={{ activeTintColor: theme.colors.text }}>
            <Tab.Screen
                options={{
                    title: 'Menü'
                }}
                component={SearchStackScreen}
                name={screens.search} />

            <Tab.Screen
                options={{
                    title: 'Adisyon'
                }}
                component={AdditionStackScreen}
                name={screens.addition} />
        </StaffTab.Navigator>
    )
}
const RootStack = createStackNavigator();
interface Props {
    isAuthenticated: boolean
}
export const App = (props: Props) => {
    return (
        <RootStack.Navigator
            screenOptions={{
                gestureEnabled: true,
                ...TransitionPresets.SlideFromRightIOS,
                gestureDirection: "horizontal",
            }}
            headerMode="none" initialRouteName={props.isAuthenticated ? screens.routing : screens.signin}>
            <RootStack.Screen
                options={{
                    header: () => null
                }}
                name={screens.routing}
                component={RootingScreen}
            />

            <RootStack.Screen
                options={{
                    header: () => null
                }}
                name={screens.presentation}
                component={PresentationScreen}
            />
            <RootStack.Screen
                options={{
                    //gestureEnabled: false
                }}
                name={screens.home} component={HomeTabs} />
            <RootStack.Screen name={screens.profile} component={ProfileScreen} />
            <RootStack.Screen
                name={screens.cart}
                component={CartStackScreen}
            />
            <RootStack.Screen
                options={{
                    title: "Kampanyalar",
                }}
                component={NotificationStackScreen}
                name={screens.notification} />
            <RootStack.Screen
                options={{
                    title: "",
                }}
                component={AuthStackScreen}
                name={screens.signin} />
            <RootStack.Screen
                options={{
                    title: "",
                }}
                component={StaffTabs}
                name={screens.search} />
            <RootStack.Screen
                options={{
                    title: "",
                }}
                component={SettingStackScreen}
                name={screens.settings} />
            <RootStack.Screen
                component={KitchenStackScreen}
                name={screens.kitchen} />

            <RootStack.Screen
                component={ReportStackScreen}
                name={screens.reports} />

            <RootStack.Screen
                component={CachierStackScreen}
                name={screens.cashier} />
        </RootStack.Navigator>
    )
}