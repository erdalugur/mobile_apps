import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen'
import CategoryScreen from './screens/CategoryScreen'
import CampaignScreen from './screens/CampaignScreen'
import CartScreen from './screens/CartScreen'
import theme from './theme'
import { Provider } from 'react-redux'
import { store } from './myRedux'
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer theme={theme}>
        <Tab.Navigator>
          <Tab.Screen name="Anasayfa" component={HomeScreen} />
          <Tab.Screen name="Kategoriler" component={CategoryScreen} />
          <Tab.Screen name="Kampanyalar" component={CampaignScreen} />
          <Tab.Screen name="Sepetim" component={CartScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

