import React from 'react'
import { Card, View, Button, FormRow, Input, Text } from 'components'
import { connect } from 'react-redux';
import { AppState } from 'myRedux';
import { Dispatch } from 'redux';
import { NavigationProps } from 'types';

interface State {
    username: string
    password: string
    loading: boolean
    errors: { [key: string]: string }
}

interface Props extends NavigationProps {
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
            this.props.setToken("yes");
            this.props.navigation.goBack();
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setToken: (token: string) => dispatch({ type: "SET_TOKEN", payload: token })
})
export default connect(null, mapDispatchToProps)(Index)