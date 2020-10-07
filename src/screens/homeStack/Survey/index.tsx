import { createStackNavigator } from "@react-navigation/stack";
import { DrawerIcon } from "components";
import { screens } from "navigation";
import React from 'react'
import { SurveyScreen } from "./SurveyScreen";

const Stack = createStackNavigator();

export const SurveyStackScreen = (props: any) => {
    return (
        <Stack.Navigator screenOptions={{
            headerLeft: () => <DrawerIcon {...props} />,
            title: 'Anket'
        }}>
            <Stack.Screen
                component={SurveyScreen} name={screens.organizatonScreen} />
        </Stack.Navigator>
    )
}
