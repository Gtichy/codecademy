import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
          // light: will be calculated from palette.primary.main,
          main: '#010c3f',
          // dark: will be calculated from palette.primary.main,
          // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
          light: '#0066ff',
          main: '#6c41ec',
          // dark: will be calculated from palette.secondary.main,
          contrastText: '#ffcc00',
        },
        // error: will use the default color
      }
    })

export default theme;