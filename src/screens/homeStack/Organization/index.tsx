import { createStackNavigator } from "@react-navigation/stack";
import { DrawerIcon } from "components";
import { HeaderBack } from "icons";
import { screens } from "navigation";
import React from 'react'
import { OrganizationRequestScreen } from "./OrganizationRequestScreen";
import { OrganizationScreen } from "./OrganizationScreen";

const Stack = createStackNavigator();

export const OrganizationStackScreen = (props: any) => {
    return (
        <Stack.Navigator screenOptions={{
            headerBackImage: ({ tintColor }: any) => <HeaderBack />,
            title: 'Organizasyonlar',
            headerBackTitleVisible: false,
        }}>
            <Stack.Screen
                options={{
                    headerLeft: () => <DrawerIcon {...props} />
                }}
                component={OrganizationScreen}
                name={screens.organizatonScreen} />
            <Stack.Screen
                component={OrganizationRequestScreen}
                name={screens.organizatonRequestScreen} />
        </Stack.Navigator>
    )
}
