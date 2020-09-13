import React from 'react'
import { ImageBackground } from 'react-native'
import { Card, Button, FormRow, Input } from 'components'
import { NavigationProps } from 'types';
import { dataManager } from 'api';
import { screens } from 'navigation';
import { messageBox } from 'utils';
import theme from 'theme';
import config from 'config';
import { AuthContext } from 'navigation';

interface Props extends NavigationProps<any, any> { }

function Index(props: Props) {
    const [username, setUsername] = React.useState('uerdal92@gmail.com')
    const [password, setPassword] = React.useState('uU01012000')
    const [storeId, setStoreId] = React.useState('1')
    const [loading, setLoading] = React.useState(false)

    const [errors, setErrors] = React.useState<any>({});

    const { signIn } = React.useContext(AuthContext);

    const submit = async () => {
        let errors: { [key: string]: string } = {};
        storeId ? null : errors["storeId"] = "Required";
        username ? null : errors["username"] = "Required";
        password ? null : errors["password"] = "Required";
        if (Object.keys(errors).length) {
            setErrors(errors)
            return
        } else {
            setLoading(true)
            let { token, data, error } = await dataManager.login(username, password, storeId);
            if (token && data && data.length > 0) {
                let __data__ = data[0];
                let __user__ = {
                    ID: __data__.ID,
                    PASSWORD: password,
                    USERNAME: username,
                    STOREID: storeId,
                    token: token
                }
                signIn(__user__);
                setTimeout(() => {
                    props.navigation.navigate(screens.routing)
                }, 1000);
            } else {
                setLoading(false)
                messageBox(error);
            }
        }
    }
    return (
        <ImageBackground
            source={{ uri: config.loginBackgroundImage }}
            style={{
                flex: 1,
                width: '100%',
                height: '100%',
                justifyContent: 'center',
            }}
        >
            <Card style={{
                margin: 10,
                padding: 20,
                backgroundColor: 'transparent',
                //borderRadius: 5
            }}>
                <FormRow errorMessage={errors["storeId"]} style={{
                    marginBottom: 10,
                    marginTop: 10,
                    backgroundColor: '#fff',
                    opacity: 0.5
                }}>
                    <Input
                        keyboardType="number-pad"
                        style={{
                            backgroundColor: 'transparent',
                            color: '#000'
                        }}
                        value={storeId}
                        onChangeText={(storeId) => setStoreId(storeId)}
                        placeholder="Tesis No" />
                </FormRow>
                <FormRow errorMessage={errors["username"]} style={{
                    marginBottom: 10,
                    marginTop: 10,
                    backgroundColor: '#fff',
                    opacity: 0.5
                }}>
                    <Input
                        style={{
                            backgroundColor: 'transparent',
                            color: '#000'
                        }}
                        placeholderTextColor={'#000'}
                        value={username}
                        onChangeText={(username) => setUsername(username)}
                        placeholder="Email" />
                </FormRow>

                <FormRow errorMessage={errors["password"]}
                    style={{
                        marginBottom: 10,
                        marginTop: 10,
                        backgroundColor: '#fff',
                        opacity: 0.5,
                    }}>
                    <Input
                        placeholderTextColor={'#000'}
                        style={{
                            backgroundColor: 'transparent',
                            color: '#000'
                        }}
                        textContentType="password"
                        value={password}
                        secureTextEntry
                        onChangeText={(password) => setPassword(password)}
                        placeholder="Parola" />
                </FormRow>
                <FormRow style={{ marginBottom: 10, marginTop: 10 }}>
                    <Button
                        loading={loading}
                        onPress={submit}
                        style={{ backgroundColor: theme.colors.border }}
                    >GİRİŞ YAP</Button>
                </FormRow>
                <FormRow style={{ borderWidth: 0, marginTop: 20, alignItems: 'flex-end' }}>
                    <Button size="small"
                        onPress={() => props.navigation.navigate(screens.loginQR)}>
                        QR İLE LOGİN
                        </Button>
                </FormRow>
            </Card>
        </ImageBackground>
    )
}

export default Index