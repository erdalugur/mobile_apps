import { createStackNavigator } from "@react-navigation/stack";
import { DrawerIcon } from "components";
import { screens } from "navigation";
import React from 'react'
import { ReservationRequestScreen } from "./ReservationRequestScreen";

const Stack = createStackNavigator();

export const ReservationStackScreen = (props: any) => {
    return (
        <Stack.Navigator screenOptions={{
            headerLeft: () => <DrawerIcon {...props} />,
            title: 'Rezervasyon Al',
            headerBackTitleVisible: false,
        }}>
            <Stack.Screen
                component={ReservationRequestScreen} name={screens.organizatonScreen} />
        </Stack.Navigator>
    )
}
