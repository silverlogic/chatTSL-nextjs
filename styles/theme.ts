import { createTheme } from '@mui/material/styles';
import { red, blue } from '@mui/material/colors';
// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: blue[500],
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;