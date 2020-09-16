import React from 'react';
import { Text, View, StyleSheet, Button, Platform } from 'react-native';
import { BarCodeScanner as ExpoScanner } from 'expo-barcode-scanner';
import theme from 'theme';

interface BarCodeScannerResponse {
    type: any,
    data: any
}
interface Props {
    handleBarCodeScanned: (param: BarCodeScannerResponse) => void | undefined
    full?: boolean
}

interface State {
    hasPermission: boolean
    scanned: boolean
}
export class BarcodeScanner extends React.Component<Props, State> {
    state: State = {
        hasPermission: false,
        scanned: false,
    }
    componentDidMount = async () => {
        this.requestPermissionsAsync();
    }

    requestPermissionsAsync = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ExpoScanner.requestPermissionsAsync();
            this.setState({ hasPermission: status === 'granted' });
        }
    }


    handleBarCodeScanned = (param: BarCodeScannerResponse) => {
        if (!this.state.scanned) {
            this.setState(
                { scanned: true },
                () => this.props.handleBarCodeScanned(param));
        }
    };

    render() {
        const { hasPermission, scanned } = this.state
        if (hasPermission === null) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', opacity: 0.8, }}>
                    <Text style={{ color: theme.colors.white }}>Requesting for camera permission</Text>
                </View>
            )
        }
        if (hasPermission === false) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', opacity: 0.8, }}>
                    <Text style={{ color: theme.colors.white }}>No access to camera</Text>
                </View>
            )
        }
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    marginBottom: this.props.full ? 0 : 50
                }}>
                <ExpoScanner
                    onBarCodeScanned={this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />

                {scanned && (
                    <Button title={'Yeniden Tara'}
                        onPress={() => this.setState({ scanned: false })} />
                )}
            </View>
        );

    }
}

