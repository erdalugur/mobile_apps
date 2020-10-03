import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Text, View } from 'components'
import { TouchableOpacity } from 'react-native';
import theme from 'theme';
import { IAction, actionTypes } from 'myRedux/types';
import { AuthContextProps, NavigationProps } from 'types';
import { screens } from 'navigation';
import { AuthContext } from 'navigation'
interface State { }

interface Props extends NavigationProps<{}, any>, AuthContextProps {
    dispatch: (param: IAction<string>) => void
}

interface MenuItemProps {
    title: string
    onPress: () => void
}
function MenuItem(props: MenuItemProps) {
    return (
        <TouchableOpacity
            style={[styles.item]}
            onPress={props.onPress}>
            <Text>{props.title}</Text>
        </TouchableOpacity>
    )
}

export function SettingNavigationScreen(props: Props) {
    const { signOut } = React.useContext(AuthContext);

    const logout = async () => {
        signOut();
        props.navigation.navigate(screens.auth);
    }
    return (
        <View style={styles.container}>
            <MenuItem
                title="Taleplerim"
                onPress={() => props.navigation.navigate(screens.myReservations)}
            />
            <MenuItem
                title="İşlem Geçmişi"
                onPress={() => props.navigation.navigate(screens.myHistory)}
            />
            <MenuItem
                title="Hesap Ayarları"
                onPress={() => props.navigation.navigate(screens.myProfile)}
            />
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


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: theme.colors.border,
        height: 40,
        justifyContent: 'center',
        marginTop: 5,
        alignItems: 'flex-start',
        paddingHorizontal: 10
    }
});
