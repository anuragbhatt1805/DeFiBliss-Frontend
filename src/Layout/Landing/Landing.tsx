import { Box, Container } from "@mui/material";
import Hero from "./Hero";
import Stats from "./Stats";
import ChooseDefiBliss from "./ChooseDefiBliss";
import Timeline from "./Timeline";

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
        <ChooseDefiBliss />
        <Timeline />


        <Container maxWidth="lg"></Container>
      </Box>
    </>
  );
}
