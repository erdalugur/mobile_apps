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
    presentation: 'Presentation'
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
const SearchStackScreen = () => (
    <SearchStack.Navigator headerMode="none">
        <SearchStack.Screen
            options={SearchOptions}
            name={screens.search}
            component={SearchScreen}
        />

    </SearchStack.Navigator>
)

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
                    title: "Garson",
                }}
                component={SearchStackScreen}
                name={screens.search} />
            <Tab.Screen
                options={{
                    title: "Hesabım",
                }}
                component={ProfileStackScreen}
                name={screens.profile} />
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
            headerMode="none" initialRouteName={screens.home}>
            <RootStack.Screen
                options={{
                    header: () => null
                }}
                name={screens.presentation}
                component={PresentationScreen}
            />
            <RootStack.Screen name={screens.home} component={HomeTabs} />
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
                name={screens.signup} />

        </RootStack.Navigator>
    )
}