import { Menu, MoreOption } from 'icons'
import React from 'react'
import { Platform, TouchableOpacity } from 'react-native'
import theme from 'theme'


export const DrawerIcon = (props: any) => Platform.OS === 'web' ? (
    <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => props.navigation.openDrawer()}>
        <Menu color={theme.colors.white} size={25} />
    </TouchableOpacity>
) : null