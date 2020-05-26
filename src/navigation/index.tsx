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

export const HomeStack = createStackNavigator();
export const HomeStackScreen = ({ navigation, route }: any) => {
    if (route.state) {
        navigation.setOptions({
            tabBarVisible: route.state.index > 0 ? false : true
        })
    }
    return (
        <HomeStack.Navigator screenOptions={{
            headerRight: ({ tintColor }) => <CartButton />,
            headerBackTitleVisible: false,
            headerBackTitleStyle: { color: theme.colors.text },
            headerBackImage: ({ tintColor }) => <HeaderBack />
        }}>
            <HomeStack.Screen
                options={HomeOptions}
                name="Home"
                component={HomeScreen} />
            <HomeStack.Screen
                options={{
                    title: 'Sepetim'
                }}
                name="Cart"
                component={CartScreen}
            />
            <HomeStack.Screen
                options={{
                    title: 'Kategoriler'
                }}
                name="Category"
                component={CategoryScreen}
            />
            <HomeStack.Screen
                options={{
                    title: 'Ürünler'
                }}
                name="Product"
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
            name="Search"
            component={SearchScreen}
        />

    </SearchStack.Navigator>
)

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
    <ProfileStack.Navigator>
        <ProfileStack.Screen
            options={ProfileOptions}
            name="Profile"
            component={ProfileScreen}
        />
    </ProfileStack.Navigator>
)

const NotificationStack = createStackNavigator();
const NotificationStackScreen = () => (
    <NotificationStack.Navigator>
        <NotificationStack.Screen
            options={NotificationOptions}
            name="Notification"
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
                    if (route.name === 'Home')
                        iconName = 'appstore1'
                    else if (route.name === 'Search')
                        iconName = 'search1';
                    else if (route.name === 'Profile')
                        iconName = 'user'

                    return <AntDesign color={color} size={size} name={iconName} />
                }
            })}
            tabBarOptions={{ activeTintColor: theme.colors.text }}>
            <Tab.Screen
                options={{
                    title: "Anasayfa",
                }}
                component={HomeStackScreen}
                name="Home" />

            <Tab.Screen
                options={{
                    title: "Ürün Ara",
                }}
                component={SearchStackScreen}
                name="Search" />
            <Tab.Screen
                options={{
                    title: "Hesabım",
                }}
                component={ProfileStackScreen}
                name="Profile" />
        </Tab.Navigator>
    )
}
const CartStack = createStackNavigator();
const CartStackScreen = () => (
    <CartStack.Navigator>
        <CartStack.Screen
            name="Cart"
            component={CartScreen}
        />
    </CartStack.Navigator>
)

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
    <AuthStack.Navigator headerMode="none">
        <AuthStack.Screen
            name="Signin" component={SigninScreen}
        />
        <AuthStack.Screen
            name="Signup" component={SignUpScreen}
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
            headerMode="none" initialRouteName="Home">
            <RootStack.Screen
                options={{
                    header: () => null
                }}
                name="Presentation"
                component={PresentationScreen}
            />
            <RootStack.Screen name="Home" component={HomeTabs} />
            <RootStack.Screen name="Profile" component={ProfileScreen} />
            <RootStack.Screen
                name="Cart"
                component={CartStackScreen}
            />
            <RootStack.Screen
                options={{
                    title: "Kampanyalar",
                }}
                component={NotificationStackScreen}
                name="Notification" />
            <RootStack.Screen
                options={{
                    title: "",
                }}
                component={AuthStackScreen}
                name="Signin" />

        </RootStack.Navigator>
    )
}