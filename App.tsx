import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import theme from 'theme'
import { Provider, connect, useSelector } from 'react-redux'
import { store, AppState, IState } from 'myRedux'
import { getCredentials } from 'api'
import { Apploading } from 'components';
import { RootStack } from 'navigation'


const App = () => {
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  React.useEffect(() => {
    handleIsAuthenticated();
  }, []);

  const token = useSelector((state: AppState) => state.app.token);

  async function handleIsAuthenticated() {
    let result: boolean = false;
    let cache = await getCredentials();
    if (cache.value != "" || token != "")
      result = true;
    else
      result = false;

    setLoading(false);
    setIsAuthenticated(result);
  }
  console.log("app")
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