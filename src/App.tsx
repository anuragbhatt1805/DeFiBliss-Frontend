import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Landing } from "./Layout/Landing/Landing";
import { BrowserRouter, Routes, Route } from "react-router";
import Explore from "./Layout/Explore/Explore";
import { Authentication } from "./Layout/Authentication";
import Layout from "./Layout/Layout";
import Dashboard from "./Layout/Dashboard/Dashboard";
import Profile from "./Layout/Profile/Profile";
import Upload from "./Layout/Upload/Upload";

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
            <Route element={<Layout />} >
              <Route path="explore" element={<Explore />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="upload" element={<Upload />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
