import {
  Box,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import Hero from "./Hero";
import Stats from "./Stats";
import ChooseDefiBliss from "./ChooseDefiBliss";
import Timeline from "./Timeline";
import CommunityFeedback from "./CommunityFeedback";
import StartAuthenticate from "./StartAuthenticate";
import Footer from "../../Components/Footer/Footer";

export function Landing() {
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(145deg, #0A0A0A 0%, #1A1A1A 100%)",
          overflow: "hidden",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: "5%",
            left: "15%",
            width: "40%",
            height: "40%",
            background:
              "radial-gradient(circle, rgba(32, 178, 170, 0.15) 0%, rgba(32, 178, 170, 0) 70%)",
            filter: "blur(50px)",
            zIndex: 0,
          },
        }}
      >
        <Hero />
        <Stats />
        <Container maxWidth="lg">
          <Divider
            sx={{
              my: { xs: 3, md: 6 },
            }}
          />
        </Container>
        <ChooseDefiBliss />
        <Timeline />
      </Box>
      <Box
        sx={{
          background: "linear-gradient(145deg, #1A1A1A 0%, #0A0A0A 100%)",
          overflow: "hidden",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: "5%",
            left: "15%",
            width: "40%",
            height: "40%",
            background:
              "radial-gradient(circle, rgba(32, 178, 170, 0.15) 0%, rgba(32, 178, 170, 0) 70%)",
            filter: "blur(50px)",
            zIndex: 0,
          },
        }}
      >
        <CommunityFeedback />
        <StartAuthenticate />
        <Container maxWidth="lg">
        <Divider sx={{
                mx: {sm: 4, md:12},
                mt: { xs: 1, md: 3 },
              }}/>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  pt: { xs: 2, md: 2 },
                  pb: { xs: 2, md: 4 },
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "grey.400",
                    mb: 4,
                    maxWidth: "sm",
                    fontStyle: "oblique",
                    fontWeight: "semibold",
                  }}
                >
                  Trusted by artists worldwide
                </Typography>
              </Box>
        </Container>
      </Box>

      <Footer />
    </>
  );
}
