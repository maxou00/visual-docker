import { ChakraProvider, StyleFunctionProps, theme } from '@chakra-ui/react';
// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react'

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
    primary:
    {
        50: '#ffe4de',
        100: '#ffb9b0',
        200: '#ff927e',
        300: '#ff6d4c',
        400: '#ff4c1a',
        500: '#e62300',
        600: '#b40e00',
        700: '#810000',
        800: '#4f0008',
        900: '#210009',
    },
    background: "#090b10",
    surface: theme.colors.gray[900],
    onPrimary: "#fafafa",
    onBackground: "#f9f9f9",
    onSurface: "#f9f9f9"
}

const fonts = {
    heading: `'Poppins', sans-serif`,
    body: `'Open Sans', sans-serif`
}

export const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
    cssVarPrefix: "app"
}

theme.components.Modal.baseStyle

const appTheme = extendTheme({ colors, fonts, config, });
export default appTheme;