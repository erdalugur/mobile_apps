import React from 'react'
import { Card, Text, View, Button, FormRow, Input } from 'components'
import { } from 'react-native'

interface State {
    username: string
    password: string
    loading: boolean
    errors: { [key: string]: string }
}

interface Props { }
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
            this.setState({ loading: true, errors: {} })
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