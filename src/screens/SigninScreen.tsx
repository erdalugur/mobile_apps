import React from 'react'
import { Card, View, Button, FormRow, Input, Text } from 'components'
import { RouteProp, NavigationProp, CommonActions } from '@react-navigation/native';
import { StackNavigationProp, } from '@react-navigation/stack';
import { setCredentials } from 'api';
import { connect } from 'react-redux';
import { AppState } from 'myRedux';
import { Dispatch } from 'redux';

interface State {
    username: string
    password: string
    loading: boolean
    errors: { [key: string]: string }
}

interface Props {
    navigation: NavigationProp<any>
    setToken: (token: string) => void
}
class Index extends React.PureComponent<Props, State> {
    state: State = {
        username: "",
        password: "",
        loading: false,
        errors: {}
    }
    submit = async () => {
        let errors: { [key: string]: string } = {};
        const { username, password } = this.state
        username ? null : errors["username"] = "Required";
        password ? null : errors["password"] = "Required";
        if (Object.keys(errors).length) {
            this.setState({ errors });
            return
        } else {
            this.setState({ loading: true, errors: {} });
            await setCredentials("yes");
            this.props.setToken("yes");
        }
    }
    render() {
        return (
            <View full style={{ justifyContent: 'center' }}>
                <Card style={{ padding: 40, borderRadius: 10 }}>
                    <FormRow errorMessage={this.state.errors["username"]} style={{ marginBottom: 10, marginTop: 10 }}>
                        <Input
                            value={this.state.username.toString()}
                            onChangeText={(username) => this.setState({ username: username })}
                            placeholder="Username" />
                    </FormRow>
                    <FormRow errorMessage={this.state.errors["password"]} style={{ marginBottom: 10, marginTop: 10 }}>
                        <Input
                            value={this.state.password.toString()}
                            onChangeText={(password) => this.setState({ password: password })}
                            placeholder="Password" />
                    </FormRow>
                    <FormRow style={{ marginBottom: 10, marginTop: 10 }}>
                        <Button loading={this.state.loading} onPress={this.submit}>Sign In</Button>
                    </FormRow>
                    <FormRow style={{ borderWidth: 0 }}>
                        <Button size="small" onPress={() => this.props.navigation.navigate("Signup")}>
                            Buradan kayıt olabilirsiniz
                        </Button>
                    </FormRow>
                </Card>
            </View>
        )
    }
}
const mapStateToProps = (state: AppState) => ({
    app: state.app,
    isAuthenticated: () => state.app.token != ""
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setToken: (token: string) => dispatch({ type: "SET_TOKEN", payload: token })
})
export default connect(mapStateToProps, mapDispatchToProps)(Index)