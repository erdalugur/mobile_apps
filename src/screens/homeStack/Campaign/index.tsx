import { createStackNavigator } from "@react-navigation/stack";
import { DrawerIcon } from "components";
import { screens } from "navigation";
import React from 'react'
import { CampaignScreen } from "./CampaignScreen";

const CampaignStack = createStackNavigator();

export const CampaignStackScreen = (props: any) => {
    return (
        <CampaignStack.Navigator screenOptions={{
            headerLeft: () => <DrawerIcon {...props} />,
            title: 'Kampanyalar'
        }}>
            <CampaignStack.Screen
                component={CampaignScreen} name={screens.campaignScreen} />
        </CampaignStack.Navigator>
    )
}
