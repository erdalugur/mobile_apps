import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from 'components'
import theme from 'theme';
import { Map, Calendar } from 'icons'
import { useNavigation } from '@react-navigation/native';

interface Props { }

export function TopActions(props: Props) {
    const navigation = useNavigation();
    return (
        <View style={{
            marginTop: 10,
            paddingHorizontal: 10,
            marginBottom: 10, height: 70,
            flexDirection: 'row',
            justifyContent: 'space-around',
        }}>
            <View style={{ width: '70%', paddingRight: 5 }}>
                <TouchableOpacity activeOpacity={0.8} style={[styles.button]}>
                    <Map />
                    <Text style={{ marginLeft: 10 }}>Teslimat Bölgenizi Seçiniz</Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: '30%', paddingLeft: 5 }}>
                <TouchableOpacity activeOpacity={0.8} style={[styles.button]}>
                    <Calendar />
                    <View style={{ marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Teslimat</Text>
                        <Text>Zamanı</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.colors.card,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 5
    }
});
