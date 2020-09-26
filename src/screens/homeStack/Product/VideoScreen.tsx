import React from 'react'
import { Video } from 'expo-av';
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
    render() {
        return (
            <View full>
                {this.renderHeader()}
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <Video
                        source={{ uri: this.props.route.params.uri }}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode="contain"
                        shouldPlay
                        isLooping
                        ref={this.myRef}
                        style={{ maxWidth: 400, maxHeight: 400 }}
                    />
                    {/* <View style={{ height: 300 }}>

                        <WebView
                            style={styles.WebViewContainer}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            source={{ uri: this.props.route.params.uri }}
                        />

                    </View> */}
                </View>
                <View>
                    <TouchableOpacity onPress={() => this.myRef.current.pauseAsync()}>
                        <Play />
                    </TouchableOpacity>
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