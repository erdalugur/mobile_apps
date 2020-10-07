import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import theme from 'theme';
import { HeaderBack } from 'icons';
import { HistoryScreen } from 'screens/profileStack/HistoryScreen';
import { ProfileScreen } from 'screens/profileStack/ProfileScreen'
import MyReservationScreen from 'screens/profileStack/MyReservationScreen';
import { screens } from 'navigation';
import { SettingNavigationScreen } from './NavigationScreen';
import { PersonalInfoScreen } from './PersonalInfoScreen';
import MyOrderScreen from './MyOrderScreen';
export const Stack = createStackNavigator();

export const ProfileStackScreen = ({ navigation, route }: any) => {
    return (
        <Stack.Navigator
            headerMode="screen"
            screenOptions={{
                headerBackTitleVisible: false,
                headerBackTitleStyle: { color: theme.colors.text },
                headerBackImage: ({ tintColor }: any) => <HeaderBack />
            }}>
            <Stack.Screen
                options={{
                    title: 'Hesabım',
                }}
                name={screens.profileNavigation}
                component={SettingNavigationScreen}
            />
            <Stack.Screen
                options={{
                    title: 'Hesabım',
                }}
                name={screens.myProfile}
                component={ProfileScreen}
            />
            <Stack.Screen
                options={{
                    title: 'İşlem Geçmişi',
                }}
                name={screens.myHistory}
                component={HistoryScreen}
            />
            <Stack.Screen
                options={{
                    title: '',
                }}
                name={screens.personalInfoScreen}
                component={PersonalInfoScreen}
            />
            <Stack.Screen
                options={{
                    title: '',
                }}
                name={screens.myOrder}
                component={MyOrderScreen}
            />
        </Stack.Navigator>
    )
}
