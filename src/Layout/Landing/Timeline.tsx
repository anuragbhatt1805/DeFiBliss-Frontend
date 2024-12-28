"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";

interface TimelineStep {
  id: number;
  title: string;
  description: string;
}

export default function Timeline() {
  const [activeStep, setActiveStep] = useState(1);
  const timelineRef = useRef<HTMLDivElement>(null);

  const steps: TimelineStep[] = [
    {
      id: 1,
      title: "Connect Your Wallet",
      description:
        "Link your Web3 wallet to create an account. Choose your role as an artist or collector to get started.",
    },
    {
      id: 2,
      title: "Upload Artwork",
      description:
        "Upload your original artwork. Our AI system verifies authenticity and creates a unique blockchain record.",
    },
    {
      id: 3,
      title: "Verification Process",
      description:
        "AI model checks for authenticity. Once verified, a smart contract generates a unique transaction ID for your artwork.",
    },
    {
      id: 4,
      title: "Share & Download",
      description:
        "Users can browse, share, and download verified artwork. Each download creates a new blockchain record for tracking.",
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const viewportCenter = window.innerHeight / 2;

      const markers =
        timelineRef.current.getElementsByClassName("timeline-marker");
      let closestStep = 1;
      let minDistance = Infinity;

      Array.from(markers).forEach((marker, index) => {
        const markerRect = marker.getBoundingClientRect();
        const distance = Math.abs(markerRect.top - viewportCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestStep = index + 1;
        }
      });

      setActiveStep(closestStep);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      ref={timelineRef}
      sx={{
        width: "100%",
        // bgcolor: "background.default",
        color: "text.primary",
        pt: 8,
        pb:4
      }}
    >
      <Stack spacing={2} alignItems="center" textAlign="center" sx={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: { xs: 3, md: 6 },
            pt: { xs: 3, md: 3 },
            position: "relative",
            zIndex: 1,
      }}>
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
            How DefiBliss Works?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              maxWidth: "800px",
              mb: 6,
            }}
          >
            Simple steps to authenticate and share your artwork on the blockchain
          </Typography>
        </Stack>

      <Box
        sx={{
          position: "relative",
          maxWidth: 1200,
          mx: "auto",
          px: 4,
          "&::before": {
            content: '""',
            position: "absolute",
            left: { xs: "20px", md: "50%" },
            transform: { xs: "none", md: "translateX(-50%)" },
            top: 0,
            bottom: 0,
            width: "2px",
            bgcolor: "primary.main",
            opacity: 0.3,
          },
        }}
      >
        {steps.map((step) => (
          <Box
            key={step.id}
            sx={{
              display: "flex",
              flexDirection: { xs: "row", md: "row" },
              justifyContent: { xs: "flex-start", md: "center" },
              alignItems: { xs: "flex-start", md: "center" },
              mb: 4,
              position: "relative",
            }}
          >
            <Box
              className="timeline-marker"
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                bgcolor: "background.paper",
                border: "2px solid",
                borderColor: activeStep === step.id ? "primary.main" : "primary.light",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                left: { xs: "0px", md: "50%" },
                transform: { xs: "none", md: "translateX(-50%)" },
                zIndex: 2,
                transition: "all 0.3s ease",
                boxShadow: activeStep === step.id ? "0 0 20px rgba(0, 255, 255, 0.5)" : "none",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  color:
                    activeStep === step.id ? "primary.main" : "text.secondary",
                }}
              >
                {step.id}
              </Typography>
            </Box>

            <Card
              sx={{
                width: { xs: "calc(100% - 60px)", md: "35%" },
                position: { xs: "relative", md: "relative" },
                left: {
                  xs: "60px",
                  md: step.id % 2 === 0 ? "52%" : "auto",
                },
                right: {
                  xs: "auto",
                  md: step.id % 2 === 0 ? "auto" : "52%",
                },
                ml: {
                  xs: 0,
                  md: step.id % 2 === 0 ? "2rem" : "auto",
                },
                mr: {
                  xs: 0,
                  md: step.id % 2 === 0 ? "auto" : "2rem",
                },
                bgcolor: "background.paper",
                borderRadius: 2,
                transition: "all 0.3s ease",
                transform: activeStep === step.id ? "scale(1.05)" : "scale(1)",
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  {step.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {step.description}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
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
            color: "white",
            fontWeight: "bold",
            borderRadius: 2,
            "&:hover": {
              background: "linear-gradient(90deg, #1a9090 0%, #3557c4 100%)",
            },
          }}
          href="/explore"
        >
          Get Started Now
        </Button>
      </Stack>
    </Box>
  );
}

