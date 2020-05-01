import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import PresentationScreen from 'screens/PresentationScreen'
import theme from 'theme'
import { Provider } from 'react-redux'
import { store } from 'myRedux'

export default function () {
  return (
    <Provider store={store}>
      <NavigationContainer theme={theme}>
        <PresentationScreen />
      </NavigationContainer>
    </Provider>
  );
}

