import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  Stack,
  Divider,
} from "@mui/material";
import {
  ArrowForward,
  Settings,
  Lock,
  Fingerprint,
  Download,
  Groups,
  Description,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = styled(Paper)(({ theme }) => ({
  background: "rgba(26, 26, 26, 0.6)",
  backdropFilter: "blur(10px)",
  padding: theme.spacing(4),
  height: "100%",
  borderRadius: "10px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 15px 15px rgba(32, 178, 170, 0.3)",
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  background: "rgba(32, 178, 170, 0.1)",
  borderRadius: "12px",
  padding: theme.spacing(2),
  display: "inline-flex",
  width: "fit-content",
  marginBottom: theme.spacing(2),
  "& .MuiSvgIcon-root": {
    color: "rgb(32, 178, 170)",
    fontSize: "2rem",
  },
}));

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => (
  <FeatureCard elevation={0}>
    <Stack spacing={2}>
      <IconWrapper>{icon}</IconWrapper>
      <Typography
        variant="h5"
        component="h3"
        sx={{ color: "white", fontWeight: 500 }}
      >
        {title}
      </Typography>
      <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
        {description}
      </Typography>
    </Stack>
  </FeatureCard>
);

const ChooseDefiBliss = () => {
  {
    /* Why Choose DeFiBliss */
  }
  const features = [
    {
      icon: <Settings />,
      title: "AI Authentication",
      description:
        "Advanced AI technology verifies the authenticity of artwork, ensuring only original pieces make it to our platform.",
    },
    {
      icon: <Lock />,
      title: "Blockchain Security",
      description:
        "Every artwork is securely recorded on the blockchain, providing immutable proof of ownership and authenticity.",
    },
    {
      icon: <Fingerprint />,
      title: "Artist Recognition",
      description:
        "Artists receive proper attribution and recognition for their work through blockchain-verified credentials.",
    },
    {
      icon: <Download />,
      title: "Seamless Downloads",
      description:
        "Easy and secure download process with unique transaction hashes for every download.",
    },
    {
      icon: <Groups />,
      title: "Community Driven",
      description:
        "Join a thriving community of artists and art enthusiasts sharing and discovering original artwork.",
    },
    {
      icon: <Description />,
      title: "Smart Contracts",
      description:
        "Automated smart contracts ensure transparent and secure transactions for all parties involved.",
    },
  ];

  return (
    <Container maxWidth="lg">
      <Stack
        spacing={4}
        sx={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: { xs: 3, md: 6 },
          pt: { xs: 3, md: 3 },
          position: "relative",
          zIndex: 1,
        }}
      >
        <Stack spacing={2} alignItems="center" textAlign="center">
          <Typography
            variant="h3"
            component="h1"
            sx={{
              color: "white",
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "3rem" },
              mb: 2,
            }}
          >
            Why Choose DefiBliss?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              maxWidth: "800px",
              mb: 6,
            }}
          >
            Experience the future of digital art authentication and ownership
            with our cutting-edge blockchain technology.
          </Typography>
        </Stack>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          sx={{ mb: 3 }}
          flexWrap="wrap"
          justifyContent="center"
        >
          {features.slice(0, 3).map((feature, index) => (
            <Box key={index} sx={{ flex: { xs: "1 1 100%", md: "1 1 30%" } }}>
              <Feature {...feature} />
            </Box>
          ))}
        </Stack>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          flexWrap="wrap"
          justifyContent="center"
        >
          {features.slice(3).map((feature, index) => (
            <Box key={index} sx={{ flex: { xs: "1 1 100%", md: "1 1 30%" } }}>
              <Feature {...feature} />
            </Box>
          ))}
        </Stack>
      </Stack>
      <Stack
        direction="row"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          pt: { xs: 2, md: 4 },
          pb: { xs: 4, md: 6 },
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
        >
          Start Creating Today
        </Button>
      </Stack>
      <Divider />
    </Container>
  );
};

export default ChooseDefiBliss;
