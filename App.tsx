import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import theme from 'theme'
import { Provider, useSelector } from 'react-redux'
import { store, AppState } from 'myRedux'
import { getCredentials } from 'api'
import { Apploading } from 'components';
import { RootStack } from 'navigation'
import { StatusBar } from 'react-native';


const App = () => {
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  const token = useSelector((state: AppState) => state.app.token);

  React.useEffect(() => {
    handleIsAuthenticated();
  }, [token]);

  React.useEffect(() => {
    handleIsAuthenticated();
  }, []);


  async function handleIsAuthenticated() {
    let result: boolean = false;
    try {
      let cache = await getCredentials();
      console.log(cache)
      if (cache.value != "" || token != "")
        result = true;
      else
        result = false;
    } catch (error) {
      result = token != ""
    }
    StatusBar.setBarStyle("light-content")
    setLoading(false);
    setIsAuthenticated(result);
  }

  return (
    <NavigationContainer theme={theme}>
      {isLoading ? <Apploading /> :
        <RootStack
          isAuthenticated={isAuthenticated}
        />}
    </NavigationContainer>
  )
}
export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}