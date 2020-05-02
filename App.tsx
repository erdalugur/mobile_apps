import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import theme from 'theme'
import { Provider, connect } from 'react-redux'
import { store, AppState, IState } from 'myRedux'
import { getCredentials } from 'api'
import { Apploading } from 'components';
import { RootStack } from 'navigation'

interface State {
  loading: boolean,
  isAuthenticated: boolean
}

interface Props {
  app: IState
  isAuthenticated: () => boolean
}

class Indexs extends React.Component<Props, State> {
  state: State = {
    loading: true,
    isAuthenticated: false
  }

  componentDidMount() {
    this.isAuthenticated();
  }

  isAuthenticated = async () => {
    let result: boolean;
    try {
      let cache = await getCredentials();
      if (cache.value != "") {
        result = true;
      } else if (this.props.isAuthenticated()) {
        result = true;
      } else {
        result = false;
      }
    } catch (error) {
      result = false;
    }
    this.setState({ loading: false, isAuthenticated: false });
  }
  render() {
    if (this.state.loading) {
      return <Apploading />
    }
    return (
      <NavigationContainer theme={theme}>
        <RootStack
          isAuthenticated={this.props.isAuthenticated()}
        />
      </NavigationContainer>
    )
  }
}

const Index = (props: Props) => {
  const [isLoading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setup();
  }, [isAuthenticated]);

  function setup() {
    setLoading(false);
    isAuthenticated();
  }

  async function isAuthenticated(): Promise<boolean> {
    let cache = await getCredentials();
    if (cache.value != "" || props.isAuthenticated())
      return true;
    else
      return false;
  }
  return (
    <NavigationContainer theme={theme}>
      {isLoading ? <Apploading /> :
        <RootStack
          isAuthenticated={props.isAuthenticated()}
        />}
    </NavigationContainer>
  )
}

const mapStateToProps = (state: AppState) => ({
  app: state.app,
  isAuthenticated: () => state.app.token != ""
})

const App = connect(mapStateToProps)(Index);

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}