
import { DarkTheme } from '@react-navigation/native';

import { Theme } from '@react-navigation/native/lib/typescript/src/types';

const theme: Theme = {
    dark: true,
    colors: {
        primary: DarkTheme.colors.primary,
        background: DarkTheme.colors.card,
        border: DarkTheme.colors.border,
        card: DarkTheme.colors.background,
        text: DarkTheme.colors.text
    }
};

export default theme