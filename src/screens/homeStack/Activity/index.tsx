import { createStackNavigator } from "@react-navigation/stack";
import { DrawerIcon } from "components";
import { screens } from "navigation";
import React from 'react'
import { ActivityScreen } from "./ActivityScreen";

const Stack = createStackNavigator();

export const ActivityStackScreen = (props: any) => {
    return (
        <Stack.Navigator screenOptions={{
            headerLeft: () => <DrawerIcon {...props} />
        }}>
            <Stack.Screen
                component={ActivityScreen} name={screens.activityScreen} />
        </Stack.Navigator>
    )
}
