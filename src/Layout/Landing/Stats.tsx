import {
  Box,
  Typography,
  Container,
  Stack,
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
    </Container>
  );
};

export default Stats;
