import { createStackNavigator } from "@react-navigation/stack";
import { DrawerIcon } from "components";
import { screens } from "navigation";
import React from 'react'
import { ActivityRequestScreen } from "./ActivityRequestScreen";
import { ActivityScreen } from "./ActivityScreen";

const Stack = createStackNavigator();

export const ActivityStackScreen = (props: any) => {
    return (
        <Stack.Navigator screenOptions={{
            headerLeft: () => <DrawerIcon {...props} />,
            title: 'Aktiviteler'
        }}>
            <Stack.Screen
                component={ActivityScreen} name={screens.activityScreen} />
            <Stack.Screen
                component={ActivityRequestScreen} name={screens.activityRequestScreen} />
        </Stack.Navigator>
    )
}
