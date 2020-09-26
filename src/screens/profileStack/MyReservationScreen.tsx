import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, } from 'components';

interface MyReservationScreenProps { }

const MyReservationScreen = (props: MyReservationScreenProps) => {
    return (
        <View style={styles.container}>
            <Text>MyReservationScreen</Text>
        </View>
    );
};

export default MyReservationScreen;

const styles = StyleSheet.create({
    container: {}
});
