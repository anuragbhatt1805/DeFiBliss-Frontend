import {
  Box,
  Typography,
  Button,
  Container,
  useTheme,
  useMediaQuery,
  Stack,
  Divider,
} from "@mui/material";
import { ArrowForward, Add } from "@mui/icons-material";

interface StatItemProps {
  number: string;
  label: string;
}

function StatItem({ number, label }: StatItemProps) {
  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        textAlign: "center",
        width: "100%",
      }}
    >
      <Typography
        variant="h4"
        component="div"
        sx={{
          fontWeight: 700,
          color: "white",
          mb: 1,
        }}
      >
        {number}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "grey.400",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

export function Landing() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: "10%",
            right: "15%",
            width: "35%",
            height: "35%",
            background:
              "radial-gradient(circle, rgba(65, 105, 225, 0.15) 0%, rgba(65, 105, 225, 0) 70%)",
            filter: "blur(50px)",
            zIndex: 0,
          },
        }}
      >
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
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: 3,
                  background:
                    "linear-gradient(135deg, #20B2AA 0%, #4169E1 100%)",
                  boxShadow: "0 4px 12px rgba(32, 178, 170, 0.25)",
                }}
              />
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 600,
                  color: "white",
                }}
              >
                DefiBliss
              </Typography>
            </Box>

            {/* Main Heading */}
            <Typography
              variant={isMobile ? "h3" : "h1"}
              component="h1"
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
                  background:
                    "linear-gradient(90deg, #20B2AA 0%, #4169E1 100%)",
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
              Secure blockchain verification for authentic art. Connect, create,
              and collect with confidence.
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
                  background:
                    "linear-gradient(90deg, #20B2AA 0%, #4169E1 100%)",
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  "&:hover": {
                    background:
                      "linear-gradient(90deg, #1a9090 0%, #3557c4 100%)",
                  },
                }}
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
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            sx={{
              mt: 0,
              mb:6
            }}
          >
            <StatItem number="10K+" label="Artworks" />
            <StatItem number="5K+" label="Artists" />
            <StatItem number="100K+" label="Users" />
            <StatItem number="50K+" label="Downloads" />
          </Stack>
        </Container>
        <Container maxWidth="lg">
        <Divider />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
                pt: { xs: 2, md: 6 },
                pb: { xs: 2, md: 4 },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "grey.400",
                mb: 4,
                maxWidth: "sm",
              }}
            >
              Trusted by artists worldwide
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
}
