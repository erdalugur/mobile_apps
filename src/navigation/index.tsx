import React from 'react';
import PresentationScreen from 'screens/PresentationScreen'
import HomeScreen from 'screens/HomeScreen'
import SigninScreen from 'screens/SigninScreen'
import { SignUpScreen } from 'screens/SignupScreen'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotificationScreen from 'screens/NotificationScreen';
import SearchScreen from 'screens/SearchScreen';
import CartScreen from 'screens/CartScreen'
import CategoryScreen from 'screens/CategoryScreen'
import ProductScreen from 'screens/ProductScreen';

import ProfileScreen from 'screens/ProfileScreen';
import { AntDesign } from '@expo/vector-icons';
import { HomeOptions, ProfileOptions, NotificationOptions, SearchOptions } from './options'
import { CartButton } from 'components'
import theme from 'theme';
import { HeaderBack } from 'icons'
import RootingScreen from 'screens/Rooting';

export const screens = {
    product: 'Product',
    home: 'Home',
    cart: 'Cart',
    category: 'Category',
    search: 'Search',
    notification: 'Notification',
    profile: 'Profile',
    signin: 'Signin',
    signup: 'Signup',
    presentation: 'Presentation',
    routing: 'Routing',
    settings: 'Settings',
    kitchen: 'Kitchen'
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
                options={{
                    title: 'Sepetim'
                }}
                name={screens.cart}
                component={CartScreen}
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
                options={{
                    title: 'Cart'
                }}
                name={screens.cart}
                component={CartScreen} />
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
            {/* <Tab.Screen
                options={{
                    title: "Hesabım",
                }}
                component={ProfileStackScreen}
                name={screens.profile} /> */}
        </Tab.Navigator>
    )
}
const CartStack = createStackNavigator();
const CartStackScreen = () => (
    <CartStack.Navigator>
        <CartStack.Screen
            name={screens.cart}
            component={CartScreen}
        />
    </CartStack.Navigator>
)

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
    <AuthStack.Navigator headerMode="none">
        <AuthStack.Screen
            name={screens.signin} component={SigninScreen}
        />
        <AuthStack.Screen
            name={screens.signup} component={SignUpScreen}
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
            name={screens.settings}
            component={ProfileScreen}
        />
    </KitchenStack.Navigator>
)
const RootStack = createStackNavigator();
interface Props {
    isAuthenticated: boolean
}
export const App = (props: Props) => {
    return (
        <RootStack.Navigator
            screenOptions={{
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                ...TransitionPresets.SlideFromRightIOS
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
                component={SearchStackScreen}
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
        </RootStack.Navigator>
    )
}