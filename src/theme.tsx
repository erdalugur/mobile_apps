
import { DarkTheme, DefaultTheme } from '@react-navigation/native';

interface ITheme {
    dark: boolean
    colors: {
        primary: string,
        background: string,
        border: string,
        card: string,
        text: string,
        white: string
        shadowColor: string
    }
}

const theme: ITheme = {
    dark: true,
    colors: {
        primary: DarkTheme.colors.primary, //'#ebedf0',//'#ef6c00', //DarkTheme.colors.primary,
        background: DarkTheme.colors.card,
        border: DarkTheme.colors.border,
        card: DarkTheme.colors.background,
        text: DarkTheme.colors.text,
        white: 'white',
        shadowColor: '#00000057'
    }
};

const light: ITheme = {
    dark: false,
    colors: {
        primary: DefaultTheme.colors.primary,
        background: DefaultTheme.colors.card,
        border: DefaultTheme.colors.border,
        card: DefaultTheme.colors.background,
        text: DefaultTheme.colors.text,
        white: 'white',
        shadowColor: '#00000057'
    }
};

export function getTheme(color: 'dark' | 'ligth') {
    return color === 'dark' ? theme : light
}

export default theme