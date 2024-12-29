import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Box,
  Tabs,
  Tab,
  Chip,
  styled,
  Stack,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

// Styled components
const StyledTab = styled(Tab)({
  color: "#fff",
  "&.Mui-selected": {
    color: "#00b894",
  },
});

const VerifiedChip = styled(Chip)({
  backgroundColor: "#00b894",
  color: "#fff",
  height: "24px",
});

interface Artwork {
  id: number;
  title: string;
  artist: string;
  image: string;
  isVerified: boolean;
  description: string;
  created: string;
  price: number;
  category: string;
  downloads: number;
}

export default function Explore() {
  const [tabValue, setTabValue] = useState(0);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Mock data
  const artworks: Artwork[] = [
    {
      id: 1,
      title: "Cosmic Dreamscape",
      artist: "@stellarArtist",
      image: "https://placehold.co/800x800",
      isVerified: true,
      description:
        "A mesmerizing digital artwork that explores the intersection of cosmic elements and human consciousness. Created using traditional digital painting techniques, this piece represents the boundless possibilities of human imagination.",
      created: "March 15, 2024",
      price: 25,
      category: "Digital Art",
      downloads: 1234,
    },
    {
      id: 2,
      title: "Cosmic Dreamscape",
      artist: "@stellarArtist",
      image: "https://placehold.co/500x600",
      isVerified: true,
      description:
        "A mesmerizing digital artwork that explores the intersection of cosmic elements and human consciousness. Created using traditional digital painting techniques, this piece represents the boundless possibilities of human imagination.",
      created: "March 15, 2024",
      price: 25,
      category: "Digital Art",
      downloads: 1234,
    },
    {
      id: 3,
      title: "Cosmic Dreamscape",
      artist: "@stellarArtist",
      image: "https://placehold.co/700x1000",
      isVerified: true,
      description:
        "A mesmerizing digital artwork that explores the intersection of cosmic elements and human consciousness. Created using traditional digital painting techniques, this piece represents the boundless possibilities of human imagination.",
      created: "March 15, 2024",
      price: 25,
      category: "Digital Art",
      downloads: 1234,
    },
    {
      id: 4,
      title: "Cosmic Dreamscape",
      artist: "@stellarArtist",
      image: "https://placehold.co/400x400",
      isVerified: true,
      description:
        "A mesmerizing digital artwork that explores the intersection of cosmic elements and human consciousness. Created using traditional digital painting techniques, this piece represents the boundless possibilities of human imagination.",
      created: "March 15, 2024",
      price: 25,
      category: "Digital Art",
      downloads: 1234,
    },
    {
      id: 5,
      title: "Cosmic Dreamscape",
      artist: "@stellarArtist",
      image: "https://placehold.co/1600x1600",
      isVerified: true,
      description:
        "A mesmerizing digital artwork that explores the intersection of cosmic elements and human consciousness. Created using traditional digital painting techniques, this piece represents the boundless possibilities of human imagination.",
      created: "March 15, 2024",
      price: 25,
      category: "Digital Art",
      downloads: 1234,
    },
    {
      id: 6,
      title: "Cosmic Dreamscape",
      artist: "@stellarArtist",
      image: "https://placehold.co/600x600",
      isVerified: true,
      description:
        "A mesmerizing digital artwork that explores the intersection of cosmic elements and human consciousness. Created using traditional digital painting techniques, this piece represents the boundless possibilities of human imagination.",
      created: "March 15, 2024",
      price: 25,
      category: "Digital Art",
      downloads: 1234,
    },
    // Add more artwork items as needed
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event);
    setTabValue(newValue);
  };

  const handleDownload = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Box sx={{ bgcolor: "#1a1a1a", minHeight: "100vh", color: "#fff" }}>
      <AppBar position="static" sx={{ bgcolor: "#1a1a1a", boxShadow: "none" }}>
        <Toolbar>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{ flexGrow: 1 }}
          >
            <StyledTab label="Latest" />
            <StyledTab label="Popular" />
          </Tabs>
          <TextField
            placeholder="Search artwork..."
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: "gray", mr: 1 }} />,
              sx: {
                bgcolor: "#2d2d2d",
                borderRadius: "8px",
                color: "#fff",
                "& fieldset": { border: "none" },
              },
            }}
          />
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 4 }}>
        <Grid container spacing={2}>
          {artworks.map((artwork) => (
            <Grid item xs={12} sm={6} md={4} key={artwork.id}>
              <Card sx={{ bgcolor: "#2d2d2d", color: "#fff", borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={artwork.image}
                  alt={artwork.title}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <Typography variant="h6">{artwork.title}</Typography>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleDownload(artwork.id)}
                      sx={{ bgcolor: "#00b894" }}
                    >
                      {expandedId === artwork.id ? "Cancel" : "Download" }
                    </Button>
                  </Box>
                  <Typography variant="body2" color="gray">
                    by {artwork.artist}
                  </Typography>
                  {artwork.isVerified && (
                    <VerifiedChip
                      label="Verified Original"
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  )}
                </CardContent>

                {expandedId === artwork.id && (
                  <Box sx={{ p: 2, borderTop: "1px solid #404040" }}>
                    <Typography
                      variant="body2"
                      sx={{ mb: 2, textAlign: "left" }}
                    >
                      {artwork.description}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="gray">
                          Created
                        </Typography>
                        <Typography variant="body2">
                          {artwork.created}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="gray">
                          Price
                        </Typography>
                        <Typography variant="body2">
                          $ {artwork.price}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="gray">
                          Category
                        </Typography>
                        <Typography variant="body2">
                          {artwork.category}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="gray">
                          Downloads
                        </Typography>
                        <Typography variant="body2">
                          {artwork.downloads}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Stack mt={2}>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleDownload(artwork.id)}
                        sx={{ bgcolor: "#00b894" }}
                      >
                        Download Now
                      </Button>
                    </Stack>
                  </Box>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#2d2d2d",
              color: "#fff",
              "&:hover": { bgcolor: "#404040" },
            }}
          >
            Load More Artwork
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
