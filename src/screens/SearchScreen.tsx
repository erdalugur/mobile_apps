import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Button, Header, Input } from 'components'
import { NavigationProps } from 'types';
import theme from 'theme';
interface Props extends NavigationProps { }

export default function (props: Props) {
    return (
        <View full>
            <View style={{
                height: 90,
                backgroundColor: theme.colors.card,
                paddingTop: 40,
                paddingHorizontal: 10
            }}>
                <Input
                    placeholder="Ürün Veya Kategori Ara..."
                    style={{
                        width: '100%',
                        borderWidth: 0.5,
                        borderColor: theme.colors.text,
                        borderRadius: 5
                    }} />
            </View>
            <Text>Search!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
