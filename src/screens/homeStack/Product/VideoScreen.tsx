import React from 'react'
import { StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { View } from 'components'
import { NavigationProps } from 'types';
import { Back, Play } from 'icons';
import { sizeManager } from 'utils';
import theme from 'theme';

interface Props extends NavigationProps<{
    uri: string
}, any> {
}
export class VideoScreen extends React.PureComponent<Props, any>{

    state: any = {

    }
    myRef: any = React.createRef();
    renderHeader = () => {

        const style = sizeManager.isIphoneX() ? { paddingTop: 50 } : {}
        return (
            <View style={[styles.header, style]}>
                <View style={[styles.headerButton]}>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.goBack();
                    }}>
                        <Back color={theme.colors.white} size={40} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    renderVideo = () => {
        if (Platform.OS === 'web') {
            return <iframe frameBorder="0" src={this.props.route.params.uri} ></iframe>
        } else {
            return null
        }
    }
    render() {
        return (
            <View full>
                {this.renderHeader()}
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    {this.renderVideo()}
                </View>
            </View>
        )
    }
}

const bgColor = '#ffffff4d'
const styles = StyleSheet.create({
    WebViewContainer: {

        marginTop: (Platform.OS == 'android') ? 20 : 0,

    },
    header: {
        height: 60,
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        position: 'absolute',
        width: '100%',
        zIndex: 9
    },
    heartAdd: {
        bottom: 20,
        right: 10,
        //backgroundColor: bgColor,//'#12121226',
        width: 45,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    },
    headerButton: {
        width: 45, borderRadius: 10,
        //backgroundColor: bgColor,//'#12121226',
        alignItems: 'center', height: 45, justifyContent: 'center'
    },
})