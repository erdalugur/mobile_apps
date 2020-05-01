import React from 'react'
import { Card, View, Button, FormRow, Input } from 'components'
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    Home: undefined;
    Signin: { userId: string };
    Feed: { sort: 'latest' | 'top' } | undefined;
};

type SigninScreenRouteProp = RouteProp<RootStackParamList, 'Signin'>;

type ProfileScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Signin'
>;

type Props = {
    route: SigninScreenRouteProp;
    navigation: ProfileScreenNavigationProp;
};
interface State {
    username: string
    password: string
    loading: boolean
    errors: { [key: string]: string }
}


export default class extends React.PureComponent<Props, State> {

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
            setTimeout(() => {
                this.props.navigation.navigate("Home", undefined);
            }, 2000);
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
                </Card>
            </View>
        )
    }
}