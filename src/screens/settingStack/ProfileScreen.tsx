import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Text, View } from 'components'
import { TouchableOpacity } from 'react-native';
import theme from 'theme';
import { userManager } from 'utils';
import { IAction, actionTypes } from 'myRedux/types';
import { NavigationProps } from 'types';
import { connect } from 'react-redux';
import { screens } from 'navigation';
import { AuthContext } from 'navigation'
interface State { }

interface Props extends NavigationProps<{}, any> {
    dispatch: (param: IAction<string>) => void
}

function Index(props: Props) {

    const { signOut } = React.useContext(AuthContext);

    const logout = async () => {
        signOut();
        props.navigation.navigate(screens.auth);
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={{
                backgroundColor: theme.colors.border,
                height: 40,
                justifyContent: 'center',
                marginTop: 5,
                alignItems: 'center'
            }}>
                <Text>Hesap Ayarları</Text>
            </TouchableOpacity>
            { Platform.OS !== 'web' &&
                <TouchableOpacity
                    onPress={logout}
                    style={{
                        backgroundColor: theme.colors.border,
                        height: 40,
                        justifyContent: 'center',
                        marginTop: 5,
                        alignItems: 'center'
                    }}>
                    <Text>Çıkış Yap</Text>
                </TouchableOpacity>
            }
        </View>
    );
}


export default connect()(Index);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
