import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import {
    ReportScreen,
    ReportDetail,
} from 'screens'

import theme from 'theme';
import { HeaderBack } from 'icons'
import { screens } from 'navigation'




export const ReportStack = createStackNavigator();
export const ReportStackScreen = () => (
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

