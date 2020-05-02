import React from 'react';
import PresentationScreen from 'screens/PresentationScreen'
import HomeScreen from 'screens/HomeScreen'
import SigninScreen from 'screens/SigninScreen'
import { createStackNavigator } from '@react-navigation/stack';
import { SignUpScreen } from 'screens/SignupScreen';
import CartScreen from 'screens/CartScreen'

export const HomeStack = createStackNavigator();
export const HomeStackScreen = () => (
    <HomeStack.Navigator>
        <HomeStack.Screen
            options={{
                header: () => null
            }}
            name="Home"
            component={HomeScreen} />
        <HomeStack.Screen
            options={{
                header: () => null
            }}
            name="Cart"
            component={CartScreen} />
        <HomeStack.Screen
            options={{
                header: () => null
            }}
            name="Presentation"
            component={PresentationScreen}
        />
    </HomeStack.Navigator>
)

const AuthStack = createStackNavigator();
export const AuthStackScreen = () => (
    <AuthStack.Navigator>
        <AuthStack.Screen
            options={{ header: () => null }}
            name="Signin"
            component={SigninScreen} />
        <AuthStack.Screen
            options={{ header: () => null }}
            name="Signup"
            component={SignUpScreen} />
        <AuthStack.Screen
            options={{ header: () => null }}
            name="Presentation"
            component={PresentationScreen}
        />
    </AuthStack.Navigator>
)
interface RootProps {
    isAuthenticated: boolean
}
export const RootStack = (props: RootProps) => {
    return (
        <>
            {props.isAuthenticated ? <HomeStackScreen />
                : <AuthStackScreen />}
        </>
    )
}
