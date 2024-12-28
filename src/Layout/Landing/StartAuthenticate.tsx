import { Button, Container, Stack, Typography } from "@mui/material";
import Stats from "./Stats";
import { ArrowForward } from "@mui/icons-material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Logo from "/src/assets/logo.webp"

const StartAuthenticate = () => {
  return (
    <Container maxWidth="lg">
      <Stack
        direction={"column"}
        sx={{
          color: "white",
          textAlign: "center",
          mx: { sm: 2, md: 8 },
          my: { sm: 2, md: 2 },
          backgroundColor: "rgb(38 38 38 / 0.5)",
          borderRadius: 2,
          borderColor: "rgb(64 64 64 / 0.3)",
          borderWidth: 5,
          px: { sm: 2, md: 8 },
          py: { sm: 2, md: 4 },
        }}
      >
        <Stack
          direction="column"
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt:{xs:2, md:0}
          }}
          gap={1}
        >
          <img
            src={Logo}
            style={{
              width: 50,
              height: 50,
              borderRadius: 10,
            }}
          />

          <Typography
            variant="h4"
            component="h3"
            sx={{
              color: "white",
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "3rem" },
              mb: 2,
            }}
          >
            Ready to Authenticate Your Artwork?
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              maxWidth: "800px",
              mb: 6,
              textAlign: "center",
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Join our community of artists and collectors. Experience the future
            of digital art authentication and ownership.
          </Typography>
        </Stack>
        <Stats />
        <Stack
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexDirection: { xs: "column", sm: "row" },
            width: { sm: "100%", md: "auto" },
            mb:{xs:2, md:0},
            mx:{xs:2, md:0}
          }}
        >
          <Button
            variant="contained"
            endIcon={<ArrowForward />}
            sx={{
              background: "linear-gradient(90deg, #20B2AA 0%, #4169E1 100%)",
              px: 4,
              color: "white",
              py: 1.5,
              borderRadius: 2,
              "&:hover": {
                background: "linear-gradient(90deg, #1a9090 0%, #3557c4 100%)",
              },
            }}
          >
            Start Creating
          </Button>
          <Button
            variant="outlined"
            endIcon={<ArrowForwardIosIcon />}
            sx={{
              color: "white",
              borderColor: "grey.700",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              "&:hover": {
                borderColor: "grey.500",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
              },
            }}
            href="/explore"
          >
            Explore More
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default StartAuthenticate;
