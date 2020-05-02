import * as React from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get("screen")
export const Apploading = () => {
    return (
        <View style={styles.container}>
            <Image

                style={{
                    resizeMode: "contain",
                    width: width,
                    height: height
                }}
                source={require('../../assets/splash.png')} />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
    }
});
