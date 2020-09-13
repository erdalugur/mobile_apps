import * as React from 'react';
import theme from 'theme'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { HomeStackScreen } from 'screens/homeStack'
import { SearchStackScreen } from 'screens/searchStack'
import { AdditionStackScreen } from 'screens/additionStack'
import { screens } from './index'

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
                    title: "Ara",
                }}
                component={SearchStackScreen}
                name={screens.search} />
        </Tab.Navigator>
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
