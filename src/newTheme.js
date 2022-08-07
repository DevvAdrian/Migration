//Your theme for the new stuff using material UI has been copied here so it doesn't conflict
import { createMuiTheme } from '@material-ui/core/styles';

const newTheme = createMuiTheme({
  palette: {
    type: 'dark',
    text: {
      primary: '#FFF',
    },
    background: {
      default: '#121212',
      paper: 'transparent',
    },
    primary: {
      light: '#757ce8',
      main: '#8b429300',
      dark: '#294567a3',
      contrastText: '#000',
    },
    secondary: {
      light: '#ff7961',
      main: '#e78838',
      dark: '#cd7124',
      contrastText: '#000',
    },
    action: {
      disabledBackground: '#CDCDCD',
      active: '#000',
      hover: '#000',
    },
  },
  typography: {
    color: '#463148',
    fontFamily: ['"Nunito"', 'sans-serif'].join(','),
  },
});

export default newTheme;
