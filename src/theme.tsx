
import { DarkTheme } from '@react-navigation/native';

import { Theme } from '@react-navigation/native/lib/typescript/src/types';

interface ITheme {
    dark: boolean
    colors: {
        primary: string,
        background: string,
        border: string,
        card: string,
        text: string,
        white: string
    }
}

const theme: ITheme = {
    dark: true,
    colors: {
        primary: DarkTheme.colors.primary,
        background: DarkTheme.colors.card,
        border: DarkTheme.colors.border,
        card: DarkTheme.colors.background,
        text: DarkTheme.colors.text,
        white: 'white'
    }
};

export default theme