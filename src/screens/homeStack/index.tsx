import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
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
    ProductNoteScreen
} from 'screens'

import {
    HomeOptions,
    CartOptions,
    ProductNoteOptions, SurveyOptions
} from '../../navigation/options'
import { CartButton, View } from 'components'
import theme from 'theme';
import { Close, HeaderBack, MoreOption, Survey } from 'icons'
import { screens } from 'navigation'
import { VideoScreen } from './VideoScreen';
import { SurveyScreen } from './Survey/SurveyScreen'
import { NavigationScreen } from './NavigationScreen';
import ProfileScreen from 'screens/settingStack/ProfileScreen';
import { ActivityScreen } from './ActivityScreen';
import { CampaignScreen } from './Campaign/CampaignScreen';

export const HomeStack = createStackNavigator();

export const HomeStackScreen = ({ navigation, route }: any) => {
    let options: any = {}
    if (route.state) {
        options.tabBarVisible = route.state.index > 0 ? false : true
    }
    navigation.setOptions({
        ...options
    })

    const DrawerMenu = () => (
        <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={() => navigation.navigate(screens.navigationScreen)}>
            <MoreOption color={theme.colors.white} size={25} />
        </TouchableOpacity>
    )

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
                        <DrawerMenu />
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
            <HomeStack.Screen
                options={{
                    title: 'Anket',
                    headerRight: () => null,
                    headerLeft: () => (
                        <DrawerMenu />
                    )
                }}
                name={screens.surveyScreen}
                component={SurveyScreen}
            />
            <HomeStack.Screen
                options={{
                    title: 'Hesabım',
                    headerRight: () => null,
                    headerLeft: () => (
                        <DrawerMenu />
                    )
                }}
                name={screens.profile}
                component={ProfileScreen}
            />
            <HomeStack.Screen
                options={{
                    title: 'Aktiviteler',
                    headerRight: () => null,
                    headerLeft: () => (
                        <DrawerMenu />
                    )
                }}
                name={screens.activityScreen}
                component={ActivityScreen}
            />
            <HomeStack.Screen
                options={{
                    title: 'Kampanyalar',
                    headerRight: () => null,
                    headerLeft: () => (
                        <DrawerMenu />
                    )
                }}
                name={screens.campaignScreen}
                component={CampaignScreen}
            />
            <HomeStack.Screen
                options={{
                    title: '',
                    header: () => null
                }}
                name={screens.videoScreen}
                component={VideoScreen}
            />
            <HomeStack.Screen
                options={{
                    title: '',
                    headerRight: () => null,
                    headerLeft: ({ }) => (
                        <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={() => navigation.goBack()}>
                            <Close color={theme.colors.white} size={25} />
                        </TouchableOpacity>
                    ),
                }}
                name={screens.navigationScreen}
                component={NavigationScreen}
            />

        </HomeStack.Navigator>
    )
}