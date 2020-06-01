import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'components'
import { TouchableOpacity } from 'react-native';
import theme from 'theme';
import { userManager } from 'utils';
import { IAction, actionTypes } from 'myRedux/types';
import { NavigationProps } from 'types';
import { connect } from 'react-redux';
import { screens } from 'navigation';

interface State { }

interface Props extends NavigationProps<{}, any> {
    dispatch: (param: IAction<string>) => void
}

class Index extends React.PureComponent<Props, State> {
    render() {
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
                <TouchableOpacity
                    onPress={async () => {
                        await userManager.remove();
                        this.props.dispatch({ type: actionTypes.SET_TOKEN, payload: '' });
                        this.props.navigation.navigate(screens.auth);
                    }}
                    style={{
                        backgroundColor: theme.colors.border,
                        height: 40,
                        justifyContent: 'center',
                        marginTop: 5,
                        alignItems: 'center'
                    }}>
                    <Text>Çıkış Yap</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


export default connect()(Index);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
