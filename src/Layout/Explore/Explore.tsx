import React, { useEffect, useState } from "react";
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
  styled,
  Stack,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { BaseURL } from "../../constant";
import { getDownloadProof } from "../../Utils/image.utils";
import { accountToken } from "../../Utils/baseStore";

// Styled components
const StyledTab = styled(Tab)({
  color: "#fff",
  "&.Mui-selected": {
    color: "#00b894",
  },
});

interface Artwork {
  id: number;
  title: string;
  artist: {
    username: string;
    walletAddress: string;
  };
  image: string;
  description: string;
  createdAt: string;
  price: number;
  category: string;
  downloads: number;
}

export default function Explore() {
  const [tabValue, setTabValue] = useState(0);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    fetch(`${BaseURL}/arts/explore`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const artwork: Artwork[] = [];
        for (const art of data.data) {
          artwork.push({
            id: art?._id,
            title: art?.title,
            artist: {
              username: art?.artist?.username,
              walletAddress: art?.artist?.walletAddress,
            },
            image: art?.file,
            description: art?.description,
            createdAt: art?.createdAt,
            price: art?.price,
            category: art?.category?.name,
            downloads: art?.downloads,
          });
        }
        setArtworks(artwork);
      });
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event);
    setTabValue(newValue);
  };

  const handleDownloadNow = async (id: number) => {
    const { success, transactionId } = await getDownloadProof({
      amount: artworks.find((art) => art.id === id)?.price || 0,
      userAddress: accountToken.value || "",
      artistsAddress:
        artworks.find((art) => art.id === id)?.artist.walletAddress || "",
    });

    if (success) {
      console.log(`Downloaded artwork with transactionId: ${transactionId}`);
    }

    if (success) {
      // const formData1 = new FormData();
      // // formData1.append('transactionId', transactionId);
      // formData1.append('walletAddress', accountToken.value || "");
      await fetch(`${BaseURL}/arts/download/${id}`, {
        method: "POST",
        body: JSON.stringify({
          walletAddress: accountToken.value || "",
        }),
      }).then(async (response) => {
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${id}.jpg`; // You can customize the file name here
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
        } else {
          console.error("Failed to download the artwork");
        }
      });
    }

    setExpandedId(expandedId === id ? null : id);
  };

  const handleDownload = async (id: number) => {
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
                  image={`${BaseURL}/${artwork.image.slice(4)}`}
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
                      {expandedId === artwork.id ? "Cancel" : "Download"}
                    </Button>
                  </Box>
                  <Typography variant="body2" color="gray">
                    by {artwork.artist?.username}
                  </Typography>
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
                          createdAt
                        </Typography>
                        <Typography variant="body2">
                          {new Date(artwork.createdAt).toLocaleDateString()}
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
                        onClick={() => handleDownloadNow(artwork.id)}
                        sx={{ bgcolor: "#00b894" }}
                        disabled={!accountToken.value}
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
