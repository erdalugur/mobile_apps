import { createStackNavigator } from "@react-navigation/stack";
import { DrawerIcon } from "components";
import { screens } from "navigation";
import React from 'react'
import { OrganizationRequestScreen } from "./OrganizationRequestScreen";
import { OrganizationScreen } from "./OrganizationScreen";

const Stack = createStackNavigator();

export const OrganizationStackScreen = (props: any) => {
    return (
        <Stack.Navigator screenOptions={{
            headerLeft: () => <DrawerIcon {...props} />,
            title: 'Organizasyonlar'
        }}>
            <Stack.Screen
                component={OrganizationScreen} name={screens.organizatonScreen} />
            <Stack.Screen
                component={OrganizationRequestScreen} name={screens.organizatonRequestScreen} />
        </Stack.Navigator>
    )
}
