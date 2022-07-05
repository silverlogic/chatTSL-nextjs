import { createTheme, ThemeOptions } from '@mui/material/styles'

import {
  surface,
  primary,
  secondary,
  error,
  success,
  warning,
  info,
} from './colors'

/*
  To customize the palette, you can set the main, light, dark, and contrastText.
  You can also not set them to use the MUI default palette. Or you can also not 
  set light for instance, and it will use the main color as reference to calc 
  light.

  More info: https://mui.com/pt/customization/palette/
 */

const palette = {
  primary: {
    main: primary[500],
    light: primary[300],
    dark: primary[700],
    contrastText: surface[50],
  },
  secondary: {
    main: secondary[500],
    light: secondary[300],
    dark: secondary[700],
    contrastText: surface[50],
  },
  success: {
    main: success[500],
    light: success[300],
    dark: success[700],
    contrastText: surface[50],
  },
  divider: surface[400],
  info: {
    main: info[500],
    light: info[300],
    dark: info[700],
    contrastText: surface[50],
  },
  warning: {
    main: warning[500],
    light: warning[300],
    dark: warning[700],
    contrastText: surface[50],
  },
  error: {
    main: error[500],
    light: error[300],
    dark: error[700],
    contrastText: surface[50],
  },
  text: {
    primary: surface[900],
    secondary: surface[600],
    disabled: surface[400],
  },
  background: {
    default: surface[200],
    paper: surface[50],
  },
}

export function fontSize(fontSizeInPx: number, defaultFontSize = 16): string {
  /*
    - This should be used when you have a font-size value in px as reference 
      (i.e figma) to convert it to rem values instead;
    - Should used just for 'font-size' property
    - This can be useful when changing globaly the 'font-size' for accessibilty reasons;
    - <body> should use this same default font-size value, 16px is usualy the default;
    - avoid changing the defaultFontSize value.
  */
  return `${fontSizeInPx / defaultFontSize}rem`
}

/* 
    For typography you can set any of the following variants: h1, h2, h3, h4,
    h5, h6, subtitle1, subtitle2, body1, body2, button, caption, overline,

    More info: https://mui.com/pt/customization/typography/
*/

const typography = {
  h1: {
    fontSize: fontSize(24),
  },
  h2: {
    fontWeight: 500,
  },
  button: {
    fontStyle: 'italic',
  },
}

const theme: ThemeOptions = createTheme({
  palette,
  typography,
})

export default theme
