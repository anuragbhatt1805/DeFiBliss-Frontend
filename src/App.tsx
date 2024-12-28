import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Landing } from "./Layout/Landing/Landing";
import { BrowserRouter, Routes, Route } from "react-router";
import Explore from "./Layout/Explore";
import { Authentication } from "./Layout/Authentication";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0A0A0A",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Routes>
            <Route index element={<Landing />} />
            <Route path="reclaim" element={<Authentication />} />
            <Route path="explore" element={<Explore />} />
            {/* <Route path="artist">
              <Route index element={<Artist />} />
              <Route path="dashboard" element={<ArtistDashboard />} />
              <Route path="profile" element={<ArtistProfile />} />
            </Route>
            <Route path="user">
              <Route index element={<User />} />
              <Route path="profile" element={<UserProfile />} />
            </Route> */}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
