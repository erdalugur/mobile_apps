import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'components'
import theme from 'theme';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import * as Icons from '@expo/vector-icons'

interface IconProps {
    family: "FontAwesome" | "AntDesign" | "MaterialIcons" | "Ionicons" | "Entypo" | "Feather"
    size: number
    name: string
    color?: string
}
interface NavigationItem {
    name: string
    title: string
    icon: IconProps
}
interface Props {
    items: NavigationItem[]
    selected: string
}

export function BottomNavigator(props: Props) {
    const navigation = useNavigation();
    function RenderIcon(param: IconProps) {
        let Icon = Icons[param.family];
        return <Icon name={param.name} size={param.size} color={param.color || theme.colors.text} />
    }
    return (
        <View style={styles.container}>
            {props.items.map(x => (
                <TouchableOpacity
                    onPress={() => navigation.navigate(x.name)}
                    style={[styles.button]}
                    key={x.name} activeOpacity={0.9}>
                    <RenderIcon {...x.icon}
                        color={props.selected == x.name ? theme.colors.primary : theme.colors.text}
                    />
                    <Text
                        color={props.selected == x.name ? theme.colors.primary : theme.colors.text}>{x.title}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
    container: {
        flexDirection: 'row',
        height: 70,
        backgroundColor: theme.colors.card,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    selected: {
        backgroundColor: 'red'
    }
});
