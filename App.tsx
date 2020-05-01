import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import PresentationScreen from 'screens/PresentationScreen'
import HomeScreen from 'screens/HomeScreen'
import SigninScreen from 'screens/SigninScreen'

import theme from 'theme'
import { Provider } from 'react-redux'
import { store } from 'myRedux'
import { createStackNavigator } from '@react-navigation/stack';
import { getCredentials } from 'api'
import { Apploading } from 'components';
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Presentation" component={PresentationScreen} />
  </Stack.Navigator>
)
const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen options={{ header: () => null }} name="Signin" component={SigninScreen} />
  </Stack.Navigator>
)
interface State {
  loading: boolean,
  isAuthenticated: boolean
}
export default class extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      isAuthenticated: false
    }

  }

  componentDidMount() {
    this.setup();
  }
  isAuthenticated = async () => {
    try {
      let cache = await getCredentials();
      return cache.token != null
    } catch (error) {
      return false;
    }
  }

  setup = async () => {
    let isAuthenticated = await this.isAuthenticated();
    this.setState({ isAuthenticated, loading: false });
  }

  render() {
    if (this.state.loading) {
      return <Apploading />
    }
    return (
      <Provider store={store}>
        <NavigationContainer theme={theme}>
          {this.state.isAuthenticated ? <HomeStack /> : <AuthStack />}
        </NavigationContainer>
      </Provider>
    );
  }
}

