import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import theme from 'theme'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { store, AppState } from 'myRedux'
import { Apploading } from 'components';
import { App } from 'navigation'
import { userManager } from 'utils';
import { IAction, actionTypes } from 'myRedux/types';


const Main = () => {
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  const token = useSelector((state: AppState) => state.app.token);
  const dispatch = useDispatch<any>();
  React.useEffect(() => {
    handleIsAuthenticated();
  }, [token]);

  React.useEffect(() => {
    handleIsAuthenticated();
  }, []);


  async function handleIsAuthenticated() {
    let result: string = "";
    setLoading(false);
    try {
      let user = await userManager.get();
      console.log("user", user)
      if (user != null && user.token != "") {
        result = user.token;
        dispatch({ type: actionTypes.SET_TOKEN, payload: user.token })
        setIsAuthenticated(result != "");
      }
      else
        setIsAuthenticated(false);
    } catch (error) {
      setIsAuthenticated(false);
    }
  }

  return (
    <NavigationContainer theme={theme}>
      {isLoading ? <Apploading /> :
        <App isAuthenticated={isAuthenticated} />}
    </NavigationContainer>
  )
}
export default () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}