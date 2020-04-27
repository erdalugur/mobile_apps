
import { DefaultTheme, DarkTheme } from '@react-navigation/native';

import { Theme } from '@react-navigation/native/lib/typescript/src/types';

const theme: Theme = {
    dark: true,
    ...DarkTheme
};

export default theme