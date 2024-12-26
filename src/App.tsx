import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import { Landing } from "./Layout/Landing/Landing"

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0A0A0A',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
})

function App() {
  return (
    <>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Landing />
    </ThemeProvider>
    </>
  )
}

export default App
