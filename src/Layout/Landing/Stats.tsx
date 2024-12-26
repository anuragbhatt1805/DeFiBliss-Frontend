import {
  Box,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
  Stack,
  Divider,
} from "@mui/material";

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

const Stats = () => {
  {
    /* Stats Section */
  }
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container maxWidth="lg">
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={3}
        sx={{
          mt: 0,
          mb: 6,
        }}
      >
        <StatItem number="10K+" label="Artworks" />
        <StatItem number="5K+" label="Artists" />
        <StatItem number="100K+" label="Users" />
        <StatItem number="50K+" label="Downloads" />
      </Stack>
      {!isMobile ? (
        <>
          <Divider />
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
        </>
      ) : (
        <Divider />
      )}
    </Container>
  );
};

export default Stats;
