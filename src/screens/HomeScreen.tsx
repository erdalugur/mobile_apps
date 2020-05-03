import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text, TopActions, Slider } from 'components'
import { NavigationProps } from 'types'
import { useSelector } from 'react-redux';
import { AppState } from 'myRedux';
import theme from 'theme';

interface Props extends NavigationProps { }

export default function (props: Props) {
    const app = useSelector((state: AppState) => state.app);
    console.log("app", app)
    return (
        <View full>
            <TopActions />
            <Slider />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    },
    button: {
        backgroundColor: theme.colors.card,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 5
    }
});
