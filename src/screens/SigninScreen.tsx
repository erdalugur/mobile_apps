import React from 'react'
import { Card, View, Button, FormRow, Input, Text } from 'components'
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { NavigationProps, UserModel } from 'types';
import { dataManager } from 'api';
import { screens } from 'navigation';
import { IAction } from 'myRedux/types';
import { messageBox, userManager } from 'utils';
import theme from 'theme';

interface State {
    username: string
    password: string
    storeId: string
    loading: boolean
    errors: { [key: string]: string }
}

interface Props extends NavigationProps<any, any> {

}
class Index extends React.PureComponent<Props, State> {
    state: State = {
        username: "uerdal92@gmail.com",
        password: "uU01012000",
        storeId: "1",
        loading: false,
        errors: {}
    }
    submit = async () => {
        let errors: { [key: string]: string } = {};
        const { username, password, storeId } = this.state
        storeId ? null : errors["storeId"] = "Required";
        username ? null : errors["username"] = "Required";
        password ? null : errors["password"] = "Required";
        if (Object.keys(errors).length) {
            this.setState({ errors });
            return
        } else {
            this.setState({ loading: true, errors: {} });
            let { token, data, error } = await dataManager.login(username, password, storeId);
            if (token && data && data.length > 0) {
                let __data__ = data[0];
                await userManager.set({
                    ID: __data__.ID,
                    PASSWORD: password,
                    USERNAME: username,
                    STOREID: storeId,
                    token: token
                });
                this.setState({ loading: false })
                this.props.navigation.navigate(screens.routing)
            } else {
                messageBox(error);
                this.setState({ loading: false })
            }
        }
    }
    render() {
        return (
            <View full style={{
                justifyContent: 'center',
                backgroundColor: theme.colors.card,
                padding: 30
            }}>
                <Card style={{
                    padding: 40,
                    backgroundColor: theme.colors.background,
                    borderRadius: 5
                }}>
                    <FormRow errorMessage={this.state.errors["storeId"]} style={{ marginBottom: 10, marginTop: 10 }}>
                        <Input
                            value={this.state.storeId.toString()}
                            onChangeText={(storeId) => this.setState({ storeId })}
                            placeholder="Restoran" />
                    </FormRow>
                    <FormRow errorMessage={this.state.errors["username"]} style={{ marginBottom: 10, marginTop: 10 }}>
                        <Input
                            value={this.state.username.toString()}
                            onChangeText={(username) => this.setState({ username: username })}
                            placeholder="Username" />
                    </FormRow>

                    <FormRow errorMessage={this.state.errors["password"]} style={{ marginBottom: 10, marginTop: 10 }}>
                        <Input
                            textContentType="password"
                            value={this.state.password.toString()}
                            secureTextEntry
                            onChangeText={(password) => this.setState({ password: password })}
                            placeholder="Password" />
                    </FormRow>
                    <FormRow style={{ marginBottom: 10, marginTop: 10 }}>
                        <Button
                            loading={this.state.loading}
                            onPress={this.submit}
                            style={{ backgroundColor: theme.colors.border }}
                        >Sign In</Button>
                    </FormRow>
                    <FormRow style={{ borderWidth: 0, marginTop: 20 }}>
                        <Button size="small"
                            onPress={() => this.props.navigation.navigate(screens.loginQR)}>
                            QR Code ile Login
                        </Button>
                    </FormRow>
                </Card>
            </View>
        )
    }
}

export default connect(null)(Index)