import React from 'react'
import App from 'navigation'
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default () => (
    <SafeAreaProvider>
        <App />
    </SafeAreaProvider>
)