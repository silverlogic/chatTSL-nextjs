import { createTheme } from '@mui/material/styles'

import { components } from './components'
import { palette } from './palette'
import { typography } from './typography'
import { shadows } from './shadows'

declare module '@mui/material/styles' {
  interface PaletteColor {
    light: string
    main: string
    dark: string
    50: string
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
    A100?: string
    A200?: string
    A400?: string
    A700?: string
  }

  interface TypographyVariants {
    title: React.CSSProperties
    display: React.CSSProperties
    displaySm: React.CSSProperties
    titleBold: React.CSSProperties
    button2: React.CSSProperties
    subtitle3: React.CSSProperties
    subtitle4: React.CSSProperties
    h7: React.CSSProperties
  }

  interface TypographyVariantsOptions {
    title?: React.CSSProperties
    display?: React.CSSProperties
    displaySm?: React.CSSProperties
    titleBold?: React.CSSProperties
    button2?: React.CSSProperties
    subtitle3?: React.CSSProperties
    subtitle4?: React.CSSProperties
    h7?: React.CSSProperties
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    title: true
    display: true
    displaySm: true
    titleBold: true
    button2: true
    subtitle3: true
    subtitle4: true
    h7: true
  }
}

const theme = createTheme({
  palette,
  typography,
  shadows,
  components,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1440,
    },
  },
})

export default theme
