import { createStackNavigator } from "@react-navigation/stack";
import { DrawerIcon } from "components";
import { HeaderBack } from "icons";
import { screens } from "navigation";
import React from 'react'
import { ActivityRequestScreen } from "./ActivityRequestScreen";
import { ActivityScreen } from "./ActivityScreen";

const Stack = createStackNavigator();

export const ActivityStackScreen = (props: any) => {
    return (
        <Stack.Navigator screenOptions={{
            headerBackImage: ({ tintColor }: any) => <HeaderBack />,
            title: 'Aktiviteler',
            headerBackTitleVisible: false,
        }}>
            <Stack.Screen
                options={{
                    headerLeft: () => <DrawerIcon {...props} />,
                }}
                component={ActivityScreen} name={screens.activityScreen} />
            <Stack.Screen
                component={ActivityRequestScreen} name={screens.activityRequestScreen} />
        </Stack.Navigator>
    )
}
