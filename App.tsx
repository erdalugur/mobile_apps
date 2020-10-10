import React from 'react'
import App from 'navigation'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from 'myRedux'
import { Provider } from 'react-redux';

export default () => (
    <SafeAreaProvider>
        <Provider store={store}>
            <App />
        </Provider>
    </SafeAreaProvider>
)