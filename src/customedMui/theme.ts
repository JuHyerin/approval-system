import {createTheme} from "@mui/material";

export const theme = createTheme({
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: ({ownerState}) => ({
          ...(ownerState.selected && {
            color: '#009688'
          })
        })
      }
    }
  },
  palette: {
    primary: {
      main: '#009688'
    },
  },

})
