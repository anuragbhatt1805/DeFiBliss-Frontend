import {
  Box,
  Typography,
  Button,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ArrowForward, Add } from "@mui/icons-material";
import Logo from "/src/assets/logo.webp"

const Hero = () => {
  {
    /* Hero Section */
  }
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          pt: { xs: 8, md: 12 },
          pb: { xs: 6, md: 8 },
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            mb: 6,
          }}
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
            variant="h3"
            sx={{
              fontWeight: 600,
              color: "white",
            }}
          >
            VeriCraft
          </Typography>
        </Box>

        {/* Main Heading */}
        <Typography
          variant={isMobile ? "h4" : "h2"}
          component="h2"
          sx={{
            fontWeight: 700,
            mb: 2,
            color: "white",
          }}
        >
          Authenticate & Own Your
          <br />
          <Box
            component="span"
            sx={{
              background: "linear-gradient(90deg, #20B2AA 0%, #4169E1 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Digital Artwork
          </Box>
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="h6"
          sx={{
            color: "grey.400",
            mb: 4,
            maxWidth: "sm",
          }}
        >
          Secure blockchain verification for authentic art. Connect, create, and
          collect with confidence.
        </Typography>

        {/* CTA Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <Button
            variant="contained"
            endIcon={<ArrowForward />}
            sx={{
              background: "linear-gradient(90deg, #20B2AA 0%, #4169E1 100%)",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              "&:hover": {
                background: "linear-gradient(90deg, #1a9090 0%, #3557c4 100%)",
              },
            }}
            href="/explore"
          >
            Explore Gallery
          </Button>
          <Button
            variant="outlined"
            endIcon={<Add />}
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
          >
            Start Creating
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Hero;
