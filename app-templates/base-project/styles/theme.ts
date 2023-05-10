import { createTheme } from '@mui/material/styles'

import { components } from './components'
import { palette } from './palette'
import { typography } from './typography'
import { shadows } from './shadows'
import { PaletteOptions } from '@mui/material'

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    surface: typeof palette.surface
  }
  interface PaletteOptions {
    surface: typeof palette.surface
  }
}


const theme = createTheme({
  palette,
  typography,
  shadows,
  components,
})

export default theme
