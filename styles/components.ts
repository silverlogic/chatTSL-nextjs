import { Components } from '@mui/material/styles'

export const components: Components = {
  MuiButton: {
    defaultProps: {
      variant: 'outlined',
    },
  },
  MuiCssBaseline: {
    styleOverrides: {
      html: {
        scrollSnapType: 'y proximity',
      },
      body: {
        scrollbarColor: '#25262E #25262E',
        '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
          backgroundColor: '#25262E',
        },
        '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
          borderRadius: 8,
          backgroundColor: '#62707C',
          border: '4px solid #25262E',
        },
        '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
          backgroundColor: '#19ABE4',
        },
        '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
          backgroundColor: '#19ABE4',
        },
        '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#19ABE4',
        },
        '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
          backgroundColor: '#25262E',
        },
      },
    },
  },
  MuiTypography: {
    defaultProps: {
      color: '#d1d5db',
    },
  },
}
