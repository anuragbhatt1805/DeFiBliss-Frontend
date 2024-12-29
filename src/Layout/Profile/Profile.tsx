import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Stack,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { BaseURL } from '../../constant';
import { accountToken } from '../../Utils/baseStore';
import { useSignals } from '@preact/signals-react/runtime';

interface ProfileData {
  displayName: string;
  username: string;
  bio: string;
  joinedDate: string;
}

export default function Profile() {
  useSignals();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [profileData, setProfileData] = useState<ProfileData>({
    displayName: 'Stellar Artist',
    username: 'stellarArtist',
    bio: 'Digital artist specializing in cosmic and abstract themes. Creating unique pieces that blend reality with imagination.',
    joinedDate: 'March 2024',
  });

  useEffect( () => {
    // const accountToken = { value: 'sampleWalletAddress' }; // Replace with actual logic to get account token
    fetch(`${BaseURL}/users/`, {
      method: "POST",
      body: JSON.stringify({
        walletAddress: accountToken.value,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('User data:', data);
      setProfileData({
        displayName: data?.data?._doc?.name,
        username: data?.data?._doc?.username,
        bio: data?.data?._doc?.bio,
        joinedDate: data?.data?._doc?.createdAt
      });
    })
  }, []);

  const handleChange = (field: keyof ProfileData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProfileData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission
    console.log('Profile data:', profileData);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper
        sx={{
          p: 4,
          bgcolor: 'background.default',
          borderRadius: 2
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Profile Settings
        </Typography>

        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            // src={profileData.avatarUrl}
            sx={{
              width: {xs: 30, md:50},
              height: {xs: 30, md:50},
              bgcolor: 'grey.300'
            }}
          />
          <Box>
            <Typography variant="h6" component="div">
              @{profileData.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Joined {new Date(profileData.joinedDate).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>

        <form onSubmit={handleSubmit}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            Personal Information
          </Typography>

          <Stack spacing={3}>
            <Box sx={{
              display: 'grid',
              gap: 2,
              gridTemplateColumns: isMobile ? '1fr' : '1fr'
            }}>
              <TextField
                fullWidth
                label="Display Name"
                value={profileData.displayName}
                onChange={handleChange('displayName')}
                variant="filled"
              />
            </Box>

            <TextField
              fullWidth
              label="Bio"
              multiline
              rows={4}
              value={profileData.bio}
              onChange={handleChange('bio')}
              variant="filled"
            />

            <Box sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'flex-end',
              mt: 2
            }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: 'rgb(20, 184, 166)',
                  '&:hover': {
                    bgcolor: 'rgb(17, 164, 148)'
                  }
                }}
              >
                Save Changes
              </Button>
            </Box>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}