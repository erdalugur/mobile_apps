import React from 'react'
import { Card, View, Button, FormRow, Input, Text } from 'components'
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { NavigationProps, UserModel } from 'types';
import { dataManager } from 'api';
import { screens } from 'navigation';
import { IAction } from 'myRedux/types';
import { messageBox, userManager } from 'utils';

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
        username: "",
        password: "",
        storeId: "1",
        loading: false,
        errors: {}
    }
    submit = async () => {
        let errors: { [key: string]: string } = {};
        const { username, password, storeId } = this.state
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
                this.props.navigation.navigate(screens.home)
            } else {
                messageBox(error);
                this.setState({ loading: false })
            }
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
                            textContentType="password"
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

export default connect(null)(Index)